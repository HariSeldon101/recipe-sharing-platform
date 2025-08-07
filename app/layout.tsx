import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecipeShare - Share Your Culinary Creations",
  description: "Discover, create, and share delicious recipes from around the world. Join our community of food lovers and culinary enthusiasts.",
  keywords: ["recipes", "cooking", "food", "culinary", "sharing", "community"],
  authors: [{ name: "RecipeShare Team" }],
  openGraph: {
    title: "RecipeShare - Share Your Culinary Creations",
    description: "Discover, create, and share delicious recipes from around the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
