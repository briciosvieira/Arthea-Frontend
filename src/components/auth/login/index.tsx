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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: login.trim(),
                    password,
                }),
                credentials: "include",
            });

            if (!res.ok) {
                let message = "Usuário ou senha incorretos.";

                try {
                    const errorData = await res.json();
                    if (typeof errorData?.message === "string" && errorData.message.trim()) {
                        message = errorData.message;
                    }
                } catch {
                }

                throw new Error(message);
            }

            const data = await res.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("isLoggedIn", "true");
            window.dispatchEvent(new Event("loginStatusChanged"));

            router.push("/");
        } catch (error) {
            console.error(error);
            showError({
                title: "Não foi possível entrar",
                message: error instanceof Error ? error.message : "Ocorreu um erro inesperado ao tentar autenticar.",
                confirmLabel: "Fechar",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleLogin} className="w-full max-w-5xl">
            <div className="grid overflow-hidden rounded-[32px] border border-white/10 bg-[#f5efe6] shadow-[0_32px_100px_rgba(15,23,42,0.35)] lg:grid-cols-[1fr_460px]">
                <div className="hidden bg-[linear-gradient(145deg,#17312d_0%,#24443d_58%,#2f534a_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.34em] text-[#d9c7a2]">
                            Clínica Arthea
                        </p>
                        <h1 className="mt-5 text-4xl font-semibold leading-tight">
                            Acesso administrativo com visual mais consistente e profissional.
                        </h1>
                        <p className="mt-6 max-w-md text-base leading-8 text-white/75">
                            Entre no painel para gerenciar médicos, administradores e informações da clínica com mais organização.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d9c7a2]">Gestão</p>
                            <p className="mt-3 text-sm leading-7 text-white/80">
                                Controle de acessos, cadastros e operação do painel interno.
                            </p>
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-[#d9c7a2]">Segurança</p>
                            <p className="mt-3 text-sm leading-7 text-white/80">
                                Área restrita para uso administrativo da equipe autorizada.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 sm:p-10">
                    <div className="mx-auto max-w-md">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#606958]">
                            Acesso administrativo
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold text-[#17312d]">
                            Entrar no painel
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-[#55635f]">
                            Use suas credenciais para acessar a área interna da Clínica Arthea.
                        </p>

                        <div className="mt-8 grid gap-5">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-700">Login</span>
                                <input
                                    type="text"
                                    placeholder="Digite seu login"
                                    value={login}
                                    onChange={(event) => setLogin(event.target.value)}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#17312d] focus:ring-2 focus:ring-[#17312d]/20"
                                    required
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-700">Senha</span>
                                <input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#17312d] focus:ring-2 focus:ring-[#17312d]/20"
                                    required
                                />
                            </label>
                        </div>

                        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                            >
                                Voltar
                            </Link>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded-full bg-[#17312d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#21433d] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Entrando..." : "Acessar painel"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
