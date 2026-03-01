import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-belgium",
});

export const metadata: Metadata = {
  title: "Seleção da Bélgica | Experiência Visual Oficial",
  description: "Experiência cinematográfica 3D imersiva celebrando a identidade, força e história dos Red Devils belgas.",
  icons: {
    icon: "/belgica.ico",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased selection:bg-belgium-gold selection:text-black`}>
        {children}
      </body>
    </html>
  );
}

