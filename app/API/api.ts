import axios from "axios";
import type { Post } from "./types";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchData = async (): Promise<Post[]> => {
  const res = await api.get("/posts?_start=0&_limit=3");
  return res.status === 200 ? res.data : [];
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const fetchPaginationFunction = async (
  pageNumber: number
): Promise<Post[]> => {
  try {
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    return [];
  }
};
