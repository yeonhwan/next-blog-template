import { getAllPosts, getPost } from "@/actions/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

type PostProps = {
  params: Promise<{ slug: string }>;
};

// Page Meta
export async function generateMetadata({ params }: PostProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return {
    title: `Blog template post`,
    description: `Blog template post`,
    openGraph: {
      type: "article",
      title: `Blog template post`,
      description: `Blog template post`,
      url: `http://localhost:3000/posts/post`,
    },
  };
}

// SSG
export async function generateStaticParams() {
  return await getAllPosts();
}

export default async function Post({ params }: PostProps) {
  const { slug } = await params;
  // slug decode for non-english slug
  const decodedSlug = decodeURIComponent(slug);
  const data = await getPost(decodedSlug);
  if (!data) notFound();

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center font-myfont">
      <h1 className="font-extrabold text-xl">Post page</h1>
      <p>Current slug is {slug}</p>
      <MarkdownRenderer source={data.source} />
      <section>
        <Link href="/posts"> Go to Posts</Link>
      </section>
    </main>
  );
}
