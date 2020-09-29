import BasicInformationService from "../services/BasicInformationService";
import UniversitiesLinkService from "../services/UniversitiesLinkService";
import GetDescriptionTitleService from "../services/GetDescriptionTitleService";

class ScrapingController {
  async index(request, response) {
    const basicInformation = new BasicInformationService();
    const unversitiesLink = new UniversitiesLinkService();
    const getDescriptionTitle = new GetDescriptionTitleService();

    const universitiesURL =
      "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html";
    const general = await basicInformation.execute(universitiesURL);
    const generalWithUrl = await unversitiesLink.execute(general);

    const generalDescriptionAndTitle = await getDescriptionTitle.execute(
      generalWithUrl
    );

    return response.json({
      ...generalDescriptionAndTitle,
    });
  }
}

export default ScrapingController;
