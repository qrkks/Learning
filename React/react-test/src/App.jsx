import "./App.css";
import { NavLink, useRoutes} from "react-router-dom";
import {Suspense} from "react";
import routes from "./routes"; // 引入路由配置

function AppRoutes() {
  return useRoutes(routes); // 让 useRoutes 处理路由
}

function App() {
  return (
    <>
      <nav>
        <NavLink
          to="/"
          style={({isActive}) => ({color: isActive ? "pink" : "black"})}
        >
          首页
        </NavLink>{" "}
        |{" "}
        <NavLink
          to="/blog"
          style={({isActive}) => ({color: isActive ? "pink" : "black"})}
        >
          博客
        </NavLink>{" "}
        |{" "}
        <NavLink
          to="/about"
          style={({isActive}) => ({color: isActive ? "pink" : "black"})}
        >
          关于
        </NavLink>
        |{" "}
        <NavLink
          to="/form"
          style={({isActive}) => ({color: isActive ? "pink" : "black"})}
        >
          表单
        </NavLink>
      </nav>

      {/* 使用 Suspense 处理懒加载 */}
      <Suspense fallback={<div>页面加载中...</div>}>
        <AppRoutes />
      </Suspense>
    </>
  );
}

export default App;
