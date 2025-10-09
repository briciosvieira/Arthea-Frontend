import Link from "next/link";

export function Videoclip() {
    return (
        <section className="relative h-[100vh] w-full overflow-hidden">
            <video autoPlay loop muted
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source src={'/video/videoclip.mp4'} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/30">
                <div className="relative z-10 flex h-full px-7 items-center justify-left text-center text-white text-shadow-lg">
                    <div className="flex flex-col sm:items-start items-center">
                        <h1 className="text-4xl font-bold">Consultórios de alto padrão</h1>

                        <Link
                            className="mt-4 inline-block rounded-xl bg-[#fcfcfc] px-6 py-3 text-lg font-semibold text-[#4a533f] hover:bg-[#cbd3c2] transition-colors duration-300"
                            href={'https://wa.me/5571981441233'} >Quero Saber Mais</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}