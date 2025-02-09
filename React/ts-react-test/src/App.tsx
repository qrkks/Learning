import React, {Suspense, lazy} from "react";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import "./App.css";
const Home = lazy(() => import("./Home"));
const Form1 = lazy(() => import("./Form1"));

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div className="container">
        <nav>
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
          </NavLink>
        </nav>
        <h1>ts react hook form</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/1" element={<Form1 />} />
            <Route path="/2" element={<div>2</div>} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
