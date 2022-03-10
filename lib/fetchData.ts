import { getStrapiURL } from "./api";

export function getMedia(media:any) {
  console.log("Check Media:", media);
  console.log("Strapi URL:", process.env.NEXT_PUBLIC_STRAPI_API_URL);
}

export function getStrapiMedia(media:any | {}) {
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}

export function getSingleStrapiMedia(media:any | {}) {
  const imageUrl = media.attributes.url.startsWith("/")
    ? getStrapiURL(media.attributes.url)
    : media.attributes.url;
  return imageUrl;
}

export function getStrapiData(data:any | {}) {
  const value = data.attributes;
  return value; 
}