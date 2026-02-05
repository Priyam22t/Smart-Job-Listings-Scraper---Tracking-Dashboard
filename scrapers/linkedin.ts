import { Page } from "playwright";
import { Job } from "./indeed";

export async function scrapeLinkedIn(page: Page): Promise<Job[]> {
  const jobs: Job[] = [];

  for (let pageNum = 0; pageNum < 2; pageNum++) {
    const start = pageNum * 25;
    const url = `https://www.linkedin.com/jobs/search?keywords=software%20developer&start=${start}`;

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(4000);

    const cards = await page.$$(".job-search-card");

    for (const card of cards) {
      const jobTitle =
        (await card.$eval("h3", el => el.textContent))?.trim() || "";

      const company =
        (await card.$eval("h4", el => el.textContent))?.trim() || "";

      const location =
        (await card.$eval(".job-search-card__location", el => el.textContent))?.trim() || "";

      const jobLink =
        (await card.$eval("a", el => el.getAttribute("href"))) || "";

      if (jobTitle) {
        jobs.push({
          jobTitle,
          company,
          location,
          jobLink,
          source: "LinkedIn",
        });
      }
    }
  }

  return jobs;
}
