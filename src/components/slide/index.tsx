"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Service } from "@/app/services/service";

const service = new Service();

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: string[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}

function Lightbox({ images, initialIndex, alt, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(initialIndex);
  const touchStartX = useRef(0);

  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [prev, next, onClose]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 48) { dx < 0 ? next() : prev(); }
      }}
    >
      {/* Fechar */}
      <button
        onClick={onClose}
        aria-label="Fechar lightbox"
        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-sm transition hover:bg-white/22"
      >
        <IoClose size={20} />
      </button>

      {/* Contador */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] text-white/50 tabular-nums">
        {idx + 1} / {images.length}
      </p>

      {/* Área da imagem + setas */}
      <div
        className="relative flex items-center gap-3 px-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Seta esquerda */}
        <button
          onClick={prev}
          aria-label="Imagem anterior"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-sm transition hover:bg-white/22"
        >
          <IoChevronBack size={22} />
        </button>

        {/* Imagem */}
        <img
          src={images[idx]}
          alt={`${alt} — ${idx + 1} de ${images.length}`}
          className="max-h-[80vh] max-w-[75vw] rounded-2xl object-contain shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
          draggable={false}
        />

        {/* Seta direita */}
        <button
          onClick={next}
          aria-label="Próxima imagem"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-sm transition hover:bg-white/22"
        >
          <IoChevronForward size={22} />
        </button>
      </div>
    </div>
  );
}

// ─── Carrossel ─────────────────────────────────────────────────────────────────

function SliderSwiper({ images, alt }: { images: string[]; alt: string }) {
  const count = images.length;
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Swiper clona slides internamente quando loop=true.
  // Para evitar glitch com poucos slides, garantimos slides suficientes.
  const loopEnabled = count >= 2;

  return (
    <>
      <div className="dark-slider select-none">
        <Swiper
          loop={loopEnabled}
          centeredSlides={false}
          spaceBetween={10}
          speed={580}
          grabCursor
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            0:    { slidesPerView: 1 },
            640:  { slidesPerView: Math.min(count, 2), spaceBetween: 10 },
            1024: { slidesPerView: Math.min(count, 3), spaceBetween: 12 },
          }}
        >
          {images.map((src, i) => (
            <SwiperSlide key={src + i}>
              <button
                type="button"
                aria-label={`Ampliar imagem ${i + 1} de ${alt}`}
                className="group relative block h-[260px] w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FCE7B8]/60"
                onClick={() => setLightboxIdx(i)}
              >
                <img
                  src={src}
                  alt={`${alt} — foto ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Hover overlay + ícone de lupa */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 transition-colors duration-300 group-hover:bg-black/28">
                  <span className="scale-75 text-white/0 transition-all duration-300 group-hover:scale-100 group-hover:text-white/80 text-2xl select-none">
                    &#x2315;
                  </span>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIdx}
          alt={alt}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}

// ─── Placeholder vazio ─────────────────────────────────────────────────────────

function EmptySlider() {
  return (
    <div className="flex h-[176px] items-center justify-center rounded-xl border border-dashed border-[#8A8C76]/40 bg-[#8A8C76]/10 text-xs text-[#EEEBE6]/50">
      Nenhuma imagem cadastrada — adicione pelo painel de Conteúdo
    </div>
  );
}

// ─── Seção principal ───────────────────────────────────────────────────────────

export function Slide() {
  const [recepcao, setRecepcao] = useState<string[]>([]);
  const [consultorio, setConsultorio] = useState<string[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_URL;
    Promise.all([service.getSlider("RECEPCAO"), service.getSlider("CONSULTORIO")])
      .then(([r, c]) => {
        setRecepcao(r.filter((i) => i.active).map((i) => `${apiUrl}${i.filePath}`));
        setConsultorio(c.filter((i) => i.active).map((i) => `${apiUrl}${i.filePath}`));
      })
      .catch(() => {});
  }, []);

  return (
    <section id="galeria" className="w-full bg-[#606958] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-5">
          <p className="text-[9px] uppercase tracking-[0.34em] text-[#FCE7B8]">Consultório Arthea</p>
          <h2 className="mt-1 text-base font-semibold text-white sm:text-lg">Um pouco do nosso espaço</h2>
          <div className="mt-2 h-[2px] w-5 bg-[#AB8E66]" />
        </div>

        <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-[#FCE7B8]/70">Recepção</p>
        <div className="mb-7">
          {recepcao.length > 0
            ? <SliderSwiper key={recepcao[0]} images={recepcao} alt="Recepção" />
            : <EmptySlider />}
        </div>

        <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-[#FCE7B8]/70">Consultórios</p>
        <div className="pb-2">
          {consultorio.length > 0
            ? <SliderSwiper key={consultorio[0]} images={consultorio} alt="Consultórios" />
            : <EmptySlider />}
        </div>
      </div>

      <style jsx global>{`
        .dark-slider .swiper-pagination-bullet {
          background: rgba(252, 231, 184, 0.30);
          opacity: 1;
          width: 6px;
          height: 6px;
          transition: transform 0.2s, background 0.2s;
        }
        .dark-slider .swiper-pagination-bullet-active {
          background: #FCE7B8;
          transform: scale(1.35);
        }
        .dark-slider .swiper-wrapper {
          padding-bottom: 34px;
        }
      `}</style>
    </section>
  );
}
