"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfiniteScroll } from "../API/api";
import { Post } from "../API/types";

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

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor:
              hasNextPage && !isFetchingNextPage ? "pointer" : "not-allowed",
            opacity: hasNextPage && !isFetchingNextPage ? 1 : 0.5,
          }}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No more posts"}
        </button>
      </div>
    </div>
  );
}
