import type { NextPage } from 'next';
import ICalendarLink from "react-icalendar-link";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import $ from 'jquery';
import { useRouter } from 'next/router';
import { Event, Events } from '../../compilers/type';
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/fetchData";
import { Container, Button } from "react-bootstrap";
import ReactMarkdown from 'react-markdown';
import Calendar from '/public/calendar.svg';
import HeadData from "../components/HeadData";
import AllEvents from '../components/AllEvents';
import TextDivider from '../components/views/TextDivider';
import VicButton from '../components/views/VicButton';
import ImgCaption from '../components/views/ImgCaption';
import ProjectCarousel from '../components/views/ProjectCarousel';
import ProjectVideo from '../components/views/ProjectVideo';
import OtherProjects from '../components/views/OtherProjects';

type EventPageProps = {
  event: Event;
  randomThreeEvents: Events;
}

const EventPage: NextPage<EventPageProps> = ({event, randomThreeEvents}) => {
  const eventData = event.attributes;
  const router = useRouter();
  const [ThreeProjects, RandomThreeProjects] = useState(event.attributes.projects.data);
  const RequiredRandomThreeEvents = randomThreeEvents.filter(randomEvent => randomEvent.attributes.Slug !== eventData.Slug);
  const StartTimeCalendar = new Date(String(`${eventData.EventStartDate}T${eventData.EventStartTime}Z`)).toISOString();
  const EndTimeCalendar = (eventData.EventFinishDate && eventData.EventEndTime) && new Date(String(`${eventData.EventFinishDate}T${eventData.EventEndTime}Z`)).toISOString()
  
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
    router.push("/events");
  }
  
  const eventICS = {
    title: `${eventData.EventName}`,
    description: `${eventData.EventCalendarDescription}`,
    startTime: `${StartTimeCalendar}`,
    endTime: `${EndTimeCalendar ? EndTimeCalendar : ""}`,
    location: `${eventData.EventLocation}`
  }

  const ProjectLink = (ProjectLinkDisplay:string, ProjectLink:string, i?:number) => {
    return (
      <Link key={i} href={ProjectLink}>
        <a target="_blank">{ProjectLinkDisplay}</a>
      </Link>
    )
  }

  useEffect(() => {
    const AllContent = Array.from($(".content").children());
    AllContent.forEach(content => {
      if(content.innerText.startsWith("<span>")) content.outerHTML = `<span class="p2 img-caption mx-0 my-1">${content.innerText}</span>`
      if(!content.classList.value.includes("img-caption") && content.children.item(0)?.tagName !== "IMG" && content.tagName !== "H6") content.classList.add("event-p");
    });
    RandomThreeProjects(event.attributes.projects.data.sort(() => 0.5 - Math.random()).slice(0, 3));
  }, [])
    
  return (
    <>
      <HeadData
        title={eventData.EventName}
        description={eventData.SeoData.MetaDescription}
        image={(eventData.SeoData.ShareImage) ? getStrapiMedia(eventData.SeoData.ShareImage) : ""}
      />
      <div id='eventPageWrapper' className='vic-work__wrapper'>
        <Container className='pt-3 pb-2 d-block d-lg-none'>
          <div className="textblock-with-divider mb-3">
            <h1 className='h2'>{eventData.EventName}</h1>
            <TextDivider prime/>
          </div>
          <figure>
            <div className='image-container'>
              <Image
                src={getStrapiMedia(eventData.EventImageThumbnail)}
                layout="fill"
                objectFit='cover'
                priority={true}
              />
            </div>
            <figcaption>
              <ImgCaption className="mx-0 my-1" caption={eventData.EventImageThumbnail.data.attributes.caption}/>
            </figcaption>
          </figure>
        </Container>
        <Container className='vic-work__left-container'>
          <VicButton
            variant='vic'
            btnType='prev'
            btnText='Back'
            className='prev-btn mb-3'
            ClickFunc={GoBack}
          />
          <div className='work-details-container'>
            <div className='textblock-with-divider'>
              <h6>Date</h6>
              <TextDivider prime={false}/>
              <p>
                {DateFormat(eventData.EventStartDate.toString())} {((eventData.EventFinishDate) ? ` - ${DateFormat(eventData.EventFinishDate.toString())}` : "")}<br/>
                {tConvert(String(eventData.EventStartTime).split(":").slice(0, 2).join(':'))} {(eventData.EventFinishDate) ? ` - ${tConvert(String(eventData.EventEndTime).split(":").slice(0, 2).join(':'))}` : ""}
              </p>
              <ICalendarLink filename='vuw-event.ics' className='event-calendar' event={eventICS}>
                <Calendar className="icon"/> Add to Calendar
              </ICalendarLink>
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
              (eventData.EventPriceType !== "Free") 
              ?
              <div className='textblock-with-divider'>
                <h6>Price</h6>
                <TextDivider prime={false}/>
                <ReactMarkdown className='details-content'>
                  {eventData.EventPrice}
                </ReactMarkdown>
              </div>
              :
              <div className='textblock-with-divider'>
                <h6>Price</h6>
                <TextDivider prime={false}/>
                <p className='details-content'>
                  {eventData.EventPriceType}
                </p>
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
          <div className="textblock-with-divider d-none d-lg-grid">
            <h1 className='h2'>{eventData.EventName}</h1>
            <TextDivider prime/>
          </div>
          <div className="project-wrapper mt-0 mt-lg-3">
            <div className="project-info-container">
              <figure className='d-none d-lg-block'>
                <div className='image-container'>
                  <Image
                    src={getStrapiMedia(eventData.EventImageThumbnail)}
                    layout="fill"
                    objectFit='cover'
                    priority={true}
                  />
                </div>
                <figcaption>
                  <ImgCaption className="mx-0 my-1" caption={eventData.EventImageThumbnail.data.attributes.caption}/>
                </figcaption>
              </figure>
              <ReactMarkdown className='content content__event-detail mt-0 mt-lg-4 mb-2'>
                {eventData.EventRichDescription}
              </ReactMarkdown>
              {
                (eventData.EventGallery) &&
                <ProjectCarousel projectData={eventData.EventGallery}/>
              }
              {
                (eventData.EventVideoLink) &&
                <ProjectVideo
                  ProjectVideoLink={eventData.EventVideoLink}
                />
              }
            </div>
          </div>
          {
            /**
             * RELATED STUDENT WORKS
             * If Three projects state is empty then don't display the whole section
             */
            (ThreeProjects.length > 0) &&
            <OtherProjects className='mt-4' heading='Related student work' projectData={ThreeProjects}/>
          }
          <div className='other-works-container mt-4'>
            <div className="textblock-with-divider mb-0 mb-md-3">
              <h3>Other events</h3>
              <TextDivider prime />
            </div>
            <AllEvents events={RequiredRandomThreeEvents}/>
          </div>
        </Container>
      </div>
    </>
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
    fallback: false,
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
      "EventGallery.ProjectImages",
      "event_category",
      "event_type",
      "projects.ProjectThumbnail",
      "projects.student.award",
      "projects.school",
      "projects.major",
      "projects.level",
      "projects.award"
    ]
  };

  const randomThreeEventsQuery = {
    populate: [
      "*",
      "EventImageThumbnail",
      "EventPhotoGallery",
      "event_category",
      "event_type",
    ]
  }

  const [eventRes, randomThreeEventsRes] = await Promise.all([
    fetchAPI("/events", eventQuery),
    fetchAPI("/events", randomThreeEventsQuery)
  ]);

  return {
    props: { 
      event: eventRes.data[0],
      randomThreeEvents: randomThreeEventsRes.data.sort(() => 0.5 - Math.random()).slice(0, 3)
    },
    revalidate: 1,
  }
}

export default EventPage;