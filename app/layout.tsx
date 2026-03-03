import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-denmark",
});

export const metadata: Metadata = {
  title: "Seleção da Dinamarca | Danish Dynamite",
  description: "Experiência cinematográfica 3D imersiva celebrando a identidade, força e história da seleção dinamarquesa.",
  icons: {
    icon: "/dinamarca.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <link rel="shortcut icon" href="/dinamarca.png" type="image/x-icon" />
      <body className={`${outfit.variable} antialiased selection:bg-dk-frost selection:text-dk-navy`}>
        {children}
      </body>
    </html>
  );
}
