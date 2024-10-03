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
  })

  if (!response.ok) {
    return new Response(JSON.stringify({message: "error"}), {
      status: 401,
    });
  }

  const data = await response.json();
  console.log(data);
  
  // 使用 cookies().set 设置 Cookie
  cookies().set("token", "abc", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 天
  });
  
  return new Response(
    JSON.stringify({message: "success", cookies: cookies().getAll()}),
    {
      status: 200,
    }
  );
}
