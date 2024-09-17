import {Component} from "react";
import Item from "./Item";

export default class List extends Component {
  render() {
    // const todos = this.props.todos
    const {todos, updateTodos} = this.props;
    return (
      <ul>
        {todos.map((todo) => {
          return <Item key={todo.id} {...todo} updateTodos={updateTodos} />;
        })}
      </ul>
    );
  }
}
