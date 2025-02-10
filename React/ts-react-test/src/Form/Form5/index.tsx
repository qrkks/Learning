import { useEffect, useRef } from "react";

export default function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null); // ✅ 这里明确指定类型
  console.log(inputRef.current); 
  const focusInput = () => {
    inputRef.current?.focus(); 
  };
  useEffect(() => {
    console.log(inputRef.current);
  }, [inputRef.current?.value]);
  
  return (
    <div>
      <input ref={inputRef} placeholder="输入点什么..." />
      <button onClick={focusInput}>聚焦输入框</button>
    </div>
  );
}
