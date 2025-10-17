// src/services/UserService.ts
import type { UserProps } from "@/components/types/UserProps";
import type { DoctorProps } from "../types/doctorProps";

const API_URL = process.env.NEXT_PUBLIC_URL;

export class Service {

    private getToken(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("token");
    }

    private get headers() {
        const token = this.getToken();

        if (!token) {
            throw new Error("Usuário não autenticado");
        }

        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
    }

    private handleExpiredToken(message?: string) {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/";
        }
    }

    async getUsers(): Promise<{ users: UserProps[]; total: number }> {
        const res = await fetch(`${API_URL}/users`, {
            headers: this.headers,
            cache: "no-store",
        });

        if (res.status === 401) {
            this.handleExpiredToken();
            return { users: [], total: 0 };
        }

        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Token expirado. Faça login novamente.");
            }
            const errorData = await res.json();
            throw new Error(errorData.message)
        }

        return res.json();
    }

    async getUserById(id: string): Promise<UserProps> {
        const res = await fetch(`${API_URL}/users/${id}`, {
            headers: this.headers,
        });

        if (!res.ok) { throw new Error("Usuário não encontrado"); }
        return res.json();
    }

    async deleteUsers(id: String): Promise<void> {
        const res = await fetch(`${API_URL}/users/${id}`, {
            headers: this.headers,
            method: "DELETE"
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message)
        }
    }

    async createUser(userData: {
        name: string;
        login: string;
        password: string;
    }): Promise<void> {
        const res = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message)
        }
    }

    async updateUser(id: string, data: Partial<UserProps>): Promise<UserProps> {

        if (data.password === '') {
            const { password, ...dataWithoutPassword } = data;
            data = dataWithoutPassword
        }
        const res = await fetch(`${API_URL}/users/${id}`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message)
        }

        return res.json();
    }

    async getLoggedUser(): Promise<UserProps> {
        const res = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
            headers: this.headers,
            credentials: 'include'
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message)
        }

        return res.json();
    }

    // doctor

    async getDoctors(): Promise<{ doctor: DoctorProps[], total: number }> {
        const res = await fetch(`${API_URL}/doctors`, {
            headers: this.headers,
            cache: 'no-store'
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message)
        }

        return res.json();
    }

    async createDoctor(doctorData: {
        name: string;
        crm: string;
        specialty: string;
        about: string;
        photoUrl: string;
    }): Promise<DoctorProps> {
        const res = await fetch(`${API_URL}/doctors`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(doctorData),
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message)
        }

        return res.json();
    }

}
