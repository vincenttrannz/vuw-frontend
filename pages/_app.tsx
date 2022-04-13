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
  console.log("App global data:", global);
  return (
    <>
      {/* META SEO DATA - START */}
      <HeadData
        favicon={getStrapiMedia(global.attributes.Favicon)}
        sitename={getStrapiData(global).SiteName}
      />
      {/* META SEO DATA - END */}
      <GlobalContext.Provider value={global.attributes}>
        <NavBar/>
        <main role="main" className="main">
          <Component {...pageProps} />
        </main>
        <Footer/>
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

export default VicApp;
