import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Caveat } from "next/font/google";

// Main UI font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Handwritten accents
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
});

export const metadata = {
  title: "DC Trades | Master the Markets",
  description:
    "A disciplined trading platform built for clarity, consistency, and long-term performance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${inter.variable} ${caveat.variable} font-sans antialiased min-h-screen`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
