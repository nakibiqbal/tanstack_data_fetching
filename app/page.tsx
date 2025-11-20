"use client";

import { useQuery } from "@tanstack/react-query";
import type { Post } from "./API/types";
import { fetchData } from "./API/api";

export default function Home() {
  const { data } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchData,
  });

  return (
    <div>
      All the data
      {data?.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
