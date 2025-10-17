"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
    const router = useRouter();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login,
                    password,
                }),
                credentials: "include",
            });

            if (!res.ok) throw new Error("Usuário ou senha incorretos");

            const data = await res.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("isLoggedIn", "true");
            window.dispatchEvent(new Event("loginStatusChanged"));

            router.push("/");

        } catch (error) {
            console.error(error);
            alert("Usuário ou senha incorretos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
                <div className="bg-white p-12 rounded-lg w-96 h-auto max-w-full flex items-center flex-col gap-2">
                    <label className="font-bold text-lg">Login</label>

                    <input
                        type="text"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-[#606958] focus:border-transparent 
              transition duration-200 placeholder-gray-400"
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-[#606958] focus:border-transparent 
              transition duration-200 placeholder-gray-400"
                    />

                    <div className="flex justify-between w-full mt-4">
                        <Link
                            href="/"
                            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
                        >
                            Voltar
                        </Link>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#606958] text-white px-4 py-2 rounded hover:bg-[#4e5646]"
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
