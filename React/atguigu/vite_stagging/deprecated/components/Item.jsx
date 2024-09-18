import React, {Component} from "react";

export default class Item extends Component {
  state = {hover: false};
  handleMouse = (flag) => {
    return () => {
      // console.log(flag);
      this.setState({hover: flag}); // this!
    };
  };

  handleCheck = (id) => {
    // this.setState({done:!done}) // 1.不能直接取反吗？ 不要取反直接通过e.target.checked取值 2.能直接修改props吗？
    return (e) => {
      //如果需要e就显式的定义接收的参数，如果不需要也不影响，事件发生会给你的回调函数传递唯一的参数e。
      // const {target} = e
      // console.log(id, e.target.checked,e);
      this.props.updateTodos(id, e.target.checked);
      // console.log(this.props)
    };
  };

  handleDelete = (id) => {
    return () => {
      if (window.confirm("确定删除吗？")) {
        this.props.deleteTodos(id);
      }
    };
  };
  render() {
    const {name, id, done} = this.props;
    return (
      <li
        key={id}
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
        style={{backgroundColor: this.state.hover ? "#ddd" : "white"}}
      >
        <label>
          <input
            type="checkbox"
            checked={done}
            onChange={this.handleCheck(id)}
          />
          <span>{name}</span>
        </label>
        <button
          style={{display: this.state.hover ? "inline-block" : "none"}}
          onClick={this.handleDelete(id)}
        >
          删除
        </button>
      </li>
    );
  }
}
