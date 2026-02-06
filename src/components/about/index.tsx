import Image from "next/image";

export function About() {

  return (
    <main id="about" className="flex flex-col items-center justify-center scroll-smooth">
      <section
        className="
    w-full 
    flex flex-col md:flex-row 
    relative 
    overflow-visible
    px-4 py-10 md:px-8 
    bg-white 
    mt-10
    max-w-6xl
  "
      >

        {/* IMAGEM */}

        <div className=" rounded-xl overflow-hidden shadow-lg w-full max-w-[400px] h-auto md:h-[520px]">
          <Image
            src={"/conjuntofotos.png"}
            width={250}
            height={520}
            quality={100}
            alt="Modelos"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full px-4 md:px-10 mt-6 md:mt-0 flex justify-center items-center">
          <div className="max-w-[600px]">
            <h3 className="text-xl sm:text-2xl font-medium text-black text-center mb-6">
              Quem Somos
            </h3>

            <p className="text-black text-justify leading-relaxed text-[18px] sm:text-[20px]">
              A Arthea nasceu para oferecer cuidado em saúde com atenção humana,
              ambiente acolhedor e tecnologia que simplifica a sua jornada...
            </p>
          </div>
        </div>

      </section>

      <section className="w-full py-16 bg-white flex flex-col md:flex-row justify-between items-start max-w-6xl gap-10">

        {/* COLUNA ESQUERDA */}
        <div className="w-full md:w-1/2 flex flex-col gap-10 px-6">

          {/* ITEM 1 */}
          <div className="flex items-start gap-6">
            <Image
              src="/calender.png"
              alt="icone"
              width={64}
              height={64}
              className="object-contain"
            />
            <p className="text-black text-[20px] leading-relaxed">
              Faça a reserva direto pelo app. Fácil e Rápido.
            </p>
          </div>

          {/* ITEM 2 */}
          <div className="flex items-start gap-6">
            <Image
              src="/predio.png"
              alt="icone"
              width={64}
              height={64}
              className="object-contain"
            />
            <p className="text-black text-[20px] leading-relaxed">
              Localizada na Pituba, temos uma estrutura completa de consultório de alto padrão. Traga apenas seu carimbo e caneta!
            </p>
          </div>

          {/* ITEM 3 */}
          <div className="flex items-start gap-6">
            <Image
              src="/calender.png"
              alt="icone"
              width={64}
              height={64}
              className="object-contain"
            />
            <p className="text-black text-[20px] leading-relaxed">
              Materiais para pequenas cirurgias, procedimentos médicos e estéticos.
            </p>
          </div>

          {/* ITEM 4 */}
          <div className="flex items-start gap-6">
            <Image
              src="/material.png"
              alt="icone"
              width={64}
              height={64}
              className="object-contain"
            />
            <p className="text-black text-[20px] leading-relaxed">
              O paciente paga diretamente na sua maquininha. Você só paga pelas reservas e produtos usados, no mês seguinte.
            </p>
          </div>

          {/* ITEM 5 */}
          <div className="flex items-start gap-6">
            <Image
              src="/equipe.png"
              alt="icone"
              width={64}
              height={64}
              className="object-contain"
            />
            <p className="text-black text-[20px] leading-relaxed">
              Oferecemos a equipe e a estrutura para você focar na sua carreira.
            </p>
          </div>

        </div>

        {/* COLUNA DIREITA */}
        <div className="w-full md:w-1/2 relative flex justify-center px-6">

          <div className=" rounded-xl overflow-hidden shadow-lg w-full max-w-[350px] h-auto md:h-[620px]">
            <Image
              src={"/conjuntofotos.png"}
              width={350}
              height={520}
              quality={100}
              alt="Modelos"
              className="object-cover w-full h-full"
            />
          </div>

        </div>

      </section>
    </main>
  );
}