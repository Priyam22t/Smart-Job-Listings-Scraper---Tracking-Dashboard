import { chromium } from "playwright";
import * as fs from "fs";
import { scrapeIndeed } from "./scrapers/indeed";
import { scrapeLinkedIn } from "./scrapers/linkedin";
import { scrapeCompany } from "./scrapers/company";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const indeedJobs = await scrapeIndeed(page);
  const linkedinJobs = await scrapeLinkedIn(page);
  const companyJobs = await scrapeCompany(page);

  const allJobs = [...indeedJobs, ...linkedinJobs, ...companyJobs];

  fs.writeFileSync("jobs.json", JSON.stringify(allJobs, null, 2));

  console.log(`Saved ${allJobs.length} jobs to jobs.json`);

  await browser.close();
})();
