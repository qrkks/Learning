"use client";
import {useState} from "react";
import { Button } from "@material-tailwind/react";

export default function HomePage() {
  const [list, setList] = useState([]);
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const item = formData.get("item");
    setList([item, ...list]);
    e.target.reset();
    e.target[0].focus();
  }
  return (
    <div>
      <h1 className="text-red-500">Hello world</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter item" name="item" />
        <Button color="primary" type="submit">Submit</Button>
      </form>
      <ul>
        {list.map((item,idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
