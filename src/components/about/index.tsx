import Image from "next/image";

export function About() {

  return (
    <main id="about"  className="w-full flex items-center justify-center scroll-smooth">
      <section
        className="flex flex-col md:flex-row
            relative overflow-hidden p-10 md:p-8
           bg-[#FFF] 
            mt-25
            ">

        <Image
          src={"/team1.jpg"}
          width={500}
          height={300}
          quality={100}
          alt="Logo"
          className="rounded-xl object-cover items-center"
        />
        <div className="px-6 sm:px-10 py-10 flex justify-center">
          <div className="w-full">
            <h3 className="text-xl sm:text-2xl font-medium text-black text-center mb-6">
              Quem Somos
            </h3>
            <p className="text-black text-justify leading-relaxed text-[20px]">
              A Arthea nasceu para oferecer cuidado em saúde com atenção humana,
              ambiente acolhedor e tecnologia que simplifica a sua jornada. Nosso
              time reúne profissionais experientes e especialidades integradas para
              um atendimento completo da prevenção ao acompanhamento. Nossa missão
              é promover cuidado integral, seguro e personalizado, com ética e
              excelência clínica.
              <br /><br />
              <span className="font-semibold">Nossa visão</span>: Ser referência em
              experiência do paciente e qualidade assistencial na região.
              <br /><br />
              <span className="font-semibold">Nossos valores</span>: Cuidado humano ·
              Transparência · Segurança e qualidade · Inovação · Acessibilidade.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}