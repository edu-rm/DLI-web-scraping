import puppeteer from "puppeteer";
import AppError from "../errors/AppError";

class UniversitiesLinkService {
  async execute(general) {
    let generalWithUrl = general;
    const browser = await puppeteer.launch({
      // headless: false,
      defaultViewport: {
        width: 1280,
        height: 720,
      },
    });

    try {
      const page = await browser.newPage();
      await page.goto("https://www.immigration.ca/uni/college_new.php");

      for (const university of generalWithUrl.universities) {
        await page.evaluate(
          () => (document.querySelector("input[type=search]").value = "")
        );

        await page.focus("input[type=search]");
        await page.keyboard.type(university.name);

        const url = await page.evaluate(() => {
          const trs = document.querySelectorAll("table tbody tr td");
          const trsArray = Array.from(trs);
          const url = trsArray[trsArray.length - 1].textContent;

          return url;
        });

        const indexOfUniversity = generalWithUrl.universities.indexOf(
          university
        );

        generalWithUrl.universities[indexOfUniversity] = {
          ...generalWithUrl.universities[indexOfUniversity],
          url: !url.includes("No matching records found")
            ? url
            : "Does not exists",
        };
      }

      return generalWithUrl;
    } catch (e) {
      throw new AppError(e.message, 500);
    }
  }
}

export default UniversitiesLinkService;
