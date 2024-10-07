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
  const [waitlistData, setWaitlistData] = useState([]);
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

  // 引入 fallbackData 和 isValidating 优化
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    token ? "http://127.0.0.1:8000/api/waitlists" : null,
    fetcher,
    {
      onSuccess: (data) => setWaitlistData(data),
      fallbackData: waitlistData, // 这里使用缓存数据
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

  const handleFormSubmit = (newEntry) => {
    setWaitlistData((prevData) => [newEntry, ...prevData]);
    mutate(); // mutate 用来触发重新获取数据
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading || isValidating) return <div>Loading...</div>;

  return (
    <>
      <WaitlistForm onSubmit={handleFormSubmit} />
      <TableDemo data={data || waitlistData} />
    </>
  );
});



export default WaitLists;
