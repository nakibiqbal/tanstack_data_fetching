"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./API/api";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const getData = async (): Promise<Post[]> => {
    try {
      const res = await fetchData();
      return res && res.status === 200 ? res.data : [];
    } catch (error) {
      console.error("getData error:", error);
      return [];
    }
  };
  const { data } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getData,
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
