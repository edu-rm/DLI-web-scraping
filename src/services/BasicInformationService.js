import cheerio from "cheerio";
import AppError from "../errors/AppError";
import request from "../utils/RequestHTML";

class BasicInformationService {
  async execute(url) {
    const body = await request(url);
    let bc = [];
    let on = [];

    var $ = cheerio.load(body);
    let metadata = {};

    try {
      $("#bc table tbody tr").each((i, element) => {
        if (i > 19) return;
        $(element)
          .children("td")
          .each((i, tr) => {
            switch (i) {
              case 0: {
                metadata = {
                  province: "BC",
                  name: $(tr).text(),
                };
                break;
              }
              case 1: {
                metadata = {
                  ...metadata,
                  dsi_numer: $(tr).text(),
                };
                break;
              }
              case 2: {
                metadata = {
                  ...metadata,
                  city: $(tr).text(),
                };
                break;
              }
              case 3: {
                metadata = {
                  ...metadata,
                  eligle_program: $(tr).text(),
                };
                break;
              }
              default:
                break;
            }
          });
        bc.push(metadata);
      });

      $("#on table tbody tr").each((i, element) => {
        if (i > 19) return;
        $(element)
          .children("td")
          .each((i, tr) => {
            switch (i) {
              case 0: {
                metadata = {
                  province: "ON",

                  name: $(tr).text(),
                };
                break;
              }
              case 1: {
                metadata = {
                  ...metadata,
                  dsi_numer: $(tr).text(),
                };
                break;
              }
              case 2: {
                metadata = {
                  ...metadata,
                  city: $(tr).text(),
                };
                break;
              }
              case 3: {
                metadata = {
                  ...metadata,
                  eligle_program: $(tr).text(),
                };
                break;
              }
              default:
                break;
            }
          });
        on.push(metadata);
      });
    } catch (err) {
      throw new AppError(err.message, 500);
    }

    const search = 'Modified">';
    const indexModified = String(body).indexOf(search);
    const start = indexModified + search.length;

    const modified_at = String(body).substring(start, start + 10);

    return {
      universities: [...bc, ...on],
      modified_at,
    };
  }
}

export default BasicInformationService;
