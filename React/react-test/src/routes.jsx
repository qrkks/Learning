import { lazy } from "react";
import { Navigate } from "react-router-dom";

// 使用 React.lazy 进行懒加载
const Home = lazy(() => import("./Home"));
const Blog = lazy(() => import("./Blog"));
const BlogDetail = lazy(() => import("./Blog/Detail"));
const About = lazy(() => import("./about"));
const Form = lazy(() => import("./Form"));
const Form1 = lazy(() => import("./Form/Form1"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Navigate replace to="/" /> }, // 重定向
  { 
    path: "/blog", 
    element: <Blog />, 
    children: [
      { path: ":blogId", element: <BlogDetail /> } // 动态路由
    ] 
  },
  { path: "/about", element: <About /> },
  { path: '/form', element: <Form /> , children: [{ path: 'form1', element: <Form1 /> }] },
];

export default routes;
