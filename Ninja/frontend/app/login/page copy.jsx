"use client";
import React from "react";
import {useRouter} from "next/navigation";
import {authStore} from "@/store/authStore";
import {useSearchParams} from "next/navigation";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); //表单对象
    const surveyData = Object.fromEntries(formData.entries()); //js对象
    const jsonData = JSON.stringify(surveyData); //json
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: jsonData,
    };

    const response = await fetch("api/login", requestOptions);

    if (response.ok) {
      const rData = await response.json();
      console.log("rData:", rData);
      localStorage.setItem("token", rData.access);
      localStorage.setItem("refresh", rData.refresh);
      authStore.setIsAuthenticated(true);
      console.log("logged in: ", authStore.isAuthenticated);

      // 登录后重定向到之前保存的路径
      if (redirect) {
        router.push(redirect); // 跳转到原路径
      } else {
        router.push("/"); // 如果没有保存路径，默认跳转到首页
      }
    } else {
      console.log(response);
    }
  };

  return (
    <div className="h-[95vh]">
      <div className="max-w-md py-5 mx-auto">
        <h1>Login Here</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" name="username" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
