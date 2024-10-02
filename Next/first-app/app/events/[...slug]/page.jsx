"use client";
import React from "react";
import {useParams} from "next/navigation";
import {getFilteredEvents} from "@/dummyData";
import EventList from "../EventList";

const FilteredEvent = () => {
  const params = useParams();
  console.log(params.slug);

  if (!params.slug) {
    return <div>No event found</div>;
  }

  const year = +params.slug[0]; // 转换为数字类型
  const month = +params.slug[1]; // 转换为数字类型

  const filteredEvents = getFilteredEvents({ year, month });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <div>No events found for the chosen filter</div>;
  }

  return (
    <div>
        <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEvent;
