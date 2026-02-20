import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aether - Your Premium Dashboard",
  description: "Ultra-premium personal dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <Toaster theme="dark" position="top-right" />
      </body>
    <script src="/wysiwyg-bridge.js" defer></script>
</html>
  );
}