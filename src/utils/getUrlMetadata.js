import urlMetadata from "url-metadata";

export default async function getUrlMetadata(url) {
  return urlMetadata(url);
}
