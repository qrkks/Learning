// app/meals/page.js (Next.js 13 使用 App Router)

import MealCard from "./MealCard";
import React from "react";

// 使用 Server Components 来直接进行数据抓取
export default async function Meals() {
  // 使用 fetch 在服务器端获取数据
  const res = await fetch("http://localhost:8000/meals", { cache: "no-store" });
  const meals = await res.json();

  return (
    <>
      <h1>Meals</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {meals.map((meal) => (
          <MealCard key={meal.id} {...meal} />
        ))}
      </div>
    </>
  );
}
