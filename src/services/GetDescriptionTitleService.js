import cheerio from "cheerio";

import AppError from "../errors/AppError";
import request from "../utils/RequestHTML";

class GetDescriptionTitleService {
  async execute(general) {
    let generalHandler = general;

    try {
      for (const university of generalHandler.universities) {
        if (!university.url.includes("Does not exists")) {
          const body = await request(university.url);
          var $ = cheerio.load(body);
          const description = $('meta[name="description"]').attr("content");
          const title = $("title").text();

          const indexOfUniversity = generalHandler.universities.indexOf(
            university
          );

          generalHandler.universities[indexOfUniversity] = {
            ...generalHandler.universities[indexOfUniversity],
            htmlTitle: title,
            htmlDescription: description,
          };
        }
      }
      return generalHandler;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default GetDescriptionTitleService;
