import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-germany",
});

export const metadata: Metadata = {
  title: "Die Mannschaft | Seleção da Alemanha",
  description: "Experiência cinematográfica 3D imersiva celebrando a força, precisão e legado da seleção alemã de futebol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <link rel="shortcut icon" href="/logo.ico" type="image/x-icon" />
      <body className={`${outfit.variable} antialiased selection:bg-de-red selection:text-de-white`}>
        {children}
      </body>
    </html>
  );
}
