import Header from "@/components/header";
import Footer from "@/components/footer";
import Dashboard from "@/components/dashboard";

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="max-w-6xl mx-auto min-h-screen">
        <div className="flex flex-col max-w-2xl mx-auto md:text-center text-left p-4 mt-15">
          {/* <div className="border w-fit md:mx-auto rounded-full px-4 py-2 my-5"> */}
            <p className="text-sm font-semibold my-5 text-violet-400">Introducing Solana Pay Ready</p>
          {/* </div> */}
          <h1 className="md:text-6xl text-5xl font-semibold tracking-tight ">Which wallets work at Solana checkout?</h1>
          <p className="text-lg my-5 text-muted-foreground">
            Sol Pay Ready helps you find which wallets implement Solana Pay well—so your checkout works for users the first time.
          </p>
        </div>
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
