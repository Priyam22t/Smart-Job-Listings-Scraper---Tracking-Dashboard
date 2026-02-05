import { Page } from "playwright";

export interface Job {
  jobTitle: string;
  company: string;
  location: string;
  jobLink: string;
  source: string;
}

export async function scrapeIndeed(page: Page): Promise<Job[]> {
  const jobs: Job[] = [];

  for (let pageNum = 0; pageNum < 2; pageNum++) {
    const start = pageNum * 10;
    const url = `https://www.indeed.com/jobs?q=software+developer&l=&start=${start}`;

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);

    const cards = await page.$$("a.tapItem");

    for (const card of cards) {
      const jobTitle =
        (await card.$eval("h2 span", el => el.textContent))?.trim() || "";

      const company =
        (await card.$eval(".companyName", el => el.textContent))?.trim() || "";

      const location =
        (await card.$eval(".companyLocation", el => el.textContent))?.trim() || "";

      const jobLink =
        "https://www.indeed.com" +
        ((await card.getAttribute("href")) || "");

      if (jobTitle) {
        jobs.push({
          jobTitle,
          company,
          location,
          jobLink,
          source: "Indeed",
        });
      }
    }
  }

  return jobs;
}
