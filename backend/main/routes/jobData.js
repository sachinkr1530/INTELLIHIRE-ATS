const express = require("express");
const puppeteer = require("puppeteer");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const scrapeLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Reduced limit for Puppeteer
  message: {
    error: "Too many scraping requests, please try again later.",
  },
});

// Global browser instance management
let globalBrowser = null;
let browserPromise = null;

const getBrowser = async () => {
  if (browserPromise) {
    return browserPromise;
  }

  if (globalBrowser && globalBrowser.isConnected()) {
    return globalBrowser;
  }

  browserPromise = puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
      "--disable-extensions",
      "--disable-plugins",
      "--disable-images", // Speed up loading
      "--disable-javascript", // We'll enable selectively
      "--single-process",
    ],
    timeout: 30000,
    protocolTimeout: 30000,
  });

  try {
    globalBrowser = await browserPromise;
    browserPromise = null;

    globalBrowser.on("disconnected", () => {
      console.log(
        "Browser disconnected, will create new instance on next request"
      );
      globalBrowser = null;
    });

    return globalBrowser;
  } catch (error) {
    browserPromise = null;
    throw error;
  }
};

// Helper function to create a new page with retry logic
const createPageWithRetry = async (maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const browser = await getBrowser();
      const page = await browser.newPage();

      // Set timeouts
      page.setDefaultNavigationTimeout(30000);
      page.setDefaultTimeout(10000);

      // Set user agent
      const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      ];

      await page.setUserAgent(
        userAgents[Math.floor(Math.random() * userAgents.length)]
      );
      await page.setViewport({ width: 1366, height: 768 });

      // Block unnecessary resources to speed up loading
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const resourceType = req.resourceType();
        if (["image", "stylesheet", "font", "media"].includes(resourceType)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      return page;
    } catch (error) {
      console.log(`Attempt ${attempt} failed to create page:`, error.message);
      if (attempt === maxRetries) {
        throw new Error(
          `Failed to create page after ${maxRetries} attempts: ${error.message}`
        );
      }

      // Reset browser instance for retry
      if (globalBrowser) {
        try {
          await globalBrowser.close();
        } catch (e) {
          console.log("Error closing browser:", e.message);
        }
        globalBrowser = null;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
    }
  }
};

// Generic job scraper function with retry logic
const scrapeJobsWithRetry = async (
  portalName,
  scrapeFunction,
  query,
  location,
  limit,
  maxRetries = 2
) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    let page = null;
    try {
      console.log(`${portalName}: Attempt ${attempt} - Starting scrape`);

      page = await createPageWithRetry();
      const jobs = await scrapeFunction(page, query, location, limit);

      console.log(`${portalName}: Successfully scraped ${jobs.length} jobs`);
      return jobs;
    } catch (error) {
      console.error(`${portalName}: Attempt ${attempt} failed:`, error.message);

      if (page && !page.isClosed()) {
        try {
          await page.close();
        } catch (closeError) {
          console.log("Error closing page:", closeError.message);
        }
      }

      if (attempt === maxRetries) {
        throw new Error(
          `${portalName} failed after ${maxRetries} attempts: ${error.message}`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    } finally {
      if (page && !page.isClosed()) {
        try {
          await page.close();
        } catch (closeError) {
          console.log("Error closing page in finally:", closeError.message);
        }
      }
    }
  }
};

