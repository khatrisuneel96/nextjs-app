import { cookies } from "next/headers";

export default async function RecentlyViewPosts() {
    const cookieStore = await cookies();
    const recentlyViewedPosts = cookieStore.get("recentlyViewedPosts");

    return (
        <div>
            <h2>Recently Viewed Posts</h2>
            <ul>
                {recentlyViewedPosts ? (
                    JSON.parse(recentlyViewedPosts.value).map(
                        (post: { id: number; title: string }) => (
                            <li key={post.id}>{post.title}</li>
                        ),
                    )
                ) : (
                    <p>No recently viewed posts</p>
                )}
            </ul>
        </div>
    );
}