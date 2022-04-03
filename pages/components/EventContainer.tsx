import React, { useState, useEffect, useRef, MouseEvent, ChangeEvent } from "react";
import { Events, Event, EventCategories, EventTypes } from "../../compilers/type";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedEvents, setPaginatedEvents] = useState<Events>(events);
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentSelectedFilters, setCurrentSelectedFilters] = useState<string[]>([])
  const today = + new Date();
  const SearchField = useRef<HTMLInputElement>(null);
  const NextBtn = useRef<HTMLButtonElement>(null);
  const PrevBtn = useRef<HTMLButtonElement>(null);
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
  
  const handleFilter = (event: MouseEvent<HTMLDivElement>) => {
    const AllCategoriesChoice: HTMLAnchorElement[] = Array.from(document.querySelectorAll(".categories-container__category"));
    let PreFilterArray:any[] = new Array;

    // Handling the active state for the filter button that user has selected
    if(event.currentTarget.className.includes("active")){
      event.currentTarget.classList.remove("active");
    } else {
      AllCategoriesChoice.forEach(category => {
        const CategoryContainerId = category.parentElement?.id;        
        if(CategoryContainerId == event.currentTarget.parentElement?.id){
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
        FilterArray = PreFilterArray.filter((currentFilter: string) => currentFilter !== category.getAttribute("data-filter")?.toString().replace(/_/g, " "))
      }
    })

    // Filtering logic
    setCurrentSelectedFilters(FilterArray);
  }

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchQuery(searchTerm);
  }

  const filterOnSelectedFilter = (filterEvents: Events, selectedFilters: string[]) => {
    return filterEvents.filter((event: Event) => {
      const EventCategory = event.attributes.event_category.data?.attributes.EventCategoryName;
      const EventType = event.attributes.event_type.data?.attributes.EventTypeName;
      const EventPriceType = event.attributes.EventPriceType;
      const EventYear = new Date(event.attributes.EventStartDate).getFullYear().toString();
      // Setting up an array contained all event's filter points
      const EventFilterElement = [EventCategory, EventType, EventPriceType, EventYear].filter(el => el !== undefined);
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

  const sortByUpcoming = () => {
    setPaginatedEvents(
      events.sort((a, b) => {
        return Number(Date.parse(String(b.attributes.EventStartDate))) - Number(Date.parse(String(a.attributes.EventStartDate)))
      })
    ) 
  };

  const sortByPast = () => {
    setPaginatedEvents(
      events.sort((a, b) => {
        return Number(Date.parse(String(a.attributes.EventStartDate))) - Number(Date.parse(String(b.attributes.EventStartDate)))
      })
    )
  };

  const sortByEvent = (isDesktop: boolean) => {
    return (
      <div id="event-sortby" className={`${isDesktop ? "categories-container__desktop" : "categories-container__mobile"}`}>
        <div onClick={() => sortByPast()} className="p2 bold categories-container__category">
          Past Event
        </div>
        <div onClick={() => sortByUpcoming()} className="p2 bold categories-container__category">
          Upcoming Event
        </div>
      </div>
    )
  };

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
      ? NextBtn.current?.setAttribute("disabled", "true")
      : NextBtn.current?.removeAttribute("disabled");

    // 2. Logic for PrevBtn
    currentPage == 1
      ? PrevBtn.current?.setAttribute("disabled", "true")
      : PrevBtn.current?.removeAttribute("disabled");
  }, [paginatedEvents, currentPage]);

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
            {getFilterList(true, EventCategories, "categories-filter", handleFilter)}
          </div>
          <div className="categories-wrapper">
            <h6>Type</h6>
            <TextDivider prime={false} />
            {getFilterList(true, EventTypes, "type-filter", handleFilter)}
          </div>
          <div className="categories-wrapper">
            <h6>Price</h6> 
            <TextDivider prime={false} />
            {getFilterList(true, EventPriceType, "price-filter", handleFilter)}
          </div>
          <div className="categories-wrapper">
            <h6>Year</h6>
            <TextDivider prime={false} />
            {getFilterList(true, EventYearCollection, "year-filter", handleFilter)}
          </div>
          <div className="categories-wrapper">
            <h6>Sort by</h6>
            <TextDivider prime={false} />
            {sortByEvent(true)}
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
                {getFilterList(false, EventCategories, "categories-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
            {/* EVENT TYPE */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h6 className="m-0">Type</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventTypes, "type-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
            {/* EVENT PRICE */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <h6 className="m-0">Price</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventPriceType, "price-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
            {/* EVENT YEAR */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <h6 className="m-0">Year</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, EventYearCollection, "year-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
            {/* SORT BY */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <h6 className="m-0">Sort by</h6>
              </Accordion.Header>
              <Accordion.Body>
                {sortByEvent(false)}
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
          <h2>No results</h2>
        }
        <div className="projectContainer__next-prev-container" id="eventPage">
          <Button
            ref={PrevBtn}
            onClick={previousPage}
            className="prev-btn"
            variant="vic"
          >
            <span className="the-arrow rotate"></span>{" "}
            <span className="btn-text">Previous</span>
          </Button>
          <Button
            ref={NextBtn}
            onClick={nextPage}
            className="next-btn"
            variant="vic"
          >
            <span className="btn-text">Next</span>{" "}
            <span className="the-arrow"></span>
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default EventContainer;