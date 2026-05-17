const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Rate limiting middleware
const scrapeLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    error: "Too many scraping requests, please try again later.",
  },
});

// Helper function to add delays between requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// User agent rotation to avoid blocking
const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
];

// Unstop job scraper
const scrapeUnstopJobs = async (query = "", location = "", limit = 10) => {
  try {
    const randomUserAgent =
      userAgents[Math.floor(Math.random() * userAgents.length)];
    const searchUrl = `https://unstop.com/jobs?search=${encodeURIComponent(
      query
    )}&location=${encodeURIComponent(location)}`;

    const response = await axios.get(searchUrl, {
      headers: {
        "User-Agent": randomUserAgent,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const jobs = [];

    // Scrape job listings (adjust selectors based on actual Unstop structure)
    $(".job-card, .opportunity-card").each((index, element) => {
      if (index >= limit) return false;

      const $el = $(element);
      const job = {
        title: $el.find(".job-title, .opportunity-title").text().trim(),
        company: $el.find(".company-name").text().trim(),
        location: $el.find(".job-location").text().trim(),
        salary: $el.find(".salary, .stipend").text().trim(),
        type: $el.find(".job-type").text().trim(),
        experience: $el.find(".experience").text().trim(),
        skills: $el
          .find(".skills")
          .text()
          .trim()
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        posted: $el.find(".posted-date").text().trim(),
        deadline: $el.find(".deadline").text().trim(),
        description: $el
          .find(".job-description")
          .text()
          .trim()
          .substring(0, 200),
        link: $el.find("a").attr("href"),
        source: "Unstop",
      };

      // Only add jobs with minimum required data
      if (job.title && job.company) {
        jobs.push(job);
      }
    });

    return jobs;
  } catch (error) {
    console.error("Error scraping Unstop:", error.message);
    throw new Error(`Failed to scrape Unstop: ${error.message}`);
  }
};

// Internshala job scraper
const scrapeInternshalaJobs = async (query = "", location = "", limit = 10) => {
  try {
    const randomUserAgent =
      userAgents[Math.floor(Math.random() * userAgents.length)];
    const searchUrl = `https://internshala.com/jobs/${encodeURIComponent(
      query
    )}-jobs${location ? `-in-${encodeURIComponent(location)}` : ""}`;

    const response = await axios.get(searchUrl, {
      headers: {
        "User-Agent": randomUserAgent,
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const jobs = [];

    $(".internship_meta").each((index, element) => {
      if (index >= limit) return false;

      const $el = $(element);
      const job = {
        title: $el.find(".job-internship-name").text().trim(),
        company: $el.find(".company-name").text().trim(),
        location: $el.find(".location_link").text().trim(),
        salary: $el.find(".stipend").text().trim(),
        type: $el.find(".job_type").text().trim(),
        experience: $el.find(".experience").text().trim(),
        posted: $el.find(".status").text().trim(),
        link:
          "https://internshala.com" +
          $el.find(".view_detail_button").attr("href"),
        source: "Internshala",
      };

      if (job.title && job.company) {
        jobs.push(job);
      }
    });

    return jobs;
  } catch (error) {
    console.error("Error scraping Internshala:", error.message);
    throw new Error(`Failed to scrape Internshala: ${error.message}`);
  }
};

// Indeed job scraper (basic implementation)
const scrapeIndeedJobs = async (query = "", location = "", limit = 10) => {
  try {
    const randomUserAgent =
      userAgents[Math.floor(Math.random() * userAgents.length)];
    const searchUrl = `https://in.indeed.com/jobs?q=${encodeURIComponent(
      query
    )}&l=${encodeURIComponent(location)}`;

    const response = await axios.get(searchUrl, {
      headers: {
        "User-Agent": randomUserAgent,
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const jobs = [];

    $(".job_seen_beacon").each((index, element) => {
      if (index >= limit) return false;

      const $el = $(element);
      const job = {
        title: $el.find("[data-jk] h2 span").text().trim(),
        company: $el.find('[data-testid="company-name"]').text().trim(),
        location: $el.find('[data-testid="job-location"]').text().trim(),
        salary: $el.find(".metadata.salary-snippet-container").text().trim(),
        description: $el.find(".job-snippet").text().trim().substring(0, 200),
        posted: $el.find('[data-testid="myJobsStateDate"]').text().trim(),
        link: "https://in.indeed.com" + $el.find("[data-jk] h2 a").attr("href"),
        source: "Indeed",
      };

      if (job.title && job.company) {
        jobs.push(job);
      }
    });

    return jobs;
  } catch (error) {
    console.error("Error scraping Indeed:", error.message);
    throw new Error(`Failed to scrape Indeed: ${error.message}`);
  }
};

// Main controller routes

// Get jobs from all portals
router.get("/jobs/all", scrapeLimit, async (req, res) => {
  try {
    const { query = "", location = "", limit = 10 } = req.query;
    const jobLimit = Math.min(parseInt(limit), 50); // Max 50 jobs per request
    const perPortalLimit = Math.ceil(jobLimit / 3);

    const [unstopJobs, internshalaJobs, indeedJobs] = await Promise.allSettled([
      scrapeUnstopJobs(query, location, perPortalLimit),
      scrapeInternshalaJobs(query, location, perPortalLimit),
      scrapeIndeedJobs(query, location, perPortalLimit),
    ]);

    let allJobs = [];

    if (unstopJobs.status === "fulfilled") {
      allJobs = [...allJobs, ...unstopJobs.value];
    }

    if (internshalaJobs.status === "fulfilled") {
      allJobs = [...allJobs, ...internshalaJobs.value];
    }

    if (indeedJobs.status === "fulfilled") {
      allJobs = [...allJobs, ...indeedJobs.value];
    }

    // Shuffle and limit results
    const shuffledJobs = allJobs
      .sort(() => Math.random() - 0.5)
      .slice(0, jobLimit);

    res.json({
      success: true,
      count: shuffledJobs.length,
      query,
      location,
      jobs: shuffledJobs,
      sources: ["Unstop", "Internshala", "Indeed"],
      errors: [
        ...(unstopJobs.status === "rejected"
          ? [`Unstop: ${unstopJobs.reason.message}`]
          : []),
        ...(internshalaJobs.status === "rejected"
          ? [`Internshala: ${internshalaJobs.reason.message}`]
          : []),
        ...(indeedJobs.status === "rejected"
          ? [`Indeed: ${indeedJobs.reason.message}`]
          : []),
      ],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to scrape job data",
      message: error.message,
    });
  }
});

// Get jobs from specific portal
router.get("/jobs/:portal", scrapeLimit, async (req, res) => {
  try {
    const { portal } = req.params;
    const { query = "", location = "", limit = 20 } = req.query;
    const jobLimit = Math.min(parseInt(limit), 50);

    let jobs = [];
    let scrapeFunction;

    switch (portal.toLowerCase()) {
      case "unstop":
        scrapeFunction = scrapeUnstopJobs;
        break;
      case "internshala":
        scrapeFunction = scrapeInternshalaJobs;
        break;
      case "indeed":
        scrapeFunction = scrapeIndeedJobs;
        break;
      default:
        return res.status(400).json({
          success: false,
          error: "Invalid portal",
          message: "Supported portals: unstop, internshala, indeed",
        });
    }

    jobs = await scrapeFunction(query, location, jobLimit);

    res.json({
      success: true,
      count: jobs.length,
      portal: portal.toLowerCase(),
      query,
      location,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to scrape ${req.params.portal}`,
      message: error.message,
    });
  }
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Job scraper service is running",
    supportedPortals: ["unstop", "internshala", "indeed"],
  });
});

module.exports = router;
