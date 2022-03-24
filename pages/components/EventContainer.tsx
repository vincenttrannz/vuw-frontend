import React, { useState } from "react";
import { Events, EventCategories, EventTypes } from "../../compilers/type";
import TextDivider from "./views/TextDivider";
import AllEvents from './AllEvents'
import { Container, Button, Accordion, InputGroup, FormControl } from "react-bootstrap";
import SearchLogo from "../../public/search-logo.svg";
import getFilterList from '../functions/getFilterList';

type EventsProps = {
  events: Events;
  eventCategories: EventCategories;
  eventTypes: EventTypes;
};

const EventContainer: React.FC<EventsProps> = ({events, eventCategories, eventTypes}) => {
  console.log("Events:", events);
  console.log("Event categories:", eventCategories);
  console.log("Event types", eventTypes);
  
  let FilterArray = new Array;
  let FilterEvents = new Array;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedEvents, setPaginatedEvents] =
    useState<Events>(events);

  const EventYearCollection = Array.from(
    new Set(
      events.map(event => 
        new Date(event.attributes.EventStartDate).getFullYear().toString()  
      )
    )
  )
  const EventCategories = Array.from(
    eventCategories.map(category => category.attributes.EventCategoryName)
  );

  const EventTypes = Array.from(
    eventTypes.map(eventType => eventType.attributes.EventTypeName)
  );

  const EventPriceType = Array.from(
    events.map(event => event.attributes.EventPriceType)
  );
  
  return (
    <Container className="projectContainer">
      {/* EVENT DETAILS WRAPPER */}
      <div className="projectContainer__details-wrapper">
        <div className="bg-white rounded">
          <InputGroup>
            <FormControl
              placeholder="Search"
              aria-label="search"
              aria-describedby="search-field"
              className="border-0 bg-white py-0"
            />
            <div className="input-group-append">
              <button
                id="button-addon1"
                type="submit"
                className="btn btn-link text-primary"
              >
                <SearchLogo />
              </button>
            </div>
          </InputGroup>
        </div>
        {/* Event wrapper - Display block style only on tablet and above */}
        <div className="projectContainer__categories-desktop">
          <div className="categories-wrapper">
            <h6>Event</h6>
            <TextDivider prime={false} />
            {getFilterList(true, EventCategories, "categories-filter", () => {})}
          </div>
          <div className="categories-wrapper">
            <h6>Type</h6>
            <TextDivider prime={false} />
            {getFilterList(true, EventTypes, "type-filter", () => {})}
          </div>
          <div className="categories-wrapper">
            <h6>Price</h6> 
            <TextDivider prime={false} />
            {getFilterList(true, EventPriceType, "price-filter", () => {})}
          </div>
          <div className="categories-wrapper">
            <h6>Year</h6>
            <TextDivider prime={false} />
            {getFilterList(true, EventYearCollection, "year-filter", () => {})}
          </div>
        </div>
        {/* Categories wrapper - Display accordion style on mobile */}
        <div className="projectContainer__categories-mobile">
          <Accordion className="categories-wrapper" defaultActiveKey={['0']} alwaysOpen>
            {/* EVENT CATEGORIES */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h6 className="m-0">Event</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventCategories, "categories-filter", () => {})}
              </Accordion.Body>
            </Accordion.Item>
            {/* EVENT TYPE */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h6 className="m-0">Type</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventTypes, "type-filter", () => {})}
              </Accordion.Body>
            </Accordion.Item>
            {/* EVENT PRICE */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <h6 className="m-0">Price</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventPriceType, "price-filter", () => {})}
              </Accordion.Body>
            </Accordion.Item>
            {/* EVENT YEAR */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <h6 className="m-0">Year</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventYearCollection, "year-filter", () => {})}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      {/* EVENTS WRAPPER */}
      <div className="projectContainer__events-wrapper">
        <AllEvents events={paginatedEvents}/>
      </div>
    </Container>
  )
}

export default EventContainer;