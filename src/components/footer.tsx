import Link from "next/link";
import Logo from "./logo";
export default function Footer() {
    return (
        <footer className="flex justify-between items-center p-4 bg-background border-t">
            <div className="max-w-6xl mx-auto">
                <div className=" text-center">
                    {/* <Logo /> */}
                    <p className="text-sm font-medium text-muted-foreground">Built & maintained by  <Link href="https://x.com/sidhanthpande" target="_blank" className="text-violet-400 hover:underline">@sidhanthpande</Link></p>
                </div>
            </div>
        </footer>
    );
}