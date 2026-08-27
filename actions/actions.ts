"use server";

import { cacheLife, cacheTag, updateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getPosts() {
    "use cache";
    cacheLife("days");
    cacheTag("posts");

    const posts = await prisma.post.findMany({
        orderBy: {
            id: "asc",
        },
    });
    return posts;
}

export async function getPost(id: string) {
    "use cache";
    cacheLife("days");

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    });
    return post;
}

export async function createPost(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();

    await prisma.post.create({
        data: {
            title,
            content,
            published: true,
            votes: 0,
            author: {
                connect: { email: "alice@example.com" },
            },
        },
    });

    updateTag("posts");
}

export async function upvotePost(id: number) {
    await prisma.post.update({
        where: { id },
        data: {
            votes: { increment: 1 },
        },
    });

    updateTag("posts");
}