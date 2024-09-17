import React, {Component} from "react";

export default class Header extends Component {
  handleKeyUp = (event) => {
    const {createTodos} = this.props;
    const {keyCode, target} = event;
    if (keyCode !== 13) return;
    const name = target.value;
    createTodos(name);
  };

  render() {
    return (
      <div>
        <input
          onKeyUp={this.handleKeyUp}
          type="text"
          placeholder="请输入你的任务，按回车键确认"
        />
      </div>
    );
  }
}
