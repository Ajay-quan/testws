import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajay Varada — AI/ML & Software Engineer",
  description: "Ajay Varada builds production AI systems, LLM agent memory, computer vision pipelines, automation, and reliable software.",
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
