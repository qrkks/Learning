'use client'
import React from "react";

const Logout = () => {
  async function handleClick() {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    if (response.ok) {
      console.log("logged out");
    }
  }
  return (
    <div>
      <p>Do you want to logout?</p>
      <button onClick={handleClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Logout
      </button>
    </div>
  );
};

export default Logout;
