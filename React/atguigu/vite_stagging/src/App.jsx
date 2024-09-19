import React, {Component} from "react";
import PostsList from "./components/PostsList";

export default class App extends Component {
  render() {
    return (
      <div className="bg-gray-100" >
        <PostsList/>
      </div>
    );
  }
}
