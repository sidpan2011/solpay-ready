import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="w-fit">
            <h1 className="text-2xl font-bold relative tracking-tight">SOL <span className="text-violet-400 font-bold absolute top-0">PAY</span> </h1>
        </Link>
    );
}