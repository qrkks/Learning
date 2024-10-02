import React from "react";
import EventItem from "./EventItem";

const EventsList = (props) => {
  const {items} = props;
  return (
    <ul>
      {items.map((event, index) => (
        <EventItem {...event} index={index} key={event.id} />
      ))}
    </ul>
  );
};

export default EventsList;