// Simplified Unstop scraper
const scrapeUnstopJobsSimple = async (
  page,
  query = "",
  location = "",
  limit = 10
) => {
  try {
    // Use a more direct approach - search page
    const searchUrl = `https://unstop.com/search?searchterm=${encodeURIComponent(
      query + " " + location
    )}`;

    console.log("Unstop: Navigating to", searchUrl);
    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: 25000,
    });

    // Wait a moment for content to load
    await page.waitForTimeout(3000);

    const jobs = await page.evaluate((limit) => {
      const jobs = [];

      // Try multiple selectors for job cards
      const selectors = [
        ".opportunity-card",
        ".card",
        '[data-testid*="job"]',
        '[data-testid*="opportunity"]',
        ".search-result",
        "article",
        ".listing",
      ];

      let jobElements = [];
      for (const selector of selectors) {
        jobElements = document.querySelectorAll(selector);
        if (jobElements.length > 0) {
          console.log("Found elements with selector:", selector);
          break;
        }
      }

      for (let i = 0; i < Math.min(jobElements.length, limit); i++) {
        const element = jobElements[i];

        const getTextContent = (selectors) => {
          if (typeof selectors === "string") selectors = [selectors];
          for (const selector of selectors) {
            const el = element.querySelector(selector);
            if (el && el.textContent.trim()) return el.textContent.trim();
          }
          return "";
        };

        const title = getTextContent([
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          ".title",
          ".heading",
          '[data-testid*="title"]',
        ]);

        if (title && title.length > 3) {
          jobs.push({
            title,
            company:
              getTextContent([
                ".company",
                ".organization",
                '[data-testid*="company"]',
              ]) || "Company Not Listed",
            location:
              getTextContent([".location", '[data-testid*="location"]']) ||
              location ||
              "Location Not Listed",
            type: "Job",
            link: element.querySelector("a")
              ? element.querySelector("a").href
              : "",
            source: "Unstop",
            description: getTextContent([".description", ".summary"]).substring(
              0,
              150
            ),
          });
        }
      }

      return jobs;
    }, limit);

    return jobs.length > 0 ? jobs : []; // Return empty array instead of throwing
  } catch (error) {
    console.error("Unstop scraping error:", error.message);
    return []; // Return empty array instead of throwing
  }
};

// Simplified Internshala scraper
const scrapeInternshalaJobsSimple = async (
  page,
  query = "",
  location = "",
  limit = 10
) => {
  try {
    const searchUrl = `https://internshala.com/jobs`;

    console.log("Internshala: Navigating to", searchUrl);
    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: 25000,
    });

    await page.waitForTimeout(3000);

    const jobs = await page.evaluate(
      (query, location, limit) => {
        const jobs = [];

        const selectors = [
          ".individual_internship",
          ".internship_meta",
          ".job_meta",
          ".listing-wrap",
          "article",
        ];

        let jobElements = [];
        for (const selector of selectors) {
          jobElements = document.querySelectorAll(selector);
          if (jobElements.length > 0) break;
        }

        for (let i = 0; i < Math.min(jobElements.length, limit); i++) {
          const element = jobElements[i];

          const getTextContent = (selectors) => {
            if (typeof selectors === "string") selectors = [selectors];
            for (const selector of selectors) {
              const el = element.querySelector(selector);
              if (el && el.textContent.trim()) return el.textContent.trim();
            }
            return "";
          };

          const title = getTextContent([
            "h1",
            "h2",
            "h3",
            "h4",
            ".profile",
            ".job-title",
            ".title",
          ]);

          if (
            title &&
            title.length > 3 &&
            (!query || title.toLowerCase().includes(query.toLowerCase()))
          ) {
            jobs.push({
              title,
              company:
                getTextContent([
                  ".company_name",
                  ".company-name",
                  ".company",
                ]) || "Company Not Listed",
              location:
                getTextContent([".location_link", ".location"]) ||
                location ||
                "Remote",
              salary: getTextContent([".stipend", ".salary"]),
              type: "Job/Internship",
              link: element.querySelector("a")
                ? element.querySelector("a").href
                : "",
              source: "Internshala",
            });
          }
        }

        return jobs;
      },
      query,
      location,
      limit
    );

    return jobs;
  } catch (error) {
    console.error("Internshala scraping error:", error.message);
    return [];
  }
};

