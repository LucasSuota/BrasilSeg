import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "@/app/globals.css";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrasilSeg: Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={lexend.className}>{children}</div>
  );
}
