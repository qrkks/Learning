import {setRefreshToken, setToken} from "@/app/lib/auth";
import {cookies} from "next/headers";

export async function POST(request) {
  const {username, password} = await request.json();

  const response = await fetch("http://127.0.0.1:8000/api/token/pair", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({message: "error"}), {
      status: 401,
    });
  }

  const data = await response.json();
  console.log(data);
  const {access, refresh} = data;
  setToken(access);
  setRefreshToken(refresh);
  
  return new Response(
    JSON.stringify({message: "success", cookies: cookies().getAll()}),
    {
      status: 200,
    }
  );
}
