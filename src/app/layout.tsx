import type { Metadata } from "next";
import { Poppins  } from "next/font/google";
import "./globals.css";
import { FeedbackProvider } from "@/components/ui/feedback-provider";

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
    <html lang="pt-BR">
      <body
        className={poppins.className }
      >
        <FeedbackProvider>
          {children}
        </FeedbackProvider>
      </body>
    </html>
  );
}
