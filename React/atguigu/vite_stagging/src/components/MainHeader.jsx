import React from "react";
import {Navbar, Typography, Button} from "@material-tailwind/react";

function MyNavbar(props) {
  return (
    console.log(props),
    <Navbar
      fullWidth={false}
      className="max-w-screen-xl px-4 py-2 mx-auto lg:px-8 lg:py-4"
    >
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo Section */}
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer text-black py-1.5 font-bold"
        >
          My Website
        </Typography>

        {/* Links Section */}
        <div className="flex space-x-4">

          <Button
          onClick={()=>props.handleModal(true)}
            className="font-bold"
          >
            New Post
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default MyNavbar;
