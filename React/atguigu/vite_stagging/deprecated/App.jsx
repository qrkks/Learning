import "./App.css";
import {nanoid} from "nanoid";

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
    // id从哪里来，直接那个字符串能加吗？ 直接加删除后可能会重复，使用nanoid。
    const {todos} = this.state;
    const id = nanoid(); // 这里如何变成001的形式？有个方法，用时再查。
    console.log(id);
    const done = false;
    const newTodos = {id, name, done};
    this.setState({todos: [newTodos, ...todos]});
    // return this.setState({todos:[{id, name, done}, ...todos]}); // 这里我加了return也能工作，是因为setState是异步函数，
    // 如何清除输入框？ 
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

  deleteTodos = (id) => {
    const {todos} = this.state;
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({todos: newTodos});
  };

  checkAllTodos = (done) => {
    const allDoneList = this.state.todos.map((todo) => {
      return {...todo, done: done};
    });
    this.setState({todos: allDoneList});
  };

  deleteAllDone = () => {
    const allUndoneList = this.state.todos.filter((x) => x.done !== true);
    this.setState({todos: allUndoneList});
  };

  render() {
    // const {todos, updateTodos, createTodos} = this.state;
    const {todos} = this.state;
    // const todos = this.state.todos
    return (
      <div>
        <h1>App</h1>
        <Header createTodos={this.createTodos} />
        <List
          todos={todos}
          updateTodos={this.updateTodos}
          deleteTodos={this.deleteTodos}
        />
        <Footer todos={todos} checkAllTodos={this.checkAllTodos} deleteAllDone={this.deleteAllDone}/>
      </div>
    );
  }
}