// Simple fallback scraper for demo purposes
const createDemoJobs = (query, location, source, count = 5) => {
  const jobTitles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Product Manager",
    "UI/UX Designer",
    "DevOps Engineer",
    "Business Analyst",
    "Marketing Executive",
  ];

  const companies = [
    "Tech Solutions Pvt Ltd",
    "Innovation Labs",
    "Digital Dynamics",
    "Future Systems",
    "Smart Technologies",
    "NextGen Solutions",
    "Advanced Computing",
    "Modern Enterprises",
  ];

  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Pune",
    "Chennai",
    "Hyderabad",
  ];

  const jobs = [];
  for (let i = 0; i < count; i++) {
    jobs.push({
      title: jobTitles[i % jobTitles.length] + (query ? ` - ${query}` : ""),
      company: companies[i % companies.length],
      location: location || locations[i % locations.length],
      salary: "₹" + (3 + i) + "-" + (6 + i) + " LPA",
      type: "Full-time",
      experience: (i % 3) + 1 + "-" + ((i % 3) + 3) + " years",
      posted: i + 1 + " days ago",
      source: source,
      link: `https://${source.toLowerCase()}.com/job-${i + 1}`,
      description: `Looking for ${
        jobTitles[i % jobTitles.length]
      } with relevant experience in ${query || "technology"}.`,
    });
  }

  return jobs;
};

router.get("/jobs/all", scrapeLimit, async (req, res) => {
  try {
    const { query = "", location = "", limit = 12, demo = "false" } = req.query;
    const jobLimit = Math.min(parseInt(limit), 40);
    const perPortalLimit = Math.ceil(jobLimit / 2); // Only using 2 portals for reliability

    console.log(
      `Starting scrape for query: "${query}", location: "${location}", limit: ${jobLimit}`
    );

    if (demo === "true") {
      const demoJobs = [
        ...createDemoJobs(
          query,
          location,
          "Unstop",
          Math.ceil(perPortalLimit / 2)
        ),
        ...createDemoJobs(
          query,
          location,
          "Internshala",
          Math.ceil(perPortalLimit / 2)
        ),
      ];

      return res.json({
        success: true,
        count: demoJobs.length,
        totalFound: demoJobs.length,
        query,
        location,
        jobs: demoJobs,
        sources: ["Unstop", "Internshala"],
        errors: [],
        mode: "demo",
      });
    }

    const results = await Promise.allSettled([
      scrapeJobsWithRetry(
        "Unstop",
        scrapeUnstopJobsSimple,
        query,
        location,
        perPortalLimit
      ),
      scrapeJobsWithRetry(
        "Internshala",
        scrapeInternshalaJobsSimple,
        query,
        location,
        perPortalLimit
      ),
    ]);

    let allJobs = [];
    const errors = [];

    results.forEach((result, index) => {
      const portalName = ["Unstop", "Internshala"][index];
      if (result.status === "fulfilled") {
        allJobs = [...allJobs, ...result.value];
      } else {
        errors.push(`${portalName}: ${result.reason.message}`);
      }
    });

    // If no jobs found from scraping, return demo data as fallback
    if (allJobs.length === 0) {
      console.log("No jobs scraped, returning demo data as fallback");
      const fallbackJobs = [
        ...createDemoJobs(query, location, "Unstop", 3),
        ...createDemoJobs(query, location, "Internshala", 3),
      ];

      return res.json({
        success: true,
        count: fallbackJobs.length,
        totalFound: fallbackJobs.length,
        query,
        location,
        jobs: fallbackJobs,
        sources: ["Unstop", "Internshala"],
        errors: [...errors, "Returning demo data as fallback"],
        mode: "fallback",
      });
    }

    // Remove duplicates and shuffle
    const uniqueJobs = allJobs.filter(
      (job, index, self) =>
        index ===
        self.findIndex(
          (j) =>
            j.title
              .toLowerCase()
              .includes(job.title.toLowerCase().split(" ")[0]) &&
            j.company.toLowerCase() === job.company.toLowerCase()
        )
    );

    const shuffledJobs = uniqueJobs
      .sort(() => Math.random() - 0.5)
      .slice(0, jobLimit);

    res.json({
      success: true,
      count: shuffledJobs.length,
      totalFound: allJobs.length,
      query,
      location,
      jobs: shuffledJobs,
      sources: ["Unstop", "Internshala"],
      errors,
      mode: "live",
    });
  } catch (error) {
    console.error("Error in /jobs/all:", error);

    // Return demo data as ultimate fallback
    const fallbackJobs = createDemoJobs(
      req.query.query,
      req.query.location,
      "Demo",
      8
    );

    res.json({
      success: true,
      count: fallbackJobs.length,
      totalFound: fallbackJobs.length,
      query: req.query.query || "",
      location: req.query.location || "",
      jobs: fallbackJobs,
      sources: ["Demo"],
      errors: ["Service temporarily unavailable, showing sample data"],
      mode: "error_fallback",
    });
  }
});

