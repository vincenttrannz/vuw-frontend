import type { NextPage } from "next";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import { EventPage, Events, EventCategories } from "../compilers/type";
import ThreeColumnsBlock from './layout/ThreeColumnsBlock';
import TextDivider from './components/views/TextDivider';
import HeadData from "./components/HeadData";
import PageHeroBanner from './components/views/PageHeroBanner'
import ImgCaption from './components/views/ImgCaption'
import EventContainer from './components/EventContainer'

type EventPageProps = {
  eventPage: EventPage;
  events: Events;
  eventCategories: EventCategories
};

const Event: NextPage<EventPageProps> = ({ eventPage, events, eventCategories }) => {
  console.log("Event page:", eventPage);

  const EventPageShareImageSeo = getStrapiMedia(getStrapiData(eventPage).SeoData.ShareImage);
  const EventPageSeoTitle = getStrapiData(eventPage).SeoData.MetaTitle;
  const EventPageSeoDescription = getStrapiData(eventPage).SeoData.MetaDescription;
  const EventPageHeroBanner = getStrapiMedia(getStrapiData(eventPage).EventPageHeroBanner);
  const EventPageHeroBannerCaption = getStrapiData(eventPage).EventPageHeroBanner.data.attributes.caption;
  const EventPageQuickIntroTitle = getStrapiData(eventPage).QuickIntroTitle;
  const EventPageQuickIntroColumnOne = getStrapiData(eventPage).QuickIntroColumnOne;
  const EventPageQuickIntroColumnTwo = getStrapiData(eventPage).QuickIntroColumnTwo;
  // console.log("Event hero banner:", EventPageHeroBanner);
  
  return (
    <>
      <HeadData
        title={EventPageSeoTitle}
        description={EventPageSeoDescription}
        image={EventPageShareImageSeo}
      />
      <PageHeroBanner
        OtherSide={true}
        HeroBanner={EventPageHeroBanner}
        HeroTitle="Events"
      />
      <ImgCaption className="mx-2" caption={EventPageHeroBannerCaption}/>
      <ThreeColumnsBlock className="px-sm-3 px-xl-7 mt-3 mt-md-0">
        <div className="textblock-with-divider">
          <h3>{EventPageQuickIntroTitle}</h3>
          <TextDivider prime/>
        </div>
        <div>
          <p>{EventPageQuickIntroColumnOne}</p>
        </div>
        <div>
          <p>{EventPageQuickIntroColumnTwo}</p>
        </div>
      </ThreeColumnsBlock>
      <EventContainer events={events} eventCategories={eventCategories}/>
    </>
  )
}

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
        "event_category"
      ],
    };
    const eventCategoryQuery = {
      populate: "*"
    };
    const [eventPageRes, eventsRes, eventCategoryRes] = await Promise.all([
      fetchAPI("/event-page", eventPageQuery),
      fetchAPI("/events", eventsQuery),
      fetchAPI("/event-categories", eventCategoryQuery)
    ]);
  
    return {
      props: { 
        eventPage: eventPageRes.data,
        events: eventsRes.data,
        eventCategories: eventCategoryRes.data
      },
      revalidate: 1,
    };
}

export default Event;