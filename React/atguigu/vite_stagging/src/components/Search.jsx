import {Button, Input} from "@material-tailwind/react";
import {useRef} from 'react';
function Search() {
  const keyWordElement = useRef(null)
  const search = (e) => {
    console.log(e)
  }
  return (
    <div className="flex ">
      <Input
        ref={keyWordElement}
        type="text"
        placeholder="输入关键词点击搜索"
      ></Input>
      <Button className="w-full" onClick={search}>
        搜索
      </Button>
    </div>
  );
}

export default Search;
