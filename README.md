# Victora University of Wellington - Wellington Faculty of Architecture and Design Innovation

VUW Project is based on [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [Strapi CMS](https://strapi.io/).

## Development environment overview:
  * Frontend - [Next.js](https://nextjs.org/) (Awareness: Node JS required version 14.18.2)
  * Backend - [Strapi CMS](https://strapi.io/)
  * React Bootstrap and SCSS Stylesheet
  * Plugins:
    - Code Project - [Codepen](https://codepen.io/)
    - 3D Project - [Sketchfab](https://sketchfab.com/)
    - Video Project - [Vimeo](https://vimeo.com/)
    - Images Slider Project - [React Slick Slider](https://react-slick.neostack.com/)
    - PDF Project - [React PDF Viewer](https://react-pdf-viewer.dev/)

### 1. First step
There are two ways you can setup the local development environment, both ways required the Strapi Backend CMS run first to connect with the frontend.
  * Setup your own local Strapi backend CMS by cloning this [repo](https://github.com/psychoactive-studios/vuw-backend) and make sure you are working on the 'master' branch

    ```bash
    # Step 1
    npm ci
    # Step 2 - the project will run on localhost:1337
    npm run develop
    # Step 3
    npm run build
    # Step 4 - the project will run on localhost:1337
    npm run start
    ```

  * Connect to the live server by creating the `.env` file in the root folder

    ```env
    NEXT_PUBLIC_STRAPI_API_URL="http://vuwunicodesjav1.vuw.ac.nz/backend"
    ```

### 2. Second step
Next step is run the frontend locally with:
  * If you chose with local development - after cloned the Strapi CMS Backend and ensure it run locally on [http://localhost:1337](http://localhost:3000)
  * OR if you decided to use live server

  ```bash
  npm run dev
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Development step

#### Setting up API and fetching data

  ##### `/lib/api.ts`

  ```ts
  import qs from "qs";

  export function getStrapiURL(path = "") {
    return `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
  }

  /**
  * Helper to make GET requests to Strapi API endpoints
  * @param {string} path Path of the API route
  * @param {Object} urlParamsObject URL params object, will be stringified
  * @param {Object} options Options passed to fetch
  * @returns Parsed API call response
  */

  // Helper to make GET requests to Strapi
  // export async function fetchAPI(path:string) {
  //   const requestUrl = getStrapiURL(path);
  //   const response = await fetch(requestUrl);
  //   const data = await response.json();
  //   return data;
  // }

  export async function fetchAPI(path:string, urlParamsObject = {}, options = {}) {
    // Merge default and user options
    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
      console.error(response.statusText);
      throw new Error(`An error occured please try again`);
    }
    const data = await response.json();
    return data;
  }
  ```

  * Import `qs` (querystring) - This library to handle the API query in order to return the correct data from Strapi CMS

  * Function ``getStrapiURL()`` - `process.env.NEXT_PUBLIC_STRAPI_API_URL` use the live Strapi API path if declared in the .env file || otherwise connect to localhost:1337

  * ``async function fetchAPI()``
    - Required parameters: path, urlParamsObject & options
    - Build request URL: This is request API query the strapi CMS database
    - Trigger API call: fetching data from the request API with headers method
    - Handle response: return data else throw error
  
  ##### `/lib/fetchData.ts`

  ```ts
  import { getStrapiURL } from "./api";

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
  ```

  * ``getStrapiMedia`` is function to return URL of upload files from Strapi CMS database
  * ``getStrapiData`` is function to read data from Strapi CMS database (other fields: Text, RichText, Boolean, etc)

## Deploy on VUW Server with Nginx

