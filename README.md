# Victora University of Wellington - Wellington Faculty of Architecture and Design Innovation

VUW Project is based on [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [Strapi CMS](https://strapi.io/).

## Deploy on VUW Server with Nginx
The current site is being deployed over VUW Server. There are currently two directories inside the folder has my name on it `vincent`

  * `vuw-frontend` - This folder linked to the [frontend repo](https://github.com/psychoactive-studios/vuw-frontend) on Psychoactive Github
  * `vuw-backend` - This folder linked to the [backend repo](https://github.com/psychoactive-studios/vuw-backend) on Psychoactive Github
  * AWARE: both of these 2 folders have their own branch for deployment which is `vuw`

### `/etc/nginx/sites-available/vuwunicodesjav1.vuw.ac.nz`

  ```conf
  server {
          # Listen HTTP
          listen 80;
          listen [::]:80;
          server_name vuwunicodesjav1.vuw.ac.nz;

          #access_log /var/log/nginx/nginx.vhost.access.log;
          #error_log /var/log/nginx/nginx.vhost.error.log;
    
          # Static Root
          location / {
                  add_header 'Access-Control-Allow-Origin' '*';
                  proxy_pass http://localhost:3000;
                  proxy_http_version 1.1;
                  proxy_set_header X-Forwarded-Host $host;
                  proxy_set_header X-Forwarded-Server $host;
                  proxy_set_header X-Real-IP $remote_addr;
                  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                  proxy_set_header X-Forwarded-Proto $scheme;
                  proxy_set_header Host $http_host;
                  proxy_set_header Upgrade $http_upgrade;
                  proxy_set_header Connection "Upgrade";
                  proxy_pass_request_headers on;
          }

          location /backend {
                  rewrite ^/backend/?(.*)$ /$1 break;
                  add_header 'Access-Control-Allow-Origin' '*';
                  proxy_pass http://localhost:1337;
                  #proxy_http_version 1.1;
                  #proxy_set_header X-Forwarded-Host $host;
                  #proxy_set_header X-Forwarded-Server $host;
                  #proxy_set_header X-Real-IP $remote_addr;
                  #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                  #proxy_set_header X-Forwarded-Proto $scheme;
                  #proxy_set_header Host $http_host;
                  proxy_set_header Upgrade $http_upgrade;
                  proxy_cache_bypass $http_upgrade;
                  #proxy_set_header Connection "Upgrade";
                  #proxy_pass_request_headers on;
          }
  }
  ```
  * `location /` proxy_pass to the localhost port 3000 which is the Frontend of the VUW Site
  * `location /backend` proxy_pass to the localhost port 1337 which is the Backend of the VUW Site
  * Make sure you check the nginx status that it run successfully

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

#### 3.1 - Setting up API and fetching data

#### `/lib/api.ts`

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
  
#### `/lib/fetchData.ts`

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

#### 3.2 - Compiler → `/compilers/type.tsx`
This file declared all the types of the dependancies (Fields/Variables) fetch from Strapi database.

#### 3.3 - React pages → `/pages/`

#### App → `/pages/_app.tsx`

  ```tsx
  import "../stylesheet/master.scss";
  import App from "next/app";
  import type { AppProps } from "next/app";
  import { createContext } from "react";
  import { fetchAPI } from "../lib/api";
  import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
  import NavBar from "./components/NavBar";
  import Footer from './components/Footer'
  import HeadData from "./components/HeadData";

  // Store Strapi Global object in context
  export const GlobalContext = createContext({});

  function VicApp({ Component, pageProps }: AppProps) {
    const { global } = pageProps;
    return (
      <>
        {/* META SEO DATA - START */}
        <HeadData
          favicon={getStrapiMedia(global.attributes.Favicon)}
          sitename={getStrapiData(global).SiteName}
        />
        {/* META SEO DATA - END */}
        <GlobalContext.Provider value={global.attributes}>
          <NavBar ContactLink={global.attributes.ContactLink} EnrolLink={global.attributes.EnrolLink}/>
          <main role="main" className="main">
            <Component {...pageProps} />
          </main>
          <Footer DisplayPhone={global.attributes.DisplayPhone} PhoneNumber={global.attributes.PhoneNumber}/>
        </GlobalContext.Provider>
      </>
    );
  }

  // getInitialProps disables automatic static optimization for pages that don't
  // have getStaticProps. So article, category and home pages still get SSG.
  // Hopefully we can replace this with getStaticProps once this issue is fixed:
  // https://github.com/vercel/next.js/discussions/10949
  VicApp.getInitialProps = async (ctx: any) => {
    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(ctx);
    // Fetch global site settings from Strapi
    const query = {populate: "*"};
    const globalRes = await fetchAPI("/global", query);
    // Pass the data to our page via props
    return { ...appProps, pageProps: { global: globalRes.data }};
  };
  ```
  * Main `_app`:
    - Store Strapi global collection in a context and provide this data across the site
    - Render: NavBar, Footer and every Component

#### Homepage → `/pages/index.tsx`

  ```tsx
  type HomepageProps = {
    homepage: Homepage;
    projects: Projects;
    levels: Levels,
    schools: Schools;
    awards: Awards;
  };

  const Home: NextPage<HomepageProps> = ({homepage, projects, schools, levels, awards}) => {
     /**
     * 1. Declared variables
     * 2. Render components
     *    • HeadData
     *    • StickyShare
     *    • PageHeroBanner
     *    • ThreeColumnsBlock
     *    • TextDivider
     *    • ProjectContainer
     **/
  };

  export async function getStaticProps() {
    // Declared all the query to populate the required data from different collections
    // ...
    // await for all data to be returned
    const [homepageRes, projectsRes, schoolRes, levelRes, awardRes] = await Promise.all([
      fetchAPI("/homepage", HomepageQuery),
      fetchAPI("/projects", projectQuery),
      fetchAPI("/schools", schoolQuery),
      fetchAPI("/levels", levelQuery),
      fetchAPI("/awards", awardQuery)
    ]);
    // Passing to the page props
    return {
      props: { 
        homepage: homepageRes.data, 
        projects: projectsRes.data.sort(() => 0.5 - Math.random()), // Return the projects in random order
        schools: schoolRes.data,
        levels: levelRes.data,
        awards: awardRes.data
      },
      revalidate: 1,
    };
  }
  ```

  * Declared all the type of props that passed to Home
  * `NextPage<HomepageProps> = ({homepage, projects, schools, levels, awards})` - All the props that passed from `getStaticProps`
    - Declared all the variables `const` to be able to access it.
    - use `getStrapiData` to access the data correctly with the Strapi api path
  * `getStaticProps` - Query all the required collection data from Strapi CMS
    - `/homepage`
    - `/projects`
    - `/schools`
    - `/levels`
    - `/awards`

#### About page → `/pages/about.tsx`

  ```tsx
  type AboutpageProps = {
    about: About;
  };

  const About: NextPage<AboutpageProps> = ({ about }) => {
    /**
     * 1. Declared variables
     * 2. Render components
     *    • HeadData
     *    • StickyShare
     *    • PageHeroBanner
     *    • ImgCaption
     *    • TwoColumnsBlock
     **/
  }

  export async function getStaticProps() {
    // Run API calls in parallel
    const query = {
      populate: [
        "*",
        "AboutHeroBanner",
        "SeoData.ShareImage",
        "AboutPageInfoBlock",
        "AboutPageInfoBlock.BlockImage",
        "FirstContentGreyBlock",
        "ArchitectureSchool",
        "ArchitectureSchool.BlockImage",
        "SecondContentGreyBlock",
        "DesignSchool",
        "DesignSchool.BlockImage",
        "ThirdContentGreyBlock",
      ],
    };
    const [aboutRes] = await Promise.all([fetchAPI("/about", query)]);

    return {
      props: { about: aboutRes.data },
      revalidate: 1,
    };
  }
  ```
  * Declared all the type of props that passed to About
  * `const About: NextPage<AboutpageProps> = ({ about })` - The about props that passed from `getStaticProps`
    - Declared all the variables `const` to be able to access it.
    - use `getStrapiData` to access the data correctly with the Strapi api path
  * `getStaticProps` - Query all the required collection data from Strapi CMS
    - `/about`

#### Event page → `/pages/events.tsx`

  ```tsx
  type EventPageProps = {
    eventPage: EventPage;
    events: Events;
    eventCategories: EventCategories;
    eventTypes: EventTypes;
  };

  const Event: NextPage<EventPageProps> = ({ eventPage, events, eventCategories, eventTypes }) => {
    /**
     * 1. Declared variables
     * 2. Render components
     *    • HeadData
     *    • StickyShare
     *    • PageHeroBanner
     *    • ImgCaption
     *    • ThreeColumnsBlock
     *    • EventContainer
     **/
  };

  export async function getStaticProps() {
    // Run API calls in parallel
    const eventPageQuery = {
      populate: [
        "*",
        "SeoData.ShareImage",
        "EventPageHeroBanner"
      ]
    };
    const eventsQuery = {
      populate: [
        "*",
        "EventImageThumbnail",
        "EventPhotoGallery",
        "event_categories",
        "event_type",
      ],
    };
    const eventCategoryQuery = {
      populate: "*"
    };
    const eventTypeQuery = {
      populate: "*"
    };
    const [eventPageRes, eventsRes, eventCategoryRes, eventTypeRes] = await Promise.all([
      fetchAPI("/event-page", eventPageQuery),
      fetchAPI("/events", eventsQuery),
      fetchAPI("/event-categories", eventCategoryQuery),
      fetchAPI("/event-types", eventTypeQuery)
    ]);
  
    return {
      props: { 
        eventPage: eventPageRes.data,
        events: eventsRes.data.sort((a:any, b:any) => Date.parse(String(b.attributes.EventStartDate)) - Date.parse(String(a.attributes.EventStartDate))),
        eventCategories: eventCategoryRes.data,
        eventTypes: eventTypeRes.data
      },
      revalidate: 1,
    };
  };
  ```
  * Declared all the type of props that passed to Event
  * `const Event: NextPage<EventPageProps> = ({ eventPage, events, eventCategories, eventTypes })` - The about props that passed from `getStaticProps`
    - Declared all the variables `const` to be able to access it.
    - use `getStrapiData` & `getStrapiMedia` to access the data correctly with the Strapi api path
  * `getStaticProps` - Query all the required collection data from Strapi CMS
    - `/event-page`
    - `/events`
    - `/event-categories`
    - `/event-types`
  * NOTE: `events: eventsRes.data.sort((a:any, b:any) => Date.parse(String(b.attributes.EventStartDate)) - Date.parse(String(a.attributes.EventStartDate))),`
    - This is aim to sort the UPCOMING EVENT before the PAST EVENT when returned the data

#### Privacy page → `/pages/privacy.tsx`

  ```tsx
  type PrivacyPageProps = {
    privacy: PrivacyPage;
  }

  const privacy: NextPage<PrivacyPageProps> = ({privacy}) => {
    /**
     * 1. Declared variables
     * 2. Render components
     *    • HeadData
     *    • StickyShare
     *    • PageHeroBanner
     *    • ImgCaption
     *    • Container
     *    • TextDivider
     *    • ReactMarkdown
     **/
  }

  export async function getStaticProps() {
    const query = {
      populate: [
        "*",
        "SeoData.ShareImage",
        "HeroBanner"
      ]
    }

    const privacyRes = await fetchAPI("/privacy", query);

    return {
      props: {
        privacy: privacyRes.data
      },
      revalidate: 1
    }
  }
  ```
  * Declared all the type of props that passed to Privacy
  * `const privacy: NextPage<PrivacyPageProps> = ({privacy})` - The about props that passed from `getStaticProps`
  * `getStaticProps` - Query all the required collection data from Strapi CMS
    - `/privacy`

#### Error Pages → `/pages/_error.tsx`

  ```tsx
  import React from 'react';
  import Custom404 from './Custom404';
  import Custom505 from './Custom500';

  function Error({statusCode}:any) {
    return (
      <>
        {
          statusCode
          ? <Custom505/>
          : <Custom404/>
        }
      </>
    )
  }

  Error.getInitialProps = ({ res, err }:any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }

  export default Error;
  ```

  This configuration `_error.tsx` to render different page on different ERROR logic
  * If there is any error code apart from 404, return the 500 page else return the 404 page

#### 404 Page → `/pages/Custom404.tsx`

  ```tsx
  export default function Custom404() {
    return (
      <>
        <HeadData
          title='WFADI 404 Page'
        />
        <PageHeroBanner
          className='customError px-xl-6'
          OtherSide={false}
          HomepageSubtitle={false}
          HeroBanner={"/img/hero-banner.jpg"}
          HeroTitle="404"
          HideScrollIndicator={true}
        />
        <TwoColumnsBlock className='px-2 px-xl-7'>
          <div>
            <div className="textblock-with-divider">
              <h3>Page not found</h3>
              <TextDivider prime/>
            </div>
          </div>
          <div>
            <p>Oops the page you are looking does not exists. Check the URL to make sure you did not mis spell anything or return to the homepage.</p>
            <Link href="/">
              <a target="_self" className="btn btn-vic mt-2 mt-md-3">
                Homepage
              </a>
            </Link>
          </div>
        </TwoColumnsBlock>
      </>
    )
  }
  ```

#### 500 Page → `/pages/Custom500.tsx`

  ```tsx
  export default function Custom500() {
    return (
      <>
        <HeadData
          title='WFADI 500 Page'
        />
        <PageHeroBanner
          className='customError px-lg-6'
          OtherSide={false}
          HomepageSubtitle={false}
          HeroBanner={"/img/hero-banner.jpg"}
          HeroTitle="404"
          HideScrollIndicator={true}
        />
        <TwoColumnsBlock className='px-2 px-lg-7'>
          <div>
            <div className="textblock-with-divider">
              <h3>Server error</h3>
              <TextDivider prime/>
            </div>
          </div>
          <div>
            <p>Oops something went wrong. We are working hard to get the site back to work. Please visit us later.</p>
          </div>
        </TwoColumnsBlock>
      </>
    )
  }
  ```






