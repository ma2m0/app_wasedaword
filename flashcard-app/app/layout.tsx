import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flashcard App",
  description: "Simple flashcard app with CSV data"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