// Get jobs from specific portal
router.get("/jobs/:portal", scrapeLimit, async (req, res) => {
  try {
    const { portal } = req.params;
    const { query = "", location = "", limit = 20, demo = "false" } = req.query;
    const jobLimit = Math.min(parseInt(limit), 50);

    if (demo === "true") {
      const demoJobs = createDemoJobs(query, location, portal, jobLimit);
      return res.json({
        success: true,
        count: demoJobs.length,
        portal: portal.toLowerCase(),
        query,
        location,
        jobs: demoJobs,
        mode: "demo",
      });
    }

    let scrapeFunction;
    switch (portal.toLowerCase()) {
      case "unstop":
        scrapeFunction = scrapeUnstopJobsSimple;
        break;
      case "internshala":
        scrapeFunction = scrapeInternshalaJobsSimple;
        break;
      default:
        return res.status(400).json({
          success: false,
          error: "Invalid portal",
          message: "Supported portals: unstop, internshala",
        });
    }

    console.log(
      `Starting ${portal} scrape for query: "${query}", location: "${location}"`
    );
    const jobs = await scrapeJobsWithRetry(
      portal,
      scrapeFunction,
      query,
      location,
      jobLimit
    );

    res.json({
      success: true,
      count: jobs.length,
      portal: portal.toLowerCase(),
      query,
      location,
      jobs,
      mode: "live",
    });
  } catch (error) {
    console.error(`Error in /jobs/${req.params.portal}:`, error);

    // Fallback to demo data
    const fallbackJobs = createDemoJobs(
      req.query.query,
      req.query.location,
      req.params.portal,
      10
    );

    res.json({
      success: true,
      count: fallbackJobs.length,
      portal: req.params.portal.toLowerCase(),
      query: req.query.query || "",
      location: req.query.location || "",
      jobs: fallbackJobs,
      mode: "error_fallback",
      error: error.message,
    });
  }
});

// Health check endpoint
router.get("/health", async (req, res) => {
  let browserStatus = "disconnected";
  try {
    const browser = await getBrowser();
    browserStatus = browser.isConnected() ? "connected" : "disconnected";
  } catch (error) {
    browserStatus = "error: " + error.message;
  }

  res.json({
    success: true,
    message: "Job scraper service is running",
    supportedPortals: ["unstop", "internshala"],
    technology: "Puppeteer",
    browserStatus,
    demoMode: "Add ?demo=true to any endpoint for demo data",
  });
});

// Cleanup browser on process exit
process.on("exit", async () => {
  if (globalBrowser) {
    try {
      await globalBrowser.close();
    } catch (error) {
      console.log("Error closing browser on exit:", error.message);
    }
  }
});

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  if (globalBrowser) {
    try {
      await globalBrowser.close();
    } catch (error) {
      console.log("Error closing browser on SIGINT:", error.message);
    }
  }
  process.exit();
});

module.exports = router;
