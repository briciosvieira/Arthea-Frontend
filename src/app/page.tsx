import { Abault } from "@/components/abault";

import { Location } from "@/components/location";
import { Slide } from "@/components/slide";
import { Videoclip } from "@/components/videoclip";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)]
             bg-[url('/fundo_page.jpg')] bg-no-repeat bg-cover bg-center bg-fixed opacity-[0.80] object-cover">
      <Videoclip/>
        <Abault />
        <Slide/>
        <Location/>
    
    </main>
  );
}
