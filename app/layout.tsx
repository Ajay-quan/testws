import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajay Varada — AI/ML & Software Engineer",
  description: "Former Micron software engineer building agent memory, hybrid retrieval systems, computer vision, and production ML software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
