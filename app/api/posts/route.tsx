import { prisma } from "@/lib/prisma";

export async function GET() {
    const posts = await prisma.post.findMany();

    return Response.json({ posts })
}

export async function POST(request: Request) {
    const { title, content } = await request.json();

    const post = await prisma.post.create({
        data: {
            title,
            content,
            published: true,
            votes: 0,
            author: {
                connect: { email: "alice@example.com" },
            },
        }
    })

    return Response.json({ post })
}