import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Location } from "@/components/location";
import { Slide } from "@/components/slide";
import { Videoclip } from "@/components/videoclip";
import { Container } from "@/components/container";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] animate-slideUp bg-white">
      <Header />
      <Videoclip />

      <Container>
        <About />
      </Container>

      <Slide />

      <Location />

      <Footer />

      <FloatingWhatsApp />
    </main>
  );
}
