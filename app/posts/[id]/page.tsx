"use client";

import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../API/types";

import { useParams } from "next/navigation";
import { fetchPostById } from "../../API/api";

export default function Post() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery<Post>({
    queryKey: ["post"],
    queryFn: () => fetchPostById(id as string),
  });

  if (isLoading) return <p>Data is loading...</p>;
  if (isError)
    return <p> Error: {error?.message || "Something went wrong"} </p>;

  return (
    <div>
      This is post number {id}
      <h2>These are the detail about the post</h2>
      <p>{data?.title}</p>
      <p>{data?.body}</p>
    </div>
  );
}
