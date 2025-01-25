import type { Metadata } from "next";
import { Footer } from "@/components/elements/footer";
import { Header } from "@/components/elements/header";
import "@/assets/styles/global.css";
import { AuthProvider } from "@/providers/auth";

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
    <AuthProvider>
      <html lang="en">
        <body className="bg-background text-primary">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
