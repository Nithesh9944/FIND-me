import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIND-me",
  description: "Download Android games made with care.",
  verification: {
    google: "VjsGz06pBR7aorFGEZkMM6nmvCPJUQ3G25ot9MJ99w0",
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