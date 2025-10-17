import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import { Location } from "@/components/location";
import { Slide } from "@/components/slide";
import { Videoclip } from "@/components/videoclip";
import Image from "next/image";
import Link from "next/link";
import whatsLogo from '../../public/whartsLogo.png';

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] animate-slideUp">
      <Header />
      <Videoclip />
      <About />
      <Slide />
      <Location />
      <Footer />
      <Link href={'https://wa.me/5571981441233'} >
        <Image width={60} alt="whats" src={whatsLogo} className="fixed bottom-10 right-4 z-50" />
      </Link>

    </main>
  );
}
