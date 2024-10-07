"use client";
import useSWR from "swr";
import {authStore} from "@/store/authStore";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {ModeToggle} from "@/components/DarkModeButton";

export default function Home() {
  const router = useRouter();
  // 在组件首次加载时读取 localStorage
  useEffect(() => {
    authStore.loadAuthState();
  }, []); // 空数组确保这个 effect 只在组件首次渲染时执行

  // 使用 SWR 来获取数据
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data, error, isLoading} = useSWR(
    "http://127.0.0.1:8000/api/hello",
    fetcher
  );

  // 错误或加载状态处理
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log("isAuthenticated:", authStore.isAuthenticated);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center row-start-2 gap-8 sm:items-start">
        <div>{authStore.isAuthenticated ? "Hello user" : "Hello guest"}</div>
        <ModeToggle />
        <button
          onClick={() => router.push("/waitlists")}
          className="px-4 py-2 text-white bg-gray-800 rounded"
          // onClick={getData}
        >
          Lookup Data
        </button>
        <div>
          <p>{data.message}</p>
          <p>{JSON.stringify(data)}</p>
        </div>
      </main>
    </div>
  );
}
