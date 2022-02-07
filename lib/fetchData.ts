import { getStrapiURL } from "./api";

export function getStrapiMedia(media:any | {}) {
  const imageUrl = media.data.attributes.url.startsWith("/")
    ? getStrapiURL(media.data.attributes.url)
    : media.data.attributes.url;
  return imageUrl;
}

export function getSingleStrapiMedia(media:any | {}) {
  const imageUrl = media.attributes.url.startsWith("/")
    ? getStrapiURL(media.attributes.url)
    : media.attributes.url;
  return imageUrl;
}

export function getStrapiData(data:any | {}) {
  const value = data.data.attributes;
  return value; 
}