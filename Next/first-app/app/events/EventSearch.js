"use client";
import React from "react";
import {useRef} from "react";

const EventSearch = (props) => {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = e.target.month.value;

    // console.log(selectedYear, selectedMonth,yearInputRef,e.target)

    props.onSearch(selectedYear, selectedMonth);
  };
  return (
    <form
      className="flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-md shadow-md md:flex-row"
      onSubmit={submitHandler}
    >
      {/* Year selection */}
      <div className="flex items-center gap-5">
        <label
          htmlFor="year"
          className="mb-1 text-sm font-semibold text-gray-700"
        >
          Year
        </label>
        <select
          name="year"
          id="year"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={yearInputRef}
        >
          <option value="2021">2021年</option>
          <option value="2022">2022年</option>
        </select>
      </div>

      {/* Month selection */}
      <div className="flex items-center gap-5">
        <label
          htmlFor="month"
          className="mb-1 text-sm font-semibold text-gray-700"
        >
          Month
        </label>
        <select
          name="month"
          id="month"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={monthInputRef}
        >
          <option value="4">4月</option>
          <option value="5">5月</option>
        </select>
      </div>

      {/* Search button */}
      <button className="px-6 py-2 mt-4 text-white transition duration-300 bg-blue-500 rounded-md shadow md:mt-0 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Search
      </button>
    </form>
  );
};

export default EventSearch;
