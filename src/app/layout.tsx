import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { FeedbackProvider } from "@/components/ui/feedback-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clinicaarthea.com.br"),

  title: {
    default: "Clínica Arthea — Espaços para Profissionais de Saúde em Salvador",
    template: "%s | Clínica Arthea",
  },

  description:
    "Clínica Arthea oferece consultórios e espaços modernos para profissionais de saúde em Pituba, Salvador — BA. Estrutura completa, localização estratégica e operação simplificada.",

  keywords: [
    "clínica arthea",
    "arthea",
    "clinica arthea",
    "consultório para alugar salvador",
    "espaço médico salvador",
    "consultório pituba",
    "sala médica salvador",
    "aluguel consultório médico",
    "espaço saúde pituba",
    "profissionais de saúde salvador",
    "consultório médico bahia",
    "clinicaarthea",
    "clinicarthea",
  ],

  authors: [{ name: "Clínica Arthea", url: "https://clinicaarthea.com.br" }],
  creator: "Clínica Arthea",
  publisher: "Clínica Arthea",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://clinicaarthea.com.br",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://clinicaarthea.com.br",
    siteName: "Clínica Arthea",
    title: "Clínica Arthea — Espaços para Profissionais de Saúde em Salvador",
    description:
      "Consultórios modernos na Pituba, Salvador-BA. Infraestrutura completa para profissionais de saúde.",
    images: [
      {
        url: "/logoSF.png",
        width: 512,
        height: 512,
        alt: "Clínica Arthea — Espaços para Profissionais de Saúde",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "Clínica Arthea — Espaços para Profissionais de Saúde",
    description: "Consultórios modernos na Pituba, Salvador-BA.",
    images: ["/logoSF.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Clínica Arthea",
  alternateName: ["Arthea", "Clinica Arthea", "Clinicaarthea"],
  description:
    "Espaços profissionais para consultas, procedimentos e atendimentos em Salvador, BA. Consultórios modernos na Pituba com infraestrutura completa para profissionais de saúde.",
  url: "https://clinicaarthea.com.br",
  telephone: "+55-71-98144-1233",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Prof. Magalhães Neto, 1752, Loja 03, Ed. Lena Empresarial, Pituba",
    addressLocality: "Salvador",
    addressRegion: "BA",
    addressCountry: "BR",
  },
  image: "https://clinicaarthea.com.br/logoSF.png",
  sameAs: [
    "https://arthea.com.br",
    "https://clinicarthea.com.br",
    "https://clinicaarthea.com",
    "https://clinicarthea.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={poppins.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FeedbackProvider>{children}</FeedbackProvider>
      </body>
    </html>
  );
}
