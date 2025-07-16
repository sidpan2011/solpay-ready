import Logo from "./logo";
export default function Footer() {
    return (
        <footer className="flex justify-between items-center p-4 bg-background border-t">
            <div className="max-w-6xl mx-auto">
                <div className=" text-center">
                    {/* <Logo /> */}
                    <p className="text-sm font-medium text-muted-foreground">Built & maintained by <span className="text-violet-400">@sidhanthpande</span></p>
                </div>
            </div>
        </footer>
    );
}