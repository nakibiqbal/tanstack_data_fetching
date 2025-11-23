"use client";

import { useQuery } from "@tanstack/react-query";
import type { Post } from "../API/types";
import { fetchData } from "../API/api";
import Link from "next/link";

export default function Posts() {
  const { data, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchData,
  });

  if (isLoading) return <p>Data is loading...</p>;
  if (isError)
    return <p> Error: {error?.message || "Something went wrong"} </p>;

  return (
    <div>
      All the data
      {data?.map((item) => (
        <Link key={item.id} href={`/posts/${item.id}`}>
          <div>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
