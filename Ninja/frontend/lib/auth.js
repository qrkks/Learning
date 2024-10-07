import {cookies} from "next/headers";

export function getToken() {
    // login
  const myCookies = cookies();
  return myCookies?.get("auth-token");
}

export function getRefreshToken() {
    // login
  const myCookies = cookies();
  return myCookies?.get("auth-refresh-token");
}

export function removeToken() {
  // logout
  const myCookies = cookies();
  myCookies.delete("auth-token");
}

export function removeRefreshToken() {
  // logout
  const myCookies = cookies();
  myCookies.delete("auth-refresh-token");
}

export function setToken(token) {
  // login
  const myCookies = cookies();
  myCookies.set("auth-token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 天
    path: "/",
  });
}

export function setRefreshToken(token) {
  // login
  const myCookies = cookies();
  myCookies.set("auth-refresh-token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 天
  });
}

