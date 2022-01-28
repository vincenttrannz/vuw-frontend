import "../stylesheet/master.scss";
import App from "next/app";
import Head from "next/head";
import HeadData from "./components/HeadData";
import type { AppProps } from "next/app";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import NavBar from "./components/NavBar";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

function VicApp({ Component, pageProps }: AppProps) {
  const { global } = pageProps;
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.data.attributes.Favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global}>
        <NavBar/>
        <div className="main">
          <Component {...pageProps} />
        </div>
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
  const global = await fetchAPI("/api/global?populate=*");
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default VicApp;
