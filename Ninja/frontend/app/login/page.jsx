'use client'
import React from "react";

const Login = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget); //表单对象
        const surveyData = Object.fromEntries(formData.entries()); //js对象
        const jsonData = JSON.stringify(surveyData); //json
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonData
        }
        const response = await fetch('api/login', requestOptions)
        // const response = await fetch('http://127.0.0.1:8000/api/token/pair', requestOptions)
        if (response.ok) {
            const rData = await response.json();
            console.log(rData);
        }else{
            console.log(response);
        }
    }
  return (
    <div className="h-[95vh]">
      <div className="max-w-md py-5 mx-auto">
        <h1>Login Here</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" name="username"/>
            <input type="password" placeholder="Password" name="password"/>
            <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
