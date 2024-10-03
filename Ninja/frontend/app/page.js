"use client";
import useSWR from "swr";

export default function Home() {
  // const [data, setData] = useState({});
  // async function getData() {
  //   const response = await fetch("http://127.0.0.1:8000/api/hello");
  //   const data = await response.json();
  //   console.log(data);
  //   setData(data);
  // }
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data, error, isLoading} = useSWR("http://127.0.0.1:8000/api/hello", fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center row-start-2 gap-8 sm:items-start">
        <button
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
