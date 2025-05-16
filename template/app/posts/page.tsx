import { getAllPosts } from "@/actions/posts";
import Link from "next/link";

// Page Meta
export async function generateMetadata() {
  return {
    title: `Blog Template Posts`,
    description: `Blog Template Posts`,
    openGraph: {
      type: "article",
      title: `Blog Template Posts`,
      description: `Blog Template Posts`,
      url: `http://localhost:3000/posts`,
    },
    alternates: {
      canonical: `http://localhost:3000/posts`,
    },
  };
}

export default async function Posts() {
  const data = await getAllPosts();

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center font-myfont">
      <h1 className="font-extrabold text-xl">Posts Page</h1>
      <section>
        {data.map((item: any) => (
          <Link key={item.slug} href={`/posts/${item.slug}`}>
            Go to example post
          </Link>
        ))}
      </section>
    </main>
  );
}
