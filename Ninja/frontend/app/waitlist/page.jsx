"use client";

import React from "react";
import useSWR from "swr";

// const waitlistApi = "http://localhost:8000/api/waitlist/";
const waitlistApi = "/api/waitlist/";

const Waitlist = () => {
  const fetcher = async (url) => {
    // const token = cookies().get("auth-token"); // 或者使用 localStorage.getItem('access_token')

    const res = await fetch(url, {
      method: "GET",
      credentials: "include", // 允许发送包含 Cookies 的请求
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
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
