"use client"
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import TesteImg3 from "../../../public/imagem2.jpg";
import TesteImg4 from "../../../public/imagem3.jpg";
import TesteImg5 from "../../../public/imagem5.jpg";
import TesteImg2 from "../../../public/team1.jpg";
import TesteImg from "../../../public/teste.png";

const slideData = [
  { imgSrc: TesteImg },
  { imgSrc: TesteImg2 },
  { imgSrc: TesteImg3 },
  { imgSrc: TesteImg4 },
  { imgSrc: TesteImg5 },
];

export function Slide() {
  return (
    <main className="w-full py-10 px-10 bg-[#FFF]">
      <section className="max-w-7xl mx-auto p-5">
        
        {/* Título Principal */}
        <div className="flex flex-col items-center justify-center mb-10">
          <h2 className="text-2xl mx-4 sm:text-3xl self-start font-semibold mb-6 mt-10 text-[#606958]">
            Um pouco da Nossa Estrutura
          </h2>
        </div>

        {/* Seção Recepção */}
        <h3 className="mx-4 text-2xl self-start font-semibold mb-6 text-[#606958]">
          Recepção
        </h3>
        
        <div className="mb-10">
          <Swiper
            centeredSlides
            loop
            spaceBetween={10}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            grabCursor
            slideToClickedSlide
            modules={[Autoplay, Pagination]}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 3 },
            }}
          >
            {slideData.map((slide, index) => (
              <SwiperSlide key={index} className="swiper-slide-custom">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={slide.imgSrc}
                    alt="Slide da Recepção"
                    fill
                    quality={100}
                    className="object-cover rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Seção Consultórios */}
        <h3 className="mx-4 text-2xl self-start font-semibold mb-6 mt-10 text-[#606958]">
          Consultórios
        </h3>
        
        <div>
          <Swiper
            centeredSlides
            loop
            spaceBetween={10}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            grabCursor
            slideToClickedSlide
            modules={[Autoplay, Pagination]}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 3 },
            }}
          >
            {slideData.map((slide, index) => (
              <SwiperSlide key={index} className="swiper-slide-custom">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={slide.imgSrc}
                    alt="Slide dos Consultórios"
                    fill
                    quality={100}
                    className="object-cover rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Estilos Globais do Swiper */}
        <style jsx global>{`
          .swiper-slide-custom {
            width: 280px;
            height: 400px;
            transition: transform 0.4s;
          }

          .swiper-slide-active {
            transform: scale(1.0);
            z-index: 10;
          }

          .swiper-slide-prev,
          .swiper-slide-next {
            transform: scale(0.901);
          }
        `}</style>
      </section>
    </main>
  );
}