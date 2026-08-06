import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajay Varada — AI Product Builder",
  description: "A kinetic portfolio exploring AI products, creative technology, and interaction systems.",
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
