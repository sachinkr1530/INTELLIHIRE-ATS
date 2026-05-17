const puppeteer = require("puppeteer");

const url =
  "https://unstop.com/jobs?oppstatus=open&quickApply=true&searchTerm=web%20developer";
const main = async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto(url);

  await browser.close();
};

main();
