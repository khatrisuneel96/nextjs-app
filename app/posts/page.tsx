import Link from "next/link";
import RecentlyViewPosts from "../../components/recently-view-posts";
import { Suspense } from "react";
import { createPost, getPosts } from "@/actions/actions";
import UpvoteBtn from "@/components/upvote-btn";

interface Post {
    id: number;
    title: string;
    votes: number;
}

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h1 className="text-center text-4xl font-semibold text-zinc-950 sm:text-5xl">
                    Posts
                </h1>

                <ul className="space-y-3">
                    {posts.map((post: Post) => (
                        <li key={post.id}>
                            <div className="flex items-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="text-lg font-semibold text-zinc-950 hover:text-zinc-700"
                                >
                                    {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                                </Link>
                                <UpvoteBtn postId={post.id} initialVotes={post.votes} />
                            </div>
                        </li>
                    ))}
                </ul>

                <Suspense fallback={<p>Loading recently viewed posts...</p>}>
                    <RecentlyViewPosts />
                </Suspense>
            </section>

            <section className="space-y-4 border-t border-zinc-200 pt-6">
                <h2 className="text-lg font-semibold text-zinc-950">New Post</h2>
                <form action={createPost} className="space-y-4">
                    <label className="block space-y-2">
                        <span className="text-sm font-medium text-zinc-700">Title</span>
                        <input
                            name="title"
                            type="text"
                            className="h-10 w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 text-zinc-950 text-sm focus:outline-none focus:ring-2"
                            placeholder="Enter the title of your post"
                        />
                    </label>
                    <label className="block space-y-2">
                        <span className="text-sm font-medium text-zinc-700">Content</span>
                        <textarea
                            name="content"
                            rows={4}
                            className="h-20 w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-950 text-sm focus:outline-none focus:ring-2"
                            placeholder="Enter the content of your post"
                        ></textarea>
                    </label>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                    >
                        Create Post
                    </button>
                </form>
            </section>

        </div>
    );
}