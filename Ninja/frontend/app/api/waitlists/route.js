import React from "react";
import {getToken} from "@/app/lib/auth";

export async function GET() {
  const authToken = getToken();
  // console.log('authToken:', authToken);

  if (!authToken) {
    return new Response("Unauthorized", {status: 401});
  }

  const response = await fetch("http://127.0.0.1:8000/api/waitlists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken.value}`,
    },
    credentials: "include",
  });

  console.log(authToken)
  console.log(`Bearer ${authToken}`);

  const data = await response.json();

  return new Response(JSON.stringify({message: "success", ...data}), {
    status: 200,
  });
}
