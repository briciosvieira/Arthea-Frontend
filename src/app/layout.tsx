import type { Metadata } from "next";
import { Poppins  } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"]
});

export const metadata: Metadata = {
  title: "Clinica Arthea",
  description: "Clinica Arthea",
    icons:{
      icon: "/favicon.ico",
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className }
      >
        {children}
      </body>
    </html>
  );
}
