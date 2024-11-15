import "./App.css";
import {useState, useEffect} from "react";

function App() {
  // 使用 useState 来管理数据
  const [data, setData] = useState([]); // 初始数据为空数组

  useEffect(() => {
    // 从 API 获取数据并更新状态
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((fetchedData) => {
        console.log(fetchedData); // 打印数据
        setData(fetchedData); // 更新 state
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // 只在组件挂载时请求数据

  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <h2>User List:</h2>
        <ul>
          {/* 渲染 state 中的数据 */}
          {data && data.length > 0 &&
            data.map((user) => (
              <li key={user.id}>
                {user.username} &nbsp;
                {user.password}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
