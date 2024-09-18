import React, {Component} from "react";

export default class Footer extends Component {
  handleCheckAll = (e) => {
    this.props.checkAllTodos(e.target.checked);
  };

  handleClearAllDone = () => {
    this.props.deleteAllDone()
  }

  render() {
    const {todos} = this.props;
    const allTodos = todos.length;
    const allDone = ((arr) => {
      return arr.filter((obj) => obj.done === true);
    })(todos).length;

    console.log(todos, allDone);
    return (
      <div>
        <input
          type="checkbox"
          checked={allDone === allTodos && allTodos !== 0}
          onChange={this.handleCheckAll}
        />
        <span>
          已完成 {allDone} /全部 {allTodos}
        </span>
        <button onClick={this.handleClearAllDone}>清除所有已完成</button>
      </div>
    );
  }
}
