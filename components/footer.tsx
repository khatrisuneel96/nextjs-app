export default function Footer() {
    return (
        <footer className="flex h-14 items-center border-t border-zinc-300 px-4 text-sm text-zinc-500 sm:px-6">
            {`Copyright © ${new Date().getFullYear()} My Blog. All rights reserved.`}
        </footer>
    );
}