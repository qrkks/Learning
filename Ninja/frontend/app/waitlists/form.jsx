import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

function WaitlistForm(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.email) {
      alert("Please provide a valid email address");
      return;
    }

    setIsSubmitting(true);

    fetch("http://127.0.0.1:8000/api/waitlists/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
          setMessage("Please provide a valid email address");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsSubmitting(false);
        setMessage("Thank you for signing up!");
        e.target.reset();
        props.onSubmit();
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        setMessage("Please provide a valid email address");
      });
  };

  return (
    <>
      <form
        className="flex items-center w-full max-w-sm space-x-2"
        onSubmit={handleSubmit}
      >
        <Input type="email" name="email" placeholder="Email" />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}

export default WaitlistForm;
