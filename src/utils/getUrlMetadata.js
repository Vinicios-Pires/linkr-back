import urlMetadata from "url-metadata";

export default async function getUrlMetadata(url) {
  const { title, image, description } = urlMetadata(url).catch(() => {});

  return {
    title: title || "This url has no title metadata",
    image:
      image ||
      "https://i.etsystatic.com/17163755/r/il/f35a81/1989079602/il_570xN.1989079602_hkem.jpg",
    description: description || "This url has no description metadata",
  };
}
