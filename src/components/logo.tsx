import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="w-fit flex gap-2">
            <Image src={"/logo.png"} alt="Sol Pay Ready" width={100} height={100} className="w-8 h-8" />
            <h1 className="text-2xl font-bold relative tracking-tight">SOL <span className="text-violet-400 font-bold absolute top-0">PAY.</span> </h1>
        </Link>
    );
}