import { Page } from "playwright";
import { Job } from "./indeed";

export async function scrapeCompany(page: Page): Promise<Job[]> {
  const jobs: Job[] = [];

  await page.goto("https://example.com/careers", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForTimeout(3000);

  const listings = await page.$$(".job-listing");

  for (const listing of listings) {
    const jobTitle =
      (await listing.$eval(".job-title", el => el.textContent))?.trim() || "";

    const location =
      (await listing.$eval(".job-location", el => el.textContent))?.trim() || "";

    const jobLink =
      (await listing.$eval("a", el => el.getAttribute("href"))) || "";

    if (jobTitle) {
      jobs.push({
        jobTitle,
        company: "Example Company",
        location,
        jobLink,
        source: "Company",
      });
    }
  }

  return jobs;
}
