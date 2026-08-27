"use client";

import { useState, useTransition } from "react";
import { upvotePost } from "@/actions/actions";

interface UpvoteBtnProps {
    postId: number;
    initialVotes: number;
}

export default function UpvoteBtn({ postId, initialVotes }: UpvoteBtnProps) {
    const [votes, setVotes] = useState(initialVotes);
    const [isPending, startTransition] = useTransition();

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={() => {
                setVotes((currentVotes) => currentVotes + 1);
                startTransition(async () => {
                    await upvotePost(postId);
                });
            }}
            className="h-9 shrink-0 rounded-md border border-zinc-300 bg-zinc-100 px-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 disabled:opacity-60"
        >
            Upvote {votes}
        </button>
    );
}
