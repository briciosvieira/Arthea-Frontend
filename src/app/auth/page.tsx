import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login";

export const metadata: Metadata = {
    title: "Acesso administrativo | Clínica Arthea",
    description: "Área de autenticação do painel administrativo da Clínica Arthea.",
};

export default function AuthPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#EEEBE6] px-5 py-8">
            <LoginForm />
        </main>
    );
}
