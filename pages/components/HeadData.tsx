import Head from 'next/head'
import React from 'react';
import { useRouter } from 'next/router'

interface Props {
  quote?: string;
  title?: string;
  image?: string;
  favicon?: string;
  description?: string;
  hashtag?: string;
}

const HeadData: React.FC<Props> = ({
  quote,
  title,
  image,
  favicon,
  description,
  hashtag,
}) => {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : '';
  const location = useRouter();
  const currentUrl = origin + location.pathname;
  // console.log(currentUrl);
  return (
    <Head>
      <title>{title}</title>
      <link
        rel="shortcut icon"
        href={favicon}
      />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Victoria University of Wellington - Design and Artchitecture" />
      <meta property="og:description" content={description} />
      {/* <!-- React Slick Carousel --> */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Inter fonts - Google font */}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
    </Head>
  );
};

export default HeadData;
