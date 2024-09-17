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
      // const {target} = e
      console.log(id,e.target.checked)
     }
  }
  render() {
    const {name, id, done} = this.props;
    return (
      <li
        id={id}
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
        style={{backgroundColor: this.state.hover ? "#ddd" : "white"}}
      >
        <label>
          <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
          <span>{name}</span>
        </label>
        <button style={{display: this.state.hover ? "inline-block" : "none"}}>
          删除
        </button>
      </li>
    );
  }
}
