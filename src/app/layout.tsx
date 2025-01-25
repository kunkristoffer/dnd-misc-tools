import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D&D Tools",
  description: "A collection of D&D campaign tools",
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
