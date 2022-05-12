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
import ShareContainer from '../components/views/ShareContainer';

type EventPageProps = {
  event: Event;
  randomThreeEvents: Events;
}

const EventPage: NextPage<EventPageProps> = ({event, randomThreeEvents}) => {
  const eventData = event.attributes;  
  const router = useRouter();
  const [ThreeProjects, RandomThreeProjects] = useState(event.attributes.projects.data);
  const RequiredRandomThreeEvents = randomThreeEvents.filter(randomEvent => randomEvent.attributes.Slug !== eventData.Slug);
  const StartTimeCalendar = (eventData.EventStartTime) ? new Date(String(`${eventData.EventStartDate}T${eventData.EventStartTime}Z`)).toISOString() : new Date(String(eventData.EventStartDate)).toISOString();
  const EndTimeCalendar = (eventData.EventFinishDate && eventData.EventEndTime) ? new Date(String(`${eventData.EventFinishDate}T${eventData.EventEndTime}Z`)).toISOString() : (eventData.EventFinishDate) ? new Date(String(eventData.EventFinishDate)).toISOString() : ""
  
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

  // console.log("Start time:", StartTimeCalendar);
  // console.log("End time:", EndTimeCalendar);
  // console.log("Event location:", eventData.EventLocation);
  
  const eventICS = {
    title: `${eventData.EventName}`,
    description: `${(eventData.EventCalendarDescription) ? (eventData.EventCalendarDescription).replace(/(\r\n|\n|\r)/gm, " | ") : ""}`,
    startTime: `${StartTimeCalendar}`,
    endTime: `${EndTimeCalendar}`,
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
    RandomThreeProjects(event.attributes.projects.data.sort(() => 0.5 - Math.random()).slice(0, 3));
  }, [event.attributes.projects.data])

  const CustomEventParagraph = ({children}:any) => {
    if(children[0].type !== undefined && children[0].type == "img"){
      // Check if the children type is image
      return (
        <div className='event__img'>{children}</div>
      )
    } else if (children[0].type == "a") {
      // Check if the children type is anchor tag
      return (
        <Link href={children[0].props.href}>
          <a className='event__a' target="_blank">{children[0].props.href}</a>
        </Link>      
      )
    } else {
      // Check if the children type paragraph included anchor link
      return (
        <p className='event__p'>
          {
            children.map((element:any, index:number) => {
              if(typeof(element) !== "string" && element.type == "a"){
                return (
                  <Link key={index} href={element.props.href}>
                    <a className='event__a' target='_blank'>
                      {element.props.children}
                    </a>
                  </Link>
                )
              } else {
                return element
              }
            })
          }
        </p>
      )
    }
  };
  
  // Check event data
  // console.log("Event:", eventData);
  // console.log("Related student works:", ThreeProjects);
    
  return (
    <>
      <HeadData
        title={eventData.EventName}
        description={eventData.EventShortDescription}
        image={getStrapiMedia(eventData.EventImageThumbnail)}
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
                alt={eventData.EventImageThumbnail.data.attributes.alternativeText}
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
            <div tabIndex={0} className='textblock-with-divider'>
              <h6>Date</h6>
              <TextDivider prime={false}/>
              <p>
                {DateFormat(eventData.EventStartDate.toString())} {((eventData.EventFinishDate) ? ` - ${DateFormat(eventData.EventFinishDate.toString())}` : "")}<br/>
                {(eventData.EventStartTime) && tConvert(String(eventData.EventStartTime).split(":").slice(0, 2).join(':'))} {(eventData.EventEndTime) ? ` - ${tConvert(String(eventData.EventEndTime).split(":").slice(0, 2).join(':'))}` : ""}
              </p>
              <ICalendarLink filename='vuw-event.ics' className='event-calendar' event={eventICS}>
                <Calendar className="icon"/> Add to Calendar
              </ICalendarLink>
            </div>
            <div tabIndex={0} className='textblock-with-divider'>
              <h6>Location</h6>
              <TextDivider prime={false}/>
              {
                (eventData.EventGoogleLocation !== null && eventData.EventGoogleLocation !== "")
                ?
                <Link  href={eventData.EventGoogleLocation}>
                  <a className='details-content' target="_blank">
                    {eventData.EventLocation}
                  </a>
                </Link>
                :
                <ReactMarkdown className='details-content'>
                  {eventData.EventLocation}
                </ReactMarkdown>
              }
            </div>
            <div tabIndex={0} className='textblock-with-divider'>
              <h6>Event Type</h6>
              <TextDivider prime={false}/>
              <ReactMarkdown className='details-content'>
                {eventData.event_type.data.attributes.EventTypeName}
              </ReactMarkdown>
            </div>
            {
              (eventData.EventPriceType !== "Free") 
              ?
              <div tabIndex={0} className='textblock-with-divider'>
                <h6>Price</h6>
                <TextDivider prime={false}/>
                <ReactMarkdown className='details-content'>
                  {eventData.EventPrice}
                </ReactMarkdown>
              </div>
              :
              <div tabIndex={0} className='textblock-with-divider'>
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
              <div tabIndex={0} className='textblock-with-divider'>
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
            <h1 tabIndex={0} className='h2'>{eventData.EventName}</h1>
            <TextDivider prime/>
          </div>
          <div className="project-wrapper mt-0 mt-lg-3">
            <div className="project-info-container">
              <figure className='d-none d-lg-block'>
                <div className='image-container'>
                  <Image
                    src={getStrapiMedia(eventData.EventImageThumbnail)}
                    alt={eventData.EventImageThumbnail.data.attributes.alternativeText}
                    layout="fill"
                    objectFit='cover'
                    priority={true}
                  />
                </div>
                <figcaption>
                  <ImgCaption className="mx-0 my-1" caption={eventData.EventImageThumbnail.data.attributes.caption}/>
                </figcaption>
              </figure>
              <article tabIndex={0}>
                <ReactMarkdown 
                  className='content content__event-detail mt-0 mt-lg-4 mb-2'
                  components={{
                    p: (props) => <CustomEventParagraph {...props}/>
                  }}
                >
                  {eventData.EventRichDescription}
                </ReactMarkdown>
              </article>
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
              <ShareContainer className='d-flex d-lg-none mt-2'/>
            </div>
            <ShareContainer className='d-none d-lg-flex'/>
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
      randomThreeEvents: randomThreeEventsRes.data.sort(() => 0.5 - Math.random()).slice(0, 4)
    },
    revalidate: 1,
  }
}

export default EventPage;