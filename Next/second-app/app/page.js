export default async function HomePage() {
  try {
    // 使用绝对路径调用 API
    const res = await fetch("http://localhost:8000/api/hello");
    const data = await res.json();

    // 返回页面内容
    return (
      <>
        <div>{data.message}</div>
        <div>{data.time}</div>;
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error: {error.message}</div>;
  }
}

// 配置 ISR 的 revalidate，单位是秒
export const revalidate = 100;
