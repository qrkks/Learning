import {Button} from "@material-tailwind/react";
import countStore from "./mobxStore";
import {observer} from "mobx-react-lite";

// 使用箭头函数定义组件
const Mobx = observer(() => {
  return (
    <div className="flex justify-center mt-5">
      <Button onClick={() => countStore.increment()}>{countStore.count}</Button>
    </div>
  );
});

// 使用 observer 包裹组件并导出
export default Mobx;

