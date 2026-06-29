"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFeedback } from "@/components/ui/feedback-provider";

export function LoginForm() {
    const router = useRouter();
    const { showError } = useFeedback();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login: login.trim(), password }),
                credentials: "include",
            });

            if (!res.ok) {
                let message = "Usuário ou senha incorretos.";
                try {
                    const err = await res.json();
                    if (typeof err?.message === "string" && err.message.trim()) message = err.message;
                } catch {}
                throw new Error(message);
            }

            sessionStorage.setItem("isLoggedIn", "true");
            window.dispatchEvent(new Event("loginStatusChanged"));
            router.push("/");
        } catch (error) {
            showError({
                title: "Não foi possível entrar",
                message: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
                confirmLabel: "Fechar",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleLogin} className="w-full max-w-[840px]">
            <div className="grid overflow-hidden rounded-[22px] border border-black/5 bg-[#EEEBE6] shadow-[0_16px_56px_rgba(15,23,42,0.12)] lg:grid-cols-[1fr_1.15fr]">

                {/* ── Coluna esquerda ── */}
                <div className="hidden bg-[linear-gradient(145deg,#3d4435_0%,#606958_62%,#737a65_100%)] p-7 text-white lg:flex lg:flex-col lg:justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.34em] text-[#FCE7B8]">
                            Clínica Arthea
                        </p>
                        <h1 className="mt-3 text-2xl font-semibold leading-snug">
                            Acesso administrativo
                        </h1>
                        <p className="mt-2.5 text-sm leading-6 text-white/75">
                            Gerencie médicos, administradores e informações da clínica com organização e segurança.
                        </p>
                    </div>

                    {/* Cards lado a lado */}
                    <div className="mt-5 grid grid-cols-2 gap-2.5">
                        <div className="rounded-xl border border-white/10 bg-white/10 p-3.5 backdrop-blur-sm">
                            <p className="text-[9px] uppercase tracking-[0.26em] text-[#FCE7B8]">Gestão</p>
                            <p className="mt-2 text-xs leading-5 text-white/72">
                                Controle de acessos, cadastros e operação interna.
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/10 p-3.5 backdrop-blur-sm">
                            <p className="text-[9px] uppercase tracking-[0.26em] text-[#FCE7B8]">Segurança</p>
                            <p className="mt-2 text-xs leading-5 text-white/72">
                                Área restrita para a equipe autorizada.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Coluna direita — formulário ── */}
                <div className="p-6 sm:p-8">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A8C76]">
                        Área restrita
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-[#000000] sm:text-2xl">
                        Entrar no painel
                    </h2>
                    <p className="mt-1.5 text-xs leading-5 text-[#87847D]">
                        Use suas credenciais para acessar a área interna da Clínica Arthea.
                    </p>

                    <div className="mt-5 grid gap-3">
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-slate-700">Login</span>
                            <input
                                type="text"
                                placeholder="Digite seu login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#606958] focus:ring-2 focus:ring-[#606958]/20"
                                required
                                autoComplete="username"
                            />
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-slate-700">Senha</span>
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#606958] focus:ring-2 focus:ring-[#606958]/20"
                                required
                                autoComplete="current-password"
                            />
                        </label>
                    </div>

                    <div className="mt-5 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-between">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                            Voltar
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-full bg-[#606958] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#4f5748] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Entrando..." : "Acessar painel"}
                        </button>
                    </div>
                </div>

            </div>
        </form>
    );
}
