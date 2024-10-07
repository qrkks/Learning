"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter, usePathname } from "next/navigation"; // 引入 useRouter
import { authStore } from "@/store/authStore";
import { observer } from "mobx-react-lite";
import WaitlistForm from "./form";
import { TableDemo } from "./table";

const WaitLists = observer(() => {
  const [token, setToken] = useState(null);
  const [waitlistData, setWaitlistData] = useState([]); // 用于存储等待列表数据
  const router = useRouter(); // 使用 useRouter 进行重定向
  const pathname = usePathname();

  useEffect(() => {
    authStore.loadAuthState(); // 加载认证状态
    // const storedToken = localStorage.getItem("token");
    setToken(authStore.token);

    // 如果没有登录状态，则跳转到登录页面
    if (!authStore.isAuthenticated  ) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [router, pathname]);

  // 定义数据获取函数
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  // 即使 token 不存在，也需要在组件最外层调用 useSWR
  const { data, error, isLoading, mutate } = useSWR(
    token ? "http://127.0.0.1:8000/api/waitlists" : null,
    fetcher,
    { onSuccess: (data) => setWaitlistData(data) } // 初始加载时设置数据
  );

  useEffect(() => {
    if (error) {
      if (error?.status === 401) {
        router.push("/login?redirect=/waitlists");
      } else {
        console.error("An unexpected error occurred", error);
      }
    }
  }, [error, router]);

  // 表单提交后更新状态
  const handleFormSubmit = (newEntry) => {
    // 添加新条目到本地 waitlistData
    setWaitlistData((prevData) => [newEntry, ...prevData]);
    // 也可以选择同时调用 mutate() 来强制重新验证和更新数据
    mutate();
  };

  // 错误处理
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  // 数据渲染
  return (
    <>
      {/* WaitlistForm 接收 handleFormSubmit 作为 prop */}
      <WaitlistForm onSubmit={handleFormSubmit} />
      <TableDemo data={waitlistData} />
      {/* <div>{JSON.stringify(waitlistData)}</div> */}
    </>
  );
});

export default WaitLists;
