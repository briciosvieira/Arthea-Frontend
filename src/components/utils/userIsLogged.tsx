'use client'

import { useEffect, useState } from "react";
import { Service } from "@/app/services/service";
import { UserProps } from "@/app/types/UserProps";

export function UserIsLogged() {
    const [loggedUser, setLoggedUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);
    const service = new Service();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await service.getLoggedUser();
                setLoggedUser(user);
            } catch (error) {
                console.error("Erro ao pegar usuário logado:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="rounded-[22px] border border-white/15 bg-[#17312d]/90 px-4 py-3 text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
            {loading ? (
                <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-200/60">Sessão ativa</p>
                    <p className="mt-2 text-sm text-white/70">Carregando conta...</p>
                </div>
            ) : loggedUser ? (
                <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-200/60">Conta ativa</p>
                    <h1 className="mt-2 text-base font-semibold leading-tight">{loggedUser.name}</h1>
                    <p className="mt-1 text-xs text-white/60">Acesso administrativo</p>
                </div>
            ) : (
                <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-200/60">Sessão</p>
                    <p className="mt-2 text-sm text-white/70">Nenhum usuário autenticado</p>
                </div>
            )}
        </section>
    );
}
