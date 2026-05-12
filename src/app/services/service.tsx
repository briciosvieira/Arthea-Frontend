// src/services/UserService.ts
import type { UserProps } from "@/app/types/UserProps";
import type { DoctorProps } from "../types/doctorProps";

const API_URL = process.env.NEXT_PUBLIC_URL;

export class ServiceError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = "ServiceError";
        this.status = status;
    }
}

export class Service {

    private getToken(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("token");
    }

    private get headers() {
        const token = this.getToken();

        if (!token) {
            throw new ServiceError("Usuário não autenticado", 401);
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

    private async getErrorMessage(res: Response, fallbackMessage: string) {
        try {
            const contentType = res.headers.get("content-type") || "";

            if (contentType.includes("application/json")) {
                const errorData = await res.json();

                if (typeof errorData?.message === "string" && errorData.message.trim()) {
                    return errorData.message;
                }

                if (Array.isArray(errorData?.message)) {
                    return errorData.message.join(", ");
                }

                if (typeof errorData?.error === "string" && errorData.error.trim()) {
                    return errorData.error;
                }
            } else {
                const text = await res.text();
                if (text.trim()) {
                    return text;
                }
            }
        } catch {
        }

        return fallbackMessage;
    }

    private async ensureSuccess(res: Response, fallbackMessage: string) {
        if (res.ok) {
            return;
        }

        const message = await this.getErrorMessage(res, fallbackMessage);

        if (res.status === 401) {
            this.handleExpiredToken(message);
        }

        throw new ServiceError(message, res.status);
    }

    async getUsers(): Promise<{ users: UserProps[]; total: number }> {
        const res = await fetch(`${API_URL}/users`, {
            headers: this.headers,
            cache: "no-store",
        });

        await this.ensureSuccess(res, "Erro ao buscar usuários");

        return res.json();
    }

    async getUserById(id: string): Promise<UserProps> {
        const res = await fetch(`${API_URL}/users/${id}`, {
            headers: this.headers,
        });

        await this.ensureSuccess(res, "Usuário não encontrado");
        return res.json();
    }

    async deleteUsers(id: string): Promise<void> {
        const res = await fetch(`${API_URL}/users/${id}`, {
            headers: this.headers,
            method: "DELETE"
        });

        await this.ensureSuccess(res, "Erro ao excluir usuário");
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

        await this.ensureSuccess(res, "Erro ao criar usuário");
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

        await this.ensureSuccess(res, "Erro ao atualizar usuário");

        return res.json();
    }

    async getLoggedUser(): Promise<UserProps> {
        const res = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
            headers: this.headers,
            credentials: 'include'
        });

        await this.ensureSuccess(res, "Erro ao buscar usuário autenticado");

        return res.json();
    }

    async getDoctors(): Promise<{ doctor: DoctorProps[], total: number }> {
        const res = await fetch(`${API_URL}/doctors`, {
            headers: this.headers,
            cache: 'no-store'
        });

        await this.ensureSuccess(res, "Erro ao buscar médicos");

        const data = await res.json();

        if (data.doctor) {
            data.doctor = data.doctor.map((doc: DoctorProps) => ({
                ...doc,
                photoUrl: doc.photoUrl ? `${API_URL}${doc.photoUrl}` : ''
            }));
        }

        return data;
    }

    async createDoctor(formData: FormData): Promise<DoctorProps> {
        const token = this.getToken();

        if (!token) {
            throw new ServiceError("Usuário não autenticado", 401);
        }

        const res = await fetch(`${API_URL}/doctors`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        await this.ensureSuccess(res, "Erro ao criar médico");

        return res.json();
    }

    async updateDoctor(id: string, formData: FormData): Promise<DoctorProps> {
        const token = this.getToken();

        if (!token) {
            throw new ServiceError("Usuário não autenticado", 401);
        }

        const res = await fetch(`${API_URL}/doctors/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        await this.ensureSuccess(res, "Erro ao atualizar médico");

        return res.json();
    }

    async deleteDoctor(id: string): Promise<void> {
        const res = await fetch(`${API_URL}/doctors/${id}`, {
            headers: this.headers,
            method: "DELETE"
        });

        await this.ensureSuccess(res, "Erro ao excluir médico");
    }

    
}
