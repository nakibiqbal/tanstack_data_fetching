import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1>All the data</h1>

      <Link href="/posts">Go to Posts</Link>
      <Link href="/postWithPagination">Go to Post with Pagination</Link>
    </div>
  );
}
