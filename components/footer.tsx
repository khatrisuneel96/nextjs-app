import { cacheLife } from "next/cache";

async function getCurrentYear() {
    "use cache";
    cacheLife("max");
    return new Date().getFullYear();
}

export default async function Footer() {
    const year = await getCurrentYear();

    return (
        <footer className="flex h-14 items-center border-t border-zinc-300 px-4 text-sm text-zinc-500 sm:px-6">
            {`Copyright © ${year} My Blog. All rights reserved.`}
        </footer>
    );
}
