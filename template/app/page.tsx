import Link from "next/link";

export default async function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center font-myfont">
      <h1 className="font-extrabold text-xl">Blog Template Home</h1>
      <section>
        <Link href="/posts"> Go to Posts</Link>
      </section>
    </main>
  );
}
