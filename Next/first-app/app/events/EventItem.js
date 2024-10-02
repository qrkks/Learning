import Button from "@/ui/Button";
import React from "react";
import Image from "next/image";

const EventItem = (props) => {
  return (
    <li  className="flex flex-col items-center my-4 overflow-hidden bg-white rounded-lg shadow-md md:flex-row">
      {/* 调整图片的宽度 */}
      <Image src={props.image} alt={props.title} width={400} height={300} priority={props.index<3}  className="object-cover w-full h-64 md:w-1/2" />
      <div className="w-full p-4 md:w-1/2">
        <div className="mb-4">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">{props.title}</h2>
          <div className="mb-2 text-sm text-gray-600">
            <time>{props.date}</time>
          </div>
          <div className="text-gray-600">
            <address>{props.location}</address>
          </div>
        </div>
        <div>
          {/* <Link href={`/events/${props.id}`} className="inline-block px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600">
            Explore Event
          </Link> */}
          <Button link={`/events/${props.id}`}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
