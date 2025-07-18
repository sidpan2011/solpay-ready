import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { OpenPanelComponent } from "@openpanel/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sol Pay Ready",
  description: "Live compatibility index showing which wallets actually work with Solana Pay checkout.",
  openGraph: {
    title: "Sol Pay Ready",
    description: "Live compatibility index showing which wallets actually work with Solana Pay checkout.",
    images: ["/solpay-og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sol Pay Ready",
    description: "Live compatibility index showing which wallets actually work with Solana Pay checkout.",
    images: ["/solpay-og.png"],
  },
  keywords: ["solana", "solpay ready", "solana pay", "solana pay ready", "solana pay compatible", "solana pay compatible wallets", "solana pay compatible wallets list", "solana pay compatible wallets list 2025",]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OpenPanelComponent
          clientId={process.env.OPENPANEL_CLIENT_ID!}
          trackScreenViews={true}
          trackAttributes={true}
          trackOutgoingLinks={true}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
