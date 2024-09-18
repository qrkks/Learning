import React, {Component} from "react";
import List from "./components/List";
import Search from "./components/Search";
import TaskList from "./components/taskList";

export default class App extends Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-rose-500">
          Hello, Tailwind CSS!
        </h1>
        <Search />
        <List />
        <TaskList />
      </div>
    );
  }
}
