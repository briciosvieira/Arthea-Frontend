'use client'

import { useEffect, useState } from "react";
import { Service } from "../services/service";
import { UserProps } from "../types/UserProps";

export function UserIsLogged() {
    const [loggedUser, setLoggedUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);
    const service = new Service()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await service.getLoggedUser();
                setLoggedUser(user);
            } catch (error) {
                console.error('Erro ao pegar usuário logado:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    
    return (
        <section>
            <div className="text-2xl flex items-end border text-black border-gray-300 p-2 rounded-2xl bg-gray-500">
                {loading ? (
                    <p>Carregando...</p>
                ) : loggedUser ? (
                    <h1> <span className="font-bold text-red-800">Conta:</span> {loggedUser.name}</h1>
                ) : (
                    <p>Nenhum usuário logado</p>
                )}
            </div>
        </section>
    )
}