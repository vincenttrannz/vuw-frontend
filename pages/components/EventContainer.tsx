import React, { useState, useEffect, useRef, MouseEvent, ChangeEvent } from "react";
import { Events, Event, EventCategories, EventTypes } from "../../compilers/type";
import TextDivider from "./views/TextDivider";
import VicButton from './views/VicButton';
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
  // Collection of set state for the components
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedEvents, setPaginatedEvents] = useState<Events>(events);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentSelectedFilters, setCurrentSelectedFilters] = useState<string[]>([]);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const [disablePrevBtn, setDisablePrevBtn] = useState(false);
  // Collection of reference for button, input
  const today = + new Date();
  const SearchField = useRef<HTMLInputElement>(null);
  const EventContainerDiv = useRef<HTMLDivElement>(null);

  const EventYearCollection = Array.from(
    new Set(
      events.map(event => 
        new Date(event.attributes.EventStartDate).getFullYear().toString()  
      )
    )
  );

  const EventCategories = Array.from(
    eventCategories.map(category => category.attributes.EventCategoryName)
  );

  const EventTypes = Array.from(
    eventTypes.map(eventType => eventType.attributes.EventTypeName)
  );

  const EventPriceType = Array.from(
    new Set (events.map(event => event.attributes.EventPriceType))
  );

  const EventTimeStatus = Array.from(
    new Set(events.map(event => 
      (today < Number(Date.parse(String(event.attributes.EventStartDate))))
      ? "Upcoming Event"
      : "Past Event"
    ))
  )
  
  const handleFilter = (event: MouseEvent<HTMLDivElement>) => {
    const AllCategoriesChoice: HTMLAnchorElement[] = Array.from(document.querySelectorAll(".categories-container__category"));
    let PreFilterArray:any[] = new Array;

    // Handling the active state for the filter button that user has selected
    if(event.currentTarget.className.includes("active")){
      event.currentTarget.classList.remove("active");
    } else {
      AllCategoriesChoice.forEach(category => {
        const CategoryContainerId = category.parentElement?.getAttribute("data-parent-filter"); 
        if(CategoryContainerId == "categories-filter"){
          return
        } else if(CategoryContainerId == event.currentTarget.parentElement?.getAttribute("data-parent-filter")){
          category.classList.remove("active");
        }
      })
      event.currentTarget.classList.toggle("active");
    }
    
    AllCategoriesChoice.forEach(category => {
      if(category.className.includes("active")){
        PreFilterArray.push(
          ((category.getAttribute("data-filter") == "Excellence_Award") || (category.getAttribute("data-filter")) == "Industry_Award") ?
          category.getAttribute("data-filter") :
          category.getAttribute("data-filter")?.toString().replace(/_/g, " ")
        )
        FilterArray = Array.from(new Set(PreFilterArray));
      } else {
        FilterArray = PreFilterArray.filter((currentFilter: string) => currentFilter !== category.getAttribute("data-filter")?.toString())
      }
    })
    console.log(FilterArray);
    // Filtering logic
    setCurrentSelectedFilters(FilterArray);
  }

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchQuery(searchTerm);
  }

  const filterOnSelectedFilter = (filterEvents: Events, selectedFilters: string[]) => {
    return filterEvents.filter((event: Event) => {
      const EventCategories = event.attributes.event_categories.data.map(category => category.attributes.EventCategoryName);
      const EventType = event.attributes.event_type.data?.attributes.EventTypeName;
      const EventPriceType = event.attributes.EventPriceType;
      const EventYear = new Date(event.attributes.EventStartDate).getFullYear().toString();
      const EventStatus = (today < Number(Date.parse(String(event.attributes.EventStartDate)))) ? "Upcoming Event" : "Past Event";
      // Setting up an array contained all event's filter points
      const EventFilterElement = [EventType, EventPriceType, EventYear, EventStatus].concat(EventCategories).filter(el => el !== undefined);
      console.log(EventFilterElement);
      
      if(selectedFilters.every(el => EventFilterElement.includes(el))) {
        return event;
      }
    })
  }

  const filterOnTextQuery = (events: Events, searchTerm: string): Events => {
    return events.filter((event: Event) => {
      const EventTitle = String(event.attributes.EventName).toLowerCase();
      const EventShortDescription = String(event.attributes.EventShortDescription).toLowerCase();
      const EventLocation = String(event.attributes.EventLocation).toLowerCase();

      // IF found any event that contained the search term
      if(
        events !== undefined &&
        EventTitle.includes(searchTerm) ||
        EventShortDescription.includes(searchTerm) ||
        EventLocation.includes(searchTerm)
      ){
        return event;
      }
      // IF the search term start by default blank or user backspace all search, return everything
      if(searchTerm == ""){
        return event;
      }
    })
  }

  const scrollToRef = (ref: any) =>
  window.scrollTo(0, ref.current?.offsetTop - 75);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    scrollToRef(EventContainerDiv);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    scrollToRef(EventContainerDiv);
  };

  // Logic for paginated events
  useEffect(() => {
    if (events && events.length) {
      switch (currentPage) {
        case 1:
          setPaginatedEvents(events.slice(0, 6));
          break;
        case 2:
          setPaginatedEvents(events.slice(6, 12));
          break;
        default:
          setPaginatedEvents(
            events.slice(currentPage * 6, currentPage * 6 + 6)
          );
          break;
      }
    }
  }, [currentPage, events]);

  // This effect to check after Set new projects length
  useEffect(() => {
    // 1. Logic for NextBtn
    paginatedEvents.length < 6
      ? setDisableNextBtn(true)
      : setDisableNextBtn(false);

    // 2. Logic for PrevBtn
    currentPage == 1
      ? setDisablePrevBtn(true)
      : setDisablePrevBtn(false);
  }, [paginatedEvents, currentPage, disableNextBtn, disablePrevBtn]);

  // Stacking the Filtering and Search with UseEffect hook
  useEffect(() => {
    let preFilteredEvents: Events = events;
    preFilteredEvents = filterOnSelectedFilter(preFilteredEvents, currentSelectedFilters);
    preFilteredEvents = filterOnTextQuery(preFilteredEvents, searchQuery);
    setPaginatedEvents(preFilteredEvents.slice(0, 6));
  }, [searchQuery, currentSelectedFilters])
  
  return (
    <Container ref={EventContainerDiv} className="projectContainer">
      {/* EVENT DETAILS WRAPPER */}
      <div className="projectContainer__details-wrapper">
        <div className="bg-white rounded">
          <InputGroup>
            <FormControl
              ref={SearchField}
              placeholder="Search"
              aria-label="search"
              aria-describedby="search-field"
              className="border-0 bg-white py-0"
              onChange={handleSearch}
            />
            <div className="input-group-append">
              <div className="btn btn-link text-primary pe-none">
                <SearchLogo/>
              </div>
            </div>
          </InputGroup>
        </div>
        {/* Event wrapper - Display block style only on tablet and above */}
        <div className="projectContainer__categories-desktop">
          <div className="categories-wrapper">
            <p className="h6">Event</p>
            <TextDivider prime={false} />
            {getFilterList(true, EventCategories, "categories-filter", handleFilter)}
          </div>
          <div className="categories-wrapper">
            <p className="h6">Type</p>
            <TextDivider prime={false} />
            {getFilterList(true, EventTypes, "type-filter", handleFilter)}
          </div>
          <div className="categories-wrapper">
            <p className="h6">Price</p> 
            <TextDivider prime={false} />
            {getFilterList(true, EventPriceType, "price-filter", handleFilter)}
          </div>
          <div className="categories-wrapper">
            <p className="h6">Year</p>
            <TextDivider prime={false} />
            {getFilterList(true, EventYearCollection, "year-filter", handleFilter)}
          </div>
          <div className="categories-wrapper">
            <p className="h6">Event status</p>
            <TextDivider prime={false} />
            {getFilterList(true, EventTimeStatus, "event-status-filter", handleFilter)}
          </div>
        </div>
        {/* Categories wrapper - Display accordion style on mobile */}
        <div className="projectContainer__categories-mobile">
          <Accordion className="categories-wrapper" defaultActiveKey={['0']} alwaysOpen>
            {/* EVENT CATEGORIES */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <p className="h6 m-0">Event</p>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventCategories, "categories-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
            {/* EVENT TYPE */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <p className="h6 m-0">Type</p>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventTypes, "type-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
            {/* EVENT PRICE */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <p className="h6 m-0">Price</p>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventPriceType, "price-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
            {/* EVENT YEAR */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <p className="h6 m-0">Year</p>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventYearCollection, "year-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
            {/* EVENT STATUS */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <p className="h6 m-0">Event status</p>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventTimeStatus, "event-status-filter-mobile", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      {/* EVENTS WRAPPER */}
      <div className="projectContainer__events-wrapper">
        {
          (paginatedEvents.length > 0)
          ?
          <AllEvents events={paginatedEvents}/>
          :
          <h2 className="no-result">No results</h2>
        }
        <div className="projectContainer__next-prev-container" id="eventPage">
          <VicButton
            ClickFunc={previousPage}
            variant="vic"
            btnType="prev"
            btnText="Previous"
            className="prev-btn"
            disable={disablePrevBtn}
          />
          <VicButton
            ClickFunc={nextPage}
            variant="vic"
            btnType="next"
            btnText="Next"
            className="next-btn"
            disable={disableNextBtn}
          />
        </div>
      </div>
    </Container>
  )
}

export default EventContainer;