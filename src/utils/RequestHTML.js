import request from "async-request";

export default async function requestHTML(url) {
  const { body } = await request(url);

  return body;
}
