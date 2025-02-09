import {Outlet, useNavigate} from "react-router-dom";

function Blog() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>博客首页</h1>
      <Outlet />
      <button onClick={() => navigate("/blog/1")}>进入博客1</button>
    </div>
  );
}

export default Blog;
