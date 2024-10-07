"use client";
import React from "react";
import useSWR from "swr";

const Me = () => {
  // 使用 useSWR hook
  const {data, error, isLoading} = useSWR(
    "http://127.0.0.1:8000/api/me",
    (url) =>
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json())
  );

  // 处理加载或错误状态
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  // 动态遍历 JSON 对象的键值对
  // if (data && typeof data === "object") {
  //   return (
  //     <div>
  //       <h1>User Info</h1>
  //       <ul>
  //         {Object.entries(data).map(([key, value]) => (
  //           <li key={key} className="p-3">
  //             <strong>{key}:</strong> {value}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }

  // return <div>No data available</div>;
  return <div>{JSON.stringify(data)}</div>;
};

export default Me;
