import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIND-me",
  description: "Download Android games made with care.",
  verification: {
  google: "4IIyFoeWyvdUvIYlnOXp9PWOABQYfmF3yVW-I_8BuCQ",
},
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}