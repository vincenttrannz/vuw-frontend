# Victora University of Wellington - Wellington Faculty of Architecture and Design Innovation

VUW Project is based on [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [Strapi CMS](https://strapi.io/).

## Table of Content
* [I. Hosting with VUW Server and Nginx](#i-hosting-with-vuw-server-and-nginx)
  - [To connect to VUW server](#to-connect-to-vuw-server)
  - [Development and Deployment environment](#development-and-deployment-environment)
* [II. Development environment overview](#ii-development-environment-overview)
  - [1. First step](#1-first-step)
  - [2. Second step](#2-second-step)
  - [3. Development step](#3-development-step)
    - [3.1 - Setting up API and fetching data](#31---setting-up-api-and-fetching-data)
      - [`/lib/api.ts`](#libapits)
      - [`/lib/fetchData.ts`](#libfetchdatats)
    - [3.2 - Compiler](#32---compiler--compilerstypetsx)
    - [3.3 - Next Config](#33---next-config--nextconfigjs)
    - [3.4 - React Pages](#34---react-pages--pages)
      - [App](#app--pages_apptsx)
      - [Homepage](#homepage--pagesindextsx)
      - [About page](#about-page--pagesabouttsx)
      - [Event page](#event-page--pageseventstsx)
      - [Privacy page](#privacy-page--pagesprivacytsx)
      - [Error Pages](#error-pages--pages_errortsx)
        - [404 Page](#404-page--pagescustom404tsx)
        - [500 Page](#500-page--pagescustom500tsx)
    - [3.5 - React Components](#35---react-components--pagescomponents)
      - [HeadData](#headdata)
      - [NavBar](#navbar)
      - [Footer](#footer)
      - [StickySocial](#stickysocial)
      - [ShareContainer](#sharecontainer)
      - [TextDivider](#textdivider)
      - [ImgCaption](#imgcaption)
      - [VicButton](#vicbutton)
      - [PageHerroBanner](#pageherobanner)
      - [ScrollDownIndicator](#scrolldownindicator)
      - [OtherProjects](#otherprojects)
      - [Project3D](#project3d)
      - [ProjectCarousel](#projectcarousel)
      - [ProjectCode](#projectcode)
      - [ProjectPDF](#projectpdf)
      - [ProjectVideo](#projectvideo)
      - [ProjectContainer](#projectcontainer)
      - [EventContainer](#eventcontainer)
      - [AllProjects](#allprojects)
      - [AllEvents](#allevents)
      - [Project Inner page](#project-inner-page--pagesprojectslugtsx)
      - [Event Inner page](#event-inner-page--pageseventslugtsx)
    - [4 - Stylesheet](#4---stylesheet-→-stylesheet)


## I. Hosting with VUW Server and Nginx
The current site is being deployed over VUW Server. There are currently two directories inside the folder has my name on it `vincent`

  * `vuw-frontend` - This folder linked to the [frontend repo](https://github.com/psychoactive-studios/vuw-frontend) on Psychoactive Github
  * `vuw-backend` - This folder linked to the [backend repo](https://github.com/psychoactive-studios/vuw-backend) on Psychoactive Github
  * AWARE: both of these 2 folders have their own branch for deployment which is `vuw`

### To connect to VUW server:
  * `ssh vincent@vuwunicodesjav1.vuw.ac.nz`
  * Password: Please consult with Psychoactive Account manager
Note: Contact VUW later in the future if require to create a new connection account / password to server

### Development and Deployment environment
  * Ensure the Node JS version USED is v14.18.2
  * There is also [PM2](https://pm2.keymetrics.io/) installed that will help managing and keep application online 24/7)
    - Check the list of app that currently running by `pm2 list`, you will find 2 apps that currently running in the list:
      - `vuw-frontend`
      - `vuw-backend`
    - To STOP the app `pm2 stop <app-name>`
    - To RESTART the app `pm2 restart <app-name>`
    - There are also DELETE, START

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

## II. Development environment overview
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

#### 3.3 - Next Config → `/next.config.js`
This is the configuration file for the site to accept the server side settings.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: '/(.*)?', // Matches all pages
      headers: [{
        key: 'X-Frame-Options',
        value: 'ALLOWALL',
      }]
    }]
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost", "vuwunicodesjav1.vuw.ac.nz", "eoye.nz"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
}

module.exports = nextConfig
```

* Please add different domain to `domains` array as loading other than current 3 image sources.

#### 3.4 - React pages → `/pages/`

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

#### 3.5 - React Components → `/pages/components/`

#### HeadData
This component used for render next/head meta data format to all NextPage for SEO purposes.
  * OG: locale, type, title, quote, hashtag, image, url, site_name, description
  * robots
  * _token
  * website: favicon, title, url, quote, description, image
  * CDN: React slick-carousel
  * Google font: Inter

#### NavBar
This component creates the Navigation on the top of the webpage and responsive on mobile.

Create a set of links to different page on the site:
  * Student Works (Homepage)
  * About
  * Events
  * Contact
  * Enrol
  * Facebook
  * Instagram

Toggle class name when people click on the HAMBURGER menu

#### Footer
The Footer information at the bottom of the webpage and responsive on mobile.

It is also included a set of links similarly to Navbar.

#### StickySocial
Small container for people to click and link to WFADI's Facebook and Instagram.

#### ShareContainer
Side Facebook, LinkedIn, Twitter and Copy container for Project / Event inner page

#### TextDivider
'Teal' line divider underneath each of the heading. There is a prop you can pass to this component which is `prime` and it is boolean:
  * `prime={true}` - the divider is longer than the normal one
  * `prime={false}` - the divider is shorter than the prime one

#### ImgCaption
This component renders the caption for Image and the data came from the CMS.
```ts
function urlify(text:string) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url:string) {
    return `<a target="_blank" href="${url}">${url}</a>`;
  })
}
```
This `function urlify(text: string)` find the HTTP or HTTPS within the string and turn it into a clickable URL. 

#### VicButton
The special button for WFADI came with SVG lottie animation for PREV / NEXT arrow.

The component came with optional props:
  * `ClickFunc?: () => void;` → To pass the onClick function to this component
  * `className?: string;` → Extra class name for this component, styling purpose
  * `variant?: string;` → This need to add `vic` to be able to get the `btn-vic` styling  
  * `btnType?: string;` → Value are only `prev` or `next`, in order to add the NEXT / PREV arrow hover effect to the button
  * `btnText?: string;` → Add the TEXT for the button
  * `disable?: boolean;` → DISABLE the button to avoid people to click on

#### PageHeroBanner
The top of page hero banner and text for Homepage, About, Event, Privacy, 404 and 500 page.

The component came with some props:
  * `className?: string;` → OPTIONAL: pass another class name to this component for styling purpose
  * `OtherSide?: boolean;` → OPTIONAL: Switch side of the BLACK text box
  * `HomepageSubtitle?: boolean;` → OPTIONAL: Subtitle top and bottom of the <H1> heading on Homepage
  * `HeroBanner: string;` → URL to the background image of the banner
  * `HeroTitle: string;` → <H1> text for the blackbox
  * `HideScrollIndicator?: boolean;` → OPTIONAL: set to `true` to hide the SCROLL INDICATOR

#### ScrollDownIndicator
The scrolling down indicator with an ARROW DOWN.

#### OtherProjects
The container to store 3 extra random projects display on Event / Project inner page.

#### Project3D
The <iframe> container use for display SketchFab 3D render on the website.

#### ProjectCarousel
The container for images slider. This component is using `react-slick`.

#### ProjectCode
The <iframe> container use for display Codepen project render on the website.

#### ProjectPDF
The container for displaying the PDF on the website. This component is using `react-pdf-viewer`.

#### ProjectVideo
The <iframe> container use for display Vimeo video render on the website.

#### ProjectContainer
This component is very important for displaying, filtering and searching for projects.

```tsx
type ProjectsProps = {
  projects: Projects;
  schoolData: Schools;
  levelData: Levels;
  awardData: Awards;
};
// This function attached to each click on the category block to function the filter system
const handleFilter = (event: MouseEvent<HTMLDivElement>)

// This function to return project that match with FilterArray, it compared between the ProjectFilterElement array which stored all the filter keys of the project.
const filterOnSelectedFilter = (filterProjects: Projects, selectedFilters: string[])

// This function attached to the search input, currently search for: Tags, StudentName and Title
const handleSearch = async (event: ChangeEvent<HTMLInputElement>)

// This function filter the projects for any project's Tags, StudentName and Title that includes the search term
const filterOnTextQuery = (projects: Projects, searchTerm: string): Projects

// Logic for paginated projects.
// This to set amount of projects display per page when user click NEXT / PREV
useEffect(() => {
  if (projects && projects.length) {
    switch (currentPage) {
      case 1:
        setPaginatedProjects(projects.slice(0, 12));
        break;
      case 2:
        setPaginatedProjects(projects.slice(12, 24));
        break;
      default:
        setPaginatedProjects(
          projects.slice(currentPage * 12, currentPage * 12 + 12)
        );
        break;
    }
  }
}, [currentPage, projects]);
```

#### EventContainer
This component is very important for displaying, filtering and searching for events.

This component shared a few functions that similarly logic with the [ProjectContainer](#projectcontainer)

#### AllProjects
This component is displaying all project card with all the class name for styling the card.

#### AllEvents
This component is displaying all event card with all the class name for styling the card.

#### Project Inner page → `/pages/project/[slug].tsx`
This component is DYNAMIC and also the PROJECT inner page.
  * Displaying Project's information from CMS
    - Student details
    - Main featured project
    - Sub projects
    - ShareContainer
    - OtherProjects (3 randomise from the CMS)

#### Event Inner page → `/pages/event/[slug].tsx`
This component is DYNAMIC and also the Event inner page.
  * Displaying Event's information from CMS
    - Event details
    - Event rich text description
    - ShareContainer
    - 3 randomise events from the CMS

#### 4 - Stylesheet → `/stylesheet`
The directory is storing all the scss files for the project. The `master.scss` is the main scss that mount to `_app.tsx`.

There are 2 main required dependancies stylesheets for the site:
  * Hamburger library `hamburgers.css`
  * React PDF Viewer
    - `@react-pdf-viewer/core/lib/styles/index.css`
    - `@react-pdf-viewer/default-layout/lib/styles/index.css'`

In order to apply new style to the site:
  * First - create a new scss stylesheet `_filename.scss` inside the stylesheet folder.
    - If it is for a whole new PAGE, create it inside the `stylehsheet`
    - If it is for components, create it inside the `components`
    - If it is for layout, create it inside the `layout`
  * Second - Import the stylesheet file `_filename.scss` you just create into `master.scss`

  ```scss
  @import 
  // HAMBURGER LIBRARY
  "./hamburgers.css",
  "./variables",
  "./mixin",
  "./homepage",
  "./about",
  "./privacy",
  "./base",
  "./filename" // -> the new file you just created
  "./components/navBar",
  "./components/footer",
  "./components/projectContainer",
  "./components/projectInner",
  "./components/views/ProjectWrapper",
  "./components/views/ShareContainer",
  "./components/views/StudentDetailsContainer",
  "./components/views/Lotties",
  "./layout/twoColumnsBlock",
  "./layout/threeColumnsBlock",
  "./layout/VicWorkInnerPage"
  ;
  ```

  * Third - Then start styling normallly


