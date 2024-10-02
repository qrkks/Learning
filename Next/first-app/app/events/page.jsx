"use client";
import {getAllEvents} from "@/dummyData";
import React from "react";
import EventList from "./EventList";
import EventSearch from "./EventSearch";
import {useRouter} from "next/navigation";

const AllEvents = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year, month) => {

    router.push(`/events/${year}/${month}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <EventSearch onSearch={findEventsHandler} />
      <div>AllEvents</div>
      <EventList items={events} />
    </div>
  );
};

export default AllEvents;
