import { getPost } from "@/actions/actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ParamsProps {
    params: Promise<{ id: string }>;
}

async function PostContent({ params }: ParamsProps) {
    const { id } = await params;

    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <article className="space-y-6">
            <div className="space-y-4">
                <h1 className="text-center text-4xl font-semibold text-zinc-950 sm:text-5xl">
                    {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                </h1>
                <p className="text-lg leading-8 text-zinc-700">{post.content}</p>
            </div>
        </article>
    );
}

export default function PostPage({ params }: ParamsProps) {
    return (
        <Suspense fallback={<p className="text-center text-zinc-500">Loading post...</p>}>
            <PostContent params={params} />
        </Suspense>
    );
}
