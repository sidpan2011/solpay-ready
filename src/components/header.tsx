"use client"
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { IconBrandGithub, IconBrightness } from "@tabler/icons-react";
import Logo from "./logo";

export default function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="max-w-6xl mx-auto flex justify-between items-center p-4 sticky top-0 z-50 bg-background/50 backdrop-blur-lg rounded-b-lg">
            <Logo />
            <div className="flex items-center">
                <Button size={"icon"} variant={"ghost"}><IconBrandGithub width={32} height={32} /></Button>
                <Button size={"icon"} variant={"ghost"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><IconBrightness width={32} height={32} /></Button>
            </div>
        </header>
    );
}