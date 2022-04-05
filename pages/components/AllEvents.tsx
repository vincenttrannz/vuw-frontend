import React from 'react';
import Link from 'next/link';
import Image from 'react-bootstrap/Image';
import { Events, Event } from "../../compilers/type";
import TextDivider from './views/TextDivider';
import { getStrapiMedia } from "../../lib/fetchData";

type EventsProps = {
  events: Events;
  event?: Event;
}

export default function AllEvents({ events }: EventsProps) {
  const today = + new Date();

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

  function eventGetTimestamp(checkTime:Date){
    if(today < Number(Date.parse(String(checkTime)))) {
      return (
        <span>Upcoming Event</span>
      )
    } else {
      return (
        <span>Past Event</span>
      )
    }
  }
  
  return (
    <>
      {
        events.map((event: Event, i: number) => {
          const EventThumbnail = getStrapiMedia(event.attributes.EventImageThumbnail);
          const EventName = event.attributes.EventName;
          const EventSlug = event.attributes.Slug;
          const EventType = event.attributes.event_type.data.attributes.EventTypeName;
          const EventShortDescription = event.attributes.EventShortDescription;
          const EventStartDate = new Date(Date.parse(String(event.attributes.EventStartDate))).toUTCString().split(' ').slice(0, 4).join(' ');
          const EventFinishDate = new Date(Date.parse(String(event.attributes.EventFinishDate))).toUTCString().split(' ').slice(0, 4).join(' ');
          const EventStartTime = tConvert(String(event.attributes.EventStartTime).split(":").slice(0, 2).join(':'));
          const EventFinishTime = tConvert(String(event.attributes.EventEndTime).split(":").slice(0, 2).join(':'));
          const EventLocation = event.attributes.EventLocation;
          const EventPriceType = event.attributes.EventPriceType;
          const EventPrice = event.attributes.EventPrice;

          return (
            <Link href={`/event/${EventSlug}`} key={i}>
              <a className="projectContainer__event shadow-sm">
                <div className='projectContainer__event__img-container h-100'>
                  <Image thumbnail src={EventThumbnail} alt="event thumbnail"/>
                  <div className='projectContainer__event__event-timestamp'>
                    {eventGetTimestamp(event.attributes.EventStartDate)}
                  </div>
                </div>
                <div className='projectContainer__event__info-container'>
                  <div className='projectContainer__event__info-container-event-title'>
                    <h4 className='mb-2'>{EventName}</h4>
                    <TextDivider prime={false}/>
                  </div>
                  <div className='projectContainer__event__info-container-description'>
                    <div className='projectContainer__event__info-container-description__intro'>
                      <p className='bold'>{EventType}</p>
                      <p>{EventShortDescription}</p>
                      <div className='btn btn-vic mt-auto'>
                        Find out more
                      </div>
                    </div>
                    <div className='projectContainer__event__info-container-description__details'>
                      <div className='detail-container'>
                        <p className='bold'>Date</p>
                        <p className='p2'>
                          <span>{EventStartDate}</span> {(EventFinishDate !== "Invalid Date") ? <span>- {EventFinishDate}</span> : ""} <br/>
                          <span>{EventStartTime}</span> - <span>{EventFinishTime}</span>
                        </p>
                      </div>
                      <div className='detail-container'>
                        <p className='bold'>Location</p>
                        <p className='p2'>{EventLocation}</p>
                      </div>
                      <p className='bold price-type'>
                        {
                          (EventPriceType == "Free")
                          ?
                          "FREE"
                          :
                          EventPrice
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          )
        })
      }
    </>
  )
}