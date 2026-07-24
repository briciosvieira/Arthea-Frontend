import { About } from "@/components/about";
import { ComoFunciona } from "@/components/how-it-works";
import { Cta } from "@/components/cta";
import { Diferenciais } from "@/components/features";
import { Equipe } from "@/components/team";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Location } from "@/components/location";
import { ParaQuem } from "@/components/for-whom";
import { Slide } from "@/components/slide";
import { Videoclip } from "@/components/videoclip";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] animate-slideUp bg-white">
      <Header />
      <Videoclip />
      <About />
      <Diferenciais />
      <ComoFunciona />
      <ParaQuem />
      <Equipe />
      <Slide />
      <Faq />
      <Location />
      <Cta />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
