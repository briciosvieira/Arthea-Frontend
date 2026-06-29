import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Location } from "@/components/location";
import { Slide } from "@/components/slide";
import { Videoclip } from "@/components/videoclip";
import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import whatsLogo from "../../public/whartsLogo.png";

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

      {/* Botão WhatsApp com efeito glow acendendo */}
      <Link href="https://wa.me/5571981441233" className="fixed bottom-8 right-4 z-50">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-green-400/25 animate-ping" />
          <Image
            width={52}
            alt="whats"
            src={whatsLogo}
            className="relative animate-glow-whats"
          />
        </div>
      </Link>
    </main>
  );
}
