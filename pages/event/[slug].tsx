import type { NextPage } from 'next';
import React from 'react';
import Link from 'next/link';
import $ from 'jquery';
import { useRouter } from 'next/router';
import { Event } from '../../compilers/type';
import { fetchAPI } from "../../lib/api";
import { Container, Button } from "react-bootstrap";
import ReactMarkdown from 'react-markdown';
import TextDivider from '../components/views/TextDivider';

type EventPageProps = {
  event: Event;
}

const EventPage: NextPage<EventPageProps> = ({event}) => {
  const eventData = event.attributes;
  const router = useRouter();

  const DateFormat = (date:string) => new Date(Date.parse(String(date))).toUTCString().split(' ').slice(0, 4).join(' ');
  
  function tConvert (time:any) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

  const GoBack = () => {
    window.scrollTo({
      top: 0
    })
    router.push("/event");
  }

  const ProjectLink = (ProjectLinkDisplay:string, ProjectLink:string, i?:number) => {
    return (
      <Link key={i} href={ProjectLink}>
        <a target="_blank">{ProjectLinkDisplay}</a>
      </Link>
    )
  }
  
  // Check event data
  console.log("Event:", eventData);
  return (
    <div className='vic-work__wrapper'>
      <Container className='vic-work__left-container'>
        <div className='work-details-container'>
          <Button
            onClick={GoBack}
            className="prev-btn mb-2"
            variant="vic"
          >
            <span className="the-arrow rotate"></span>{" "}
            <span className="btn-text">Back</span>
          </Button>
          <div className='textblock-with-divider'>
            <h6>Date</h6>
            <TextDivider prime={false}/>
            <p>
              {DateFormat(eventData.EventStartDate.toString())} {((eventData.EventFinishDate) ? ` - ${DateFormat(eventData.EventFinishDate.toString())}` : "")}<br/>
              {tConvert(String(eventData.EventStartTime).split(":").slice(0, 2).join(':'))} {(eventData.EventFinishDate) ? ` - ${tConvert(String(eventData.EventEndTime).split(":").slice(0, 2).join(':'))}` : ""}
            </p>
          </div>
          {
            [eventData.EventLocation, eventData.event_type.data.attributes.EventTypeName].map((eventContent:string, i:number) => {
              return (
                <div key={i} className='textblock-with-divider'>
                  {
                    (i == 0) ? <h6>Location</h6> : (i == 1) ? <h6>Event Type</h6> : ""
                  }
                  <TextDivider prime={false}/>
                  <ReactMarkdown className='details-content'>
                    {eventContent}
                  </ReactMarkdown>
                </div>
              )  
            })
          }
          {
            (eventData.EventPriceType !== "Free") &&
            <div className='textblock-with-divider'>
              <h6>Price</h6>
              <TextDivider prime={false}/>
              <ReactMarkdown className='details-content'>
                {eventData.EventPrice}
              </ReactMarkdown>
            </div>
          }
          {
            (
              eventData.EventFirstLink ||
              eventData.EventSecondLink ||
              eventData.EventThirdLink
            ) &&
            <div className='textblock-with-divider'>
              <h6>Links</h6>
              <TextDivider prime={false}/>
              {
                [
                  eventData.EventFirstLink,
                  eventData.EventSecondLink,
                  eventData.EventThirdLink
                ].map((el, i:number) => {
                  return (
                    (el !== null) ? ProjectLink(el, el, i) : ""
                  )
                })
              }
            </div>
          }
        </div>
      </Container>
      <Container className='vic-work__right-container'>
        EventPage show
      </Container>
    </div>
  )
}

export async function getStaticPaths() {
  const events = await fetchAPI("/events", {fields: ["slug"]});
  return {
    paths: events.data.map((event:any) => ({
      params: {
        slug: event.attributes.Slug
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({params}:any) {
  const eventQuery = {
    filters: {
      Slug: `${params ? params.slug : ""}`
    },
    populate: [
      "*",
      "SeoData.ShareImage",
      "EventImageThumbnail",
      "EventPhotoGallery",
      "event_category",
      "event_type"
    ]
  };

  const [eventRes] = await Promise.all([
    fetchAPI("/events", eventQuery)
  ]);

  return {
    props: { 
      event: eventRes.data[0],
    },
    revalidate: 1,
  }
}

export default EventPage;