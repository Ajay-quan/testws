import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  return {
    title: "Kalyan Ram — Data Analyst",
    description: "Kalyan Ram builds end-to-end data analytics, SQL reporting and business intelligence solutions.",
    openGraph: { title: "Kalyan Ram — Data Analyst", description: "Turning complex data into clear business decisions.", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: "Kalyan Ram — Data Analyst", description: "Turning complex data into clear business decisions.", images: [image] },
  };
}

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
