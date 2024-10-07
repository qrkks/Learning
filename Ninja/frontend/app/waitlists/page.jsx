"use client";
import {useState, useEffect} from "react";
import useSWR from "swr";
import {useRouter, usePathname} from "next/navigation"; // 引入 useRouter
import {authStore} from "@/store/authStore";
import {observer} from "mobx-react-lite";
import WaitlistForm from "./form";
import {TableDemo} from "./table";

const WaitLists = observer(() => {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    authStore.loadAuthState();
    setToken(authStore.token);

    if (!authStore.isAuthenticated) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [router, pathname]);

  // 数据获取函数
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  // 使用 data 来直接渲染
  const {data, error, isLoading, isValidating, mutate} = useSWR(
    token ? "http://127.0.0.1:8000/api/waitlists" : null,
    fetcher,
    {
      onSuccess: (data) => console.log("Data fetched:", data),
    }
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

  const handleFormSubmit = async (newEntry) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/waitlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error("Failed to create new waitlist entry");
      }

      // 后端返回的新记录，包含 id 等其他信息
      const createdEntry = await response.json();

      // 使用 mutate 更新 SWR 缓存，将后端返回的新条目添加到数据中
      mutate([createdEntry, ...(data || [])], false); // false 表示不重新请求数据
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading || isValidating) return <div>Loading...</div>;

  return (
    <>
      <WaitlistForm onSubmit={handleFormSubmit} token={token} />
      <TableDemo data={data || []} />
    </>
  );
});

export default WaitLists;
