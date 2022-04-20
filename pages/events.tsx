import type { NextPage } from "next";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import { EventPage, Events, EventCategories, EventTypes } from "../compilers/type";
import ThreeColumnsBlock from './layout/ThreeColumnsBlock';
import TextDivider from './components/views/TextDivider';
import HeadData from "./components/HeadData";
import PageHeroBanner from './components/views/PageHeroBanner';
import ImgCaption from './components/views/ImgCaption';
import StickyShare from './components/views/StickySocial';
import EventContainer from './components/EventContainer'

type EventPageProps = {
  eventPage: EventPage;
  events: Events;
  eventCategories: EventCategories;
  eventTypes: EventTypes;
};

const Event: NextPage<EventPageProps> = ({ eventPage, events, eventCategories, eventTypes }) => {
  const EventPageShareImageSeo = getStrapiMedia(getStrapiData(eventPage).SeoData.ShareImage);
  const EventPageSeoTitle = getStrapiData(eventPage).SeoData.MetaTitle;
  const EventPageSeoDescription = getStrapiData(eventPage).SeoData.MetaDescription;
  const EventPageHeroBanner = getStrapiMedia(getStrapiData(eventPage).EventPageHeroBanner);
  const EventPageHeroBannerCaption = getStrapiData(eventPage).EventPageHeroBanner.data.attributes.caption;
  const EventPageQuickIntroTitle = getStrapiData(eventPage).QuickIntroTitle;
  const EventPageQuickIntroSubtitle = getStrapiData(eventPage).QuickIntroSubtitle;
  const EventPageQuickIntroColumnOne = getStrapiData(eventPage).QuickIntroColumnOne;
  const EventPageQuickIntroColumnTwo = getStrapiData(eventPage).QuickIntroColumnTwo;
  
  return (
    <>
      <HeadData
        title={EventPageSeoTitle}
        description={EventPageSeoDescription}
        image={EventPageShareImageSeo}
      />
      <StickyShare/>
      <PageHeroBanner
        OtherSide={true}
        HeroBanner={EventPageHeroBanner}
        HeroTitle="Events"
      />
      <ImgCaption id="caption-hero" className="mx-2 mx-lg-3" caption={EventPageHeroBannerCaption}/>
      <ThreeColumnsBlock className="px-sm-3 px-xl-7 mt-3 mt-md-0">
        <div className="textblock-with-divider">
          <h2 tabIndex={0} className="h3">{EventPageQuickIntroTitle}</h2>
          <TextDivider prime/>
          <h3 tabIndex={0} className="h6">{EventPageQuickIntroSubtitle}</h3>
        </div>
        <div>
          <p tabIndex={0}>{EventPageQuickIntroColumnOne}</p>
        </div>
        <div>
          <p tabIndex={0}>{EventPageQuickIntroColumnTwo}</p>
        </div>
      </ThreeColumnsBlock>
      <EventContainer events={events} eventCategories={eventCategories} eventTypes={eventTypes}/>
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
}

export default Event;