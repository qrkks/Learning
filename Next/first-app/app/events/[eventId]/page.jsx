"use client";
import React, {Fragment} from "react";
import {useParams} from "next/navigation";
import {getEventById} from "@/dummyData";

const EventDetail = () => {
  const params = useParams();
  console.log(params);
  const event = getEventById(params.eventId);

  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-red-400">EventDetail</h1>
      <div>{event.title}</div>
      <div>{event.location}</div>
      <div>{event.date}</div>
      <div>{event.description}</div>
      <img className="w-1/2" src={event.image} alt={event.title} />
    </div>
  );
};

export default EventDetail;
