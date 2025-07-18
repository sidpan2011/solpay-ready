"use client"
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { IconBrandDiscord, IconBrandGithub, IconBrightness } from "@tabler/icons-react";
import Logo from "./logo";
import Link from "next/link";

export default function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="max-w-6xl mx-auto flex justify-between items-center p-4 sticky top-0 z-50 bg-background">
            <Logo />
            <div className="flex items-center">
                <Button asChild size={"icon"} variant={"ghost"}><Link href={"https://github.com/sidpan2011/solpay-ready"} target="_blank"><IconBrandGithub width={32} height={32} /></Link></Button>
                <Button asChild size={"icon"} variant={"ghost"}><Link href={"https://discord.gg/G6p645rZzD"} target="_blank"><IconBrandDiscord width={32} height={32} /></Link></Button>
                <Button size={"icon"} variant={"ghost"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><IconBrightness width={32} height={32} /></Button>
            </div>
        </header>
    );
}