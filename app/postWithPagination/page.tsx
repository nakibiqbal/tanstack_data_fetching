"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { Post } from "../API/types";
import Link from "next/link";
import { useState } from "react";
import { deletePost, fetchPaginationFunction, updatePost } from "../API/api";

export default function PostsWithPagination() {
  const [pageNumber, setPageNumber] = useState(0);

  const { data, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPaginationFunction(pageNumber),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id as number),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (currElem: Post[]) => {
        return currElem?.filter((post) => post.id !== id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id: number) => updatePost(id as number),
    onSuccess: (apiData, postId) => {
      queryClient.setQueryData(["posts", pageNumber], (postsData: Post[]) => {
        return postsData?.map((post) =>
          post.id === postId ? { ...post, title: apiData.title } : post
        );
      });
    },
  });

  if (isLoading) return <p>Data is loading...</p>;
  if (isError)
    return <p> Error: {error?.message || "Something went wrong"} </p>;

  return (
    <div>
      All the data
      {data?.map((item) => (
        <>
          <Link key={item.id} href={`/posts/${item.id}`}>
            <div>
              <h1>This is post number {item.id}</h1>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </Link>
          <button onClick={() => deleteMutation.mutate(item.id as number)}>
            Delete
          </button>
          <button onClick={() => updateMutation.mutate(item.id as number)}>
            Update
          </button>
        </>
      ))}
      <div className="paginationSegment flex gap-[2rem] w-full ">
        <button
          onClick={() => setPageNumber((prev) => prev - 3)}
          disabled={pageNumber === 0 ? true : false}
        >
          Prev
        </button>
        <p>{pageNumber / 3 + 1}</p>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
}
