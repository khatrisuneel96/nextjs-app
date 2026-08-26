import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Post {
    id: number;
    title: string;
}

export default async function PostsPage() {
    const posts = await prisma.post.findMany();

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h1 className="text-center text-4xl font-semibold text-zinc-950 sm:text-5xl">
                    Posts
                </h1>

                <ul className="space-y-3">
                    {posts.slice(0, 5).map((post: Post) => (
                        <li key={post.id}>
                            <div className="flex items-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="text-lg font-semibold text-zinc-950 hover:text-zinc-700"
                                >
                                    {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}