import type { Metadata } from "next";
import "./globals.css";
import Modal from "@/components/AddTask/Modal";

export const metadata: Metadata = {
  title: "Plan Deck",
  description: "Generated by Hussain Rizvi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Modal />
      <body className="bg-[#d6e1f6]">{children}</body>
    </html>
  );
}
