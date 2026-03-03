import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-france",
});

export const metadata: Metadata = {
  title: "Seleção da França | Les Bleus",
  description: "Experiência cinematográfica 3D imersiva celebrando a identidade, força e história da seleção francesa.",
  icons: {
    icon: "/franca.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <link rel="shortcut icon" href="/franca.png" type="image/x-icon" />
      <body className={`${outfit.variable} antialiased selection:bg-fr-sky selection:text-fr-navy`}>
        {children}
      </body>
    </html>
  );
}
