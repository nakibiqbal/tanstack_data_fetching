import axios from "axios";
import type { Post } from "./types";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchData = async (): Promise<Post[]> => {
  const res = await api.get("/posts");
  return res.status === 200 ? res.data : [];
};
