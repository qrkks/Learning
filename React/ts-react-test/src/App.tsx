import React, {Suspense, lazy} from "react";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import "./App.css";
const Home = lazy(() => import("./Home"));
const Form1 = lazy(() => import("./Form/Form1"));
const Form2 = lazy(() => import("./Form/Form2"));
// import Form2 from "./Form/Form2";
const Form3 = lazy(() => import("./Form/Form3"));
const Form4 = lazy(() => import("./Form/Form4"));

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div className="container ">
        <nav className="mb-3">
          <NavLink
            to="/"
            style={({isActive}) => ({color: isActive ? "pink" : "black"})}
          >
            Home
          </NavLink>{" "}
          |{" "}
          <NavLink
            to="/1"
            style={({isActive}) => ({color: isActive ? "pink" : "black"})}
          >
            1
          </NavLink>{" "}
          |{" "}
          <NavLink
            to="/2"
            style={({isActive}) => ({color: isActive ? "pink" : "black"})}
          >
            2
          </NavLink> |{" "}
          <NavLink
            to="/3"
            style={({isActive}) => ({color: isActive ? "pink" : "black"})}
          >
            3
          </NavLink> |{" "}
          <NavLink
            to="/4"
            style={({isActive}) => ({color: isActive ? "pink" : "black"})}
          >
            4
          </NavLink>
        </nav>
        <h1>{'ts react hook form'.toUpperCase()}</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/1" element={<Form1 />} />
            <Route path="/2" element={<Form2 />} />
            <Route path="/3" element={<Form3 />} />
            <Route path="/4" element={<Form4 />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
