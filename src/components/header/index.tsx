"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import LogoImg from "../../../public/logoSF.png";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detecta login e escuta mudanças no localStorage
  useEffect(() => {
    const checkLogin = () => {
      const stored = localStorage.getItem("isLoggedIn");
      setIsLogged(stored === "true");
    };

    checkLogin();

    // Atualiza automaticamente quando o localStorage muda
    window.addEventListener("storage", checkLogin);
    window.addEventListener("loginStatusChanged", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // Fecha menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".menu-dropdown")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = () => {
    router.push("/auth"); // Só redireciona. Quem faz o login é o LoginForm.
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("isLoggedIn");
    setIsLogged(false);
    setMenuOpen(false);
    router.push("/");
  };

  const isAuthPage = pathname.startsWith("/auth");

  return (
    <>
      {!isAuthPage && (
        <header
          className={`fixed top-0 z-50 w-full h-20 flex items-center
          justify-between px-6 transition-colors duration-500 gap-6
          ${scrolled ? "bg-[#606958] text-white shadow-lg" : "bg-transparent text-white"}`}
        >
          <div className="flex justify-start">
            <Link href={"/"} className="flex">
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

          <nav className="flex justify-center items-center gap-6 md:gap-10 xl:gap-16 text-[#6e6e6c] text-base md:text-lg whitespace-nowrap">
            <Link
              href="/"
              className="text-white relative transition-all duration-300 hover:text-[#f5f5f5]
              after:absolute after:left-0 after:bottom-0 after:h-[2px]
              after:w-0 after:bg-current after:transition-all after:duration-300
              hover:after:w-full sm:text-[21px]"
            >
              Início
            </Link>

            <Link
              href="/"
              className="text-white relative transition-all duration-300 hover:text-[#f5f5f5]
              after:absolute after:left-0 after:bottom-0 after:h-[2px]
              after:w-0 after:bg-current after:transition-all after:duration-300
              hover:after:w-full sm:text-[21px]"
            >
              Alugue seu consultório
            </Link>

            <Link
              href="/"
              className="text-white hidden sm:inline relative transition-all duration-300 hover:text-[#f5f5f5]
              after:absolute after:left-0 after:bottom-0 after:h-[2px]
              after:w-0 after:bg-current after:transition-all after:duration-300
              hover:after:w-full sm:text-[21px]"
            >
              Quem somos
            </Link>

            <Link
              href="/"
              className="text-white relative transition-all duration-300 hover:text-[#f5f5f5]
              after:absolute after:left-0 after:bottom-0 after:h-[2px]
              after:w-0 after:bg-current after:transition-all after:duration-300
              hover:after:w-full sm:text-[21px]"
            >
              Contato
            </Link>
          </nav>

          <div className="relative">
            {!isLogged ? (
              <button
                onClick={handleLogin}
                className="relative transition-all duration-300 hover:text-[#f5f5f5]
                after:absolute after:left-0 after:bottom-0 after:h-[2px]
                after:w-0 after:bg-current after:transition-all after:duration-300
                hover:after:w-full"
              >
                <AiOutlineUser size={25} color="#FFFF" />
              </button>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                  }}
                  className="focus:outline-none"
                >
                  <Image
                    src="/login.png"
                    alt="Perfil"
                    width={32}
                    height={32}
                    className="rounded-full border border-white hover:opacity-90"
                  />
                </button>

                {menuOpen && (
                  <div className="menu-dropdown absolute right-0 mt-3 w-40 bg-white text-gray-800 rounded-lg shadow-lg py-2">
                    <Link
                      href="/perfil"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Perfil
                    </Link>

                    <Link
                      href="/consultas"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Consultas
                    </Link>

                    <Link
                      href="/medico"
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
      )}
    </>
  );
}
