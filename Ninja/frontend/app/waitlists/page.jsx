"use client";

import React from "react";
import useSWR from "swr";
// import { cookies } from "next/headers";

const waitlistApi = "http://localhost:8000/api/waitlists/";
// const waitlistApi = "/api/waitlists";

const Waitlist = () => {
  // console.log(cookies())
  const fetcher = async (url) => {
    
    const res = await fetch(url, {
      method: "GET",
      credentials: "include", // 允许发送包含 Cookies 的请求
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Unauthorized");
    }
    return await res.json();
  };

  const {data, error, isLoading} = useSWR(waitlistApi, fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  return <div>response: {JSON.stringify(data)}</div>;
};

export default Waitlist;
