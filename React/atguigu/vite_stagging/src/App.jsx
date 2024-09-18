import React, {Component} from "react";
import List from "./components/List";
import Search from "./components/Search";
import TaskList from "./components/taskList";
import Footer from './components/Footer';
import { Button } from "@material-tailwind/react";

export default class App extends Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-rose-500">
          Hello, Tailwind CSS!
        </h1>
        <Button className="text-lg bg-teal-400 hover:bg-red-300">噢，这样就好了</Button>
        <Search />
        <List />
        <TaskList />
        <Footer/>
      </div>
    );
  }
}
