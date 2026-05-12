"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";
import LogoImg from "../../../public/logoSF.png";

const publicLinks = [
  { label: "Início", href: "/", type: "link" as const },
  { label: "Alugue seu consultório", href: "https://wa.me/5571981441233", type: "link" as const },
  { label: "Quem somos", href: "about", type: "scroll" as const },
  { label: "Contato", href: "https://wa.me/5571981441233", type: "link" as const },
];

export function Header() {
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      const stored = localStorage.getItem("isLoggedIn");
      setIsLogged(stored === "true");
    };

    checkLogin();

    window.addEventListener("storage", checkLogin);
    window.addEventListener("loginStatusChanged", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("loginStatusChanged", checkLogin);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".menu-dropdown")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogin = () => {
    router.push("/auth");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLogged(false);
    setMenuOpen(false);
    router.push("/");
  };

  const assistedPageScrolling = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePublicLinkClick = (link: (typeof publicLinks)[number]) => {
    setMobileMenuOpen(false);

    if (link.type === "scroll") {
      assistedPageScrolling(link.href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 z-60 flex h-20 w-full items-center justify-between gap-4 px-4 transition-colors duration-500 sm:px-6 ${scrolled ? "bg-[#606958] text-white shadow-lg" : "bg-transparent text-white"}`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/15 text-white transition hover:bg-white/10 sm:hidden"
            aria-label="Abrir menu"
          >
            <SlMenu size={18} />
          </button>

          <Link href="/" className="flex">
            <Image
              src={LogoImg}
              alt="Logo clínica Arthea"
              width={150}
              quality={100}
              priority
              className="rounded-lg"
            />
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-6 whitespace-nowrap text-base text-[#6e6e6c] md:gap-10 xl:gap-16 md:flex">
          <Link
            href="/"
            className="relative text-white transition-all duration-300 hover:text-[#f5f5f5] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full sm:text-[21px]"
          >
            Início
          </Link>

          <Link
            href="https://wa.me/5571981441233"
            className="relative text-white transition-all duration-300 hover:text-[#f5f5f5] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full sm:text-[21px]"
          >
            Alugue seu consultório
          </Link>

          <button
            onClick={() => assistedPageScrolling("about")}
            className="relative text-white transition-all duration-300 hover:text-[#f5f5f5] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full sm:text-[21px]"
          >
            Quem somos
          </button>

          <Link
            href="https://wa.me/5571981441233"
            className="relative text-white transition-all duration-300 hover:text-[#f5f5f5] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full sm:text-[21px]"
          >
            Contato
          </Link>
        </nav>

        <div className="relative flex items-center gap-2">
          {!isLogged ? (
            <button
              onClick={handleLogin}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/15 text-white transition hover:bg-white/10"
              aria-label="Ir para login"
            >
              <CiLogin size={26} />
            </button>
          ) : (
            <>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/15 text-white transition hover:bg-white/10 focus:outline-none"
                aria-label="Abrir menu administrativo"
              >
                <CiLogin size={24} />
              </button>

              {menuOpen && (
                <div className="menu-dropdown absolute right-0 top-14 w-44 rounded-2xl border border-white/10 bg-white py-2 text-gray-800 shadow-lg">
                  <Link
                    href="/users"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Configuração
                  </Link>

                  <Link
                    href="/doctors"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Médico
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] sm:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fechar menu"
          />

          <aside className="absolute left-0 top-0 flex h-full w-[84%] max-w-[320px] flex-col bg-[#f5efe6] px-6 py-6 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.3)]">
            <div className="flex items-center justify-between border-b border-[#d6c9b4] pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#606958]">Navegação</p>
                <h2 className="mt-2 text-xl font-semibold">Clínica Arthea</h2>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6c9b4] text-[#17312d]"
                aria-label="Fechar menu"
              >
                <IoClose size={20} />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-3">
              {publicLinks.map((link) =>
                link.type === "scroll" ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handlePublicLinkClick(link)}
                    className="rounded-2xl border border-[#d6c9b4] bg-white px-4 py-4 text-left text-base font-medium text-[#17312d] transition hover:bg-[#efe4d2]"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => handlePublicLinkClick(link)}
                    className="rounded-2xl border border-[#d6c9b4] bg-white px-4 py-4 text-left text-base font-medium text-[#17312d] transition hover:bg-[#efe4d2]"
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
