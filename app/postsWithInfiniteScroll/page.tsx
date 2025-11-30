"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfiniteScroll } from "../API/api";
import { Post } from "../API/types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function PostsWithInfiniteScroll() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<Post[]>({
      queryKey: ["posts"],
      queryFn: ({ pageParam }) =>
        fetchInfiniteScroll({ pageParam: pageParam as number }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 0 ? undefined : allPages.length * 10;
      },
    });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") return <p>Loading...</p>;

  if (status === "error") return <p>Error fetching data</p>;

  return (
    <div>
      <h1>Posts with infinite scroll</h1>

      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((item) => (
            <div key={item.id}>
              <h1>This is post number {item.id}</h1>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      ))}

      <div ref={ref}>
        {isFetchingNextPage ? (
          <p>Loading more...</p>
        ) : hasNextPage ? (
          <p>Load more</p>
        ) : (
          <p>No more data</p>
        )}
      </div>
    </div>
  );
}
