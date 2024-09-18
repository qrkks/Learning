import React, {Component} from "react";

export default class Search extends Component {
  search = () => {
    console.log(this.keyWordElement.value);
  };
  render() {
    return (
      <div>
        <input
          ref={(c) => (this.keyWordElement = c)}
          type="text"
          name=""
          id=""
          placeholder="输入关键词点击搜索"
        />
        <button onClick={this.search}>搜索</button>
      </div>
    );
  }
}
