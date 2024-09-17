import "./App.css";

import React, {Component} from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import List from "./components/List";

export default class App extends Component {
  state = {
    todos: [
      {id: "001", name: "吃饭", done: true},
      {id: "002", name: "吃屎", done: true},
      {id: "003", name: "打豆豆", done: false},
    ],
    // createTodos:this.createTodos,
    // updateTodos:this.updateTodos
  };
  createTodos = (name) => {
    // id从哪里来，直接那个字符串能加吗？
    const {todos} = this.state;
    const id = todos.length + 1; // 这里如何变成001的形式？
    const done = false;
    return this.setState({todos:[{id, name, done}, ...todos]});
  };

  updateTodos = (id, done) => {
    const {todos} = this.state;
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {...todo, done: done};
      } else {
        return todo;
      }
    });
    this.setState({todos: newTodos});
  };
  render() {
    const {todos, updateTodos, createTodos} = this.state;
    // const todos = this.state.todos
    return (
      <div>
        <h1>App</h1>
        <Header createTodos={createTodos} />
        <List todos={todos} updateTodos={updateTodos} />
        <Footer />
      </div>
    );
  }
}
