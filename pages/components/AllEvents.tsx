import React from 'react';
import Link from 'next/link';
import { Events, Event } from "../../compilers/type";
import TextDivider from './views/TextDivider';
import { getStrapiMedia } from "../../lib/fetchData";

type EventsProps = {
  events: Events;
  event?: Event;
}

export default function AllEvents({ events }: EventsProps) {
  return (
    <>
      {
        events.map((event: Event, i: number) => {
          const EventThumbnail = getStrapiMedia(
            event.attributes.EventImageThumbnail
          );

          return (
            <Link key={i} href={`#`}>
              <a className="projectContainer__event shadow-sm">
                <div className='projectContainer__event__img-container'>
                  <img src={EventThumbnail} alt="event thumbnail"/>
                </div>
              </a>
            </Link>
          )
        })
      }
    </>
  )
}