"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";
import LogoImg from "../../../public/logoSF.png";
import { getSocialLinksPublic, getWhatsAppUrl } from "@/app/services/service";

export function Header() {
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waUrl, setWaUrl] = useState("https://wa.me/5571981441233");

  const publicLinks = [
    { label: "Início",                 href: "/",     type: "link" as const,   external: false },
    { label: "Alugue seu consultório", href: waUrl,   type: "link" as const,   external: true  },
    { label: "Quem somos",             href: "about", type: "scroll" as const, external: false },
    { label: "Contato",                href: waUrl,   type: "link" as const,   external: true  },
  ];

  useEffect(() => {
    getSocialLinksPublic().then(links => setWaUrl(getWhatsAppUrl(links))).catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkLogin = () => setIsLogged(sessionStorage.getItem("isLoggedIn") === "true");
    checkLogin();
    window.addEventListener("loginStatusChanged", checkLogin);
    return () => window.removeEventListener("loginStatusChanged", checkLogin);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".menu-dropdown")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleLogin = () => router.push("/auth");

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/logout`, { method: "POST", credentials: "include" }).catch(() => {});
    sessionStorage.removeItem("isLoggedIn");
    setIsLogged(false);
    setMenuOpen(false);
    router.push("/");
  };

  const assistedPageScrolling = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handlePublicLinkClick = (link: (typeof publicLinks)[number]) => {
    setMobileMenuOpen(false);
    if (link.type === "scroll") assistedPageScrolling(link.href);
  };

  const navLinkClass =
    "relative text-sm text-white transition-all duration-300 hover:text-white/80 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full lg:text-[15px]";

  return (
    <>
      <header
        className={`fixed top-0 z-60 flex h-16 w-full items-center justify-between gap-4 px-4 transition-colors duration-500 sm:px-6 lg:px-10 ${
          scrolled ? "bg-[#606958] text-white shadow-md" : "bg-transparent text-white"
        }`}
      >
        {/* Logo + mobile hamburger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/15 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Abrir menu"
          >
            <SlMenu size={16} />
          </button>

          <Link href="/" className="flex">
            <Image src={LogoImg} alt="Logo clínica Arthea" width={120} quality={100} priority className="rounded-lg" />
          </Link>
        </div>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 xl:gap-10 md:flex">
          <Link href="/" className={navLinkClass}>Início</Link>

          <Link href={waUrl} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
            Alugue seu consultório
          </Link>

          <button onClick={() => assistedPageScrolling("about")} className={navLinkClass}>
            Quem somos
          </button>

          <Link href={waUrl} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
            Contato
          </Link>
        </nav>

        {/* Ações (login / admin menu) */}
        <div className="relative flex items-center gap-2">
          {!isLogged ? (
            <button
              onClick={handleLogin}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/15 text-white transition hover:bg-white/10"
              aria-label="Ir para login"
            >
              <CiUser size={22} />
            </button>
          ) : (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/15 text-white transition hover:bg-white/10"
                aria-label="Abrir menu administrativo"
              >
                <SlMenu size={17} />
              </button>

              {menuOpen && (
                <div className="menu-dropdown absolute right-0 top-12 w-40 rounded-2xl border border-white/10 bg-white py-2 text-gray-800 shadow-lg text-sm">
                  <Link href="/users"   className="block px-4 py-2 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Configuração</Link>
                  <Link href="/doctors" className="block px-4 py-2 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Médico</Link>
                  <Link href="/media"   className="block px-4 py-2 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Conteúdo</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-50">Sair</button>
                </div>
              )}
            </>
          )}
        </div>
      </header>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fechar menu"
          />

          <aside className="absolute left-0 top-0 flex h-full w-[80%] max-w-[300px] flex-col bg-[#EEEBE6] px-5 py-5 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.3)]">
            <div className="flex items-center justify-between border-b border-[#BEB2A4] pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A8C76]">Navegação</p>
                <h2 className="mt-1 text-lg font-semibold text-[#000000]">Clínica Arthea</h2>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#BEB2A4] text-[#606958]"
                aria-label="Fechar menu"
              >
                <IoClose size={18} />
              </button>
            </div>

            <nav className="mt-5 flex flex-col gap-2">
              {publicLinks.map((link) =>
                link.type === "scroll" ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handlePublicLinkClick(link)}
                    className="rounded-xl border border-[#BEB2A4] bg-white px-4 py-3 text-left text-sm font-medium text-[#606958] transition hover:bg-[#DCDFCE]"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => handlePublicLinkClick(link)}
                    className="rounded-xl border border-[#BEB2A4] bg-white px-4 py-3 text-left text-sm font-medium text-[#606958] transition hover:bg-[#DCDFCE]"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
