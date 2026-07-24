// src/services/UserService.ts
import type { UserProps } from "@/app/types/UserProps";
import type { DoctorProps } from "../types/doctorProps";

const API_URL = process.env.NEXT_PUBLIC_URL;

export interface HeroMedia {
    type: 'VIDEO' | 'IMAGE';
    videoPath: string | null;
    imagePath: string | null;
}

export interface SliderImage {
    id: string;
    section: 'RECEPCAO' | 'CONSULTORIO';
    filePath: string;
    active: boolean;
    order: number;
}

export interface QuemSomosImage {
    position: number;
    filePath: string;
}

export interface Specialty {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

export type SocialLinkType =
    | 'FACEBOOK' | 'INSTAGRAM' | 'LINKEDIN' | 'WHATSAPP'
    | 'YOUTUBE'  | 'TIKTOK'    | 'TWITTER'  | 'ADDRESS' | 'OTHER';

export interface SocialLink {
    id: string;
    type: SocialLinkType;
    value: string;
    label: string | null;
    createdAt: string;
    updatedAt: string;
}

// ── Cache compartilhado para evitar múltiplas requisições na mesma página ──
let _socialLinksCache: Promise<SocialLink[]> | null = null;
let _doctorsCache: Promise<import("@/app/types/doctorProps").DoctorProps[]> | null = null;
let _specialtiesCache: Promise<Specialty[]> | null = null;

export function getSocialLinksPublic(): Promise<SocialLink[]> {
    if (!_socialLinksCache) {
        _socialLinksCache = fetch(`${API_URL}/social-links`, { cache: "no-store" })
            .then(r => (r.ok ? r.json() : []))
            .catch(() => { _socialLinksCache = null; return [] as SocialLink[]; });
    }
    return _socialLinksCache;
}

export function getDoctorsPublic(): Promise<import("@/app/types/doctorProps").DoctorProps[]> {
    if (!_doctorsCache) {
        _doctorsCache = fetch(`${API_URL}/doctors`, { cache: "no-store" })
            .then(r => {
                if (!r.ok) return [];
                return r.json().then((d: { doctor: import("@/app/types/doctorProps").DoctorProps[] }) =>
                    (d.doctor ?? []).map(doc => ({
                        ...doc,
                        photoUrl: doc.photoUrl ? `${API_URL}${doc.photoUrl}` : "",
                    }))
                );
            })
            .catch(() => { _doctorsCache = null; return []; });
    }
    return _doctorsCache;
}

export function getSpecialtiesPublic(): Promise<Specialty[]> {
    if (!_specialtiesCache) {
        _specialtiesCache = fetch(`${API_URL}/specialties`, { cache: "no-store" })
            .then(r => (r.ok ? r.json() : []))
            .catch(() => { _specialtiesCache = null; return [] as Specialty[]; });
    }
    return _specialtiesCache;
}

export function getWhatsAppUrl(links: SocialLink[], text?: string): string | null {
    const wa = links.find(l => l.type === "WHATSAPP");
    if (!wa) return null;
    const base = `https://wa.me/${wa.value}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export class ServiceError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = "ServiceError";
        this.status = status;
    }
}

export class Service {

    private get headers() {
        return {
            "Content-Type": "application/json",
        };
    }

    private handleExpiredToken() {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("isLoggedIn");
            window.location.href = "/auth";
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
            this.handleExpiredToken();
        }

        throw new ServiceError(message, res.status);
    }

    async getUsers(): Promise<{ users: UserProps[]; total: number }> {
        const res = await fetch(`${API_URL}/users`, {
            headers: this.headers,
            credentials: "include",
            cache: "no-store",
        });

        await this.ensureSuccess(res, "Erro ao buscar usuários");

        return res.json();
    }

    async getUserById(id: string): Promise<UserProps> {
        const res = await fetch(`${API_URL}/users/${id}`, {
            headers: this.headers,
            credentials: "include",
        });

        await this.ensureSuccess(res, "Usuário não encontrado");
        return res.json();
    }

    async deleteUsers(id: string): Promise<void> {
        const res = await fetch(`${API_URL}/users/${id}`, {
            method: "DELETE",
            headers: this.headers,
            credentials: "include",
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
            credentials: "include",
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
            credentials: "include",
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
            credentials: "include",
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
        const res = await fetch(`${API_URL}/doctors`, {
            method: 'POST',
            credentials: "include",
            body: formData,
        });

        await this.ensureSuccess(res, "Erro ao criar médico");

        return res.json();
    }

    async updateDoctor(id: string, formData: FormData): Promise<DoctorProps> {
        const res = await fetch(`${API_URL}/doctors/${id}`, {
            method: 'PUT',
            credentials: "include",
            body: formData,
        });

        await this.ensureSuccess(res, "Erro ao atualizar médico");

        return res.json();
    }

    async deleteDoctor(id: string): Promise<void> {
        const res = await fetch(`${API_URL}/doctors/${id}`, {
            method: "DELETE",
            headers: this.headers,
            credentials: "include",
        });

        await this.ensureSuccess(res, "Erro ao excluir médico");
    }

    async getHero(): Promise<HeroMedia> {
        const res = await fetch(`${API_URL}/media/hero`, { cache: "no-store" });
        await this.ensureSuccess(res, "Erro ao buscar configuração do hero");
        return res.json();
    }

    async updateHeroType(type: 'VIDEO' | 'IMAGE'): Promise<void> {
        const res = await fetch(`${API_URL}/media/hero/type`, {
            method: "PATCH",
            headers: this.headers,
            credentials: "include",
            body: JSON.stringify({ type }),
        });
        await this.ensureSuccess(res, "Erro ao atualizar tipo do hero");
    }

    async uploadHeroVideo(formData: FormData): Promise<void> {
        const res = await fetch(`${API_URL}/media/hero/video`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        await this.ensureSuccess(res, "Erro ao enviar vídeo");
    }

    async uploadHeroImage(formData: FormData): Promise<void> {
        const res = await fetch(`${API_URL}/media/hero/image`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        await this.ensureSuccess(res, "Erro ao enviar imagem do hero");
    }

    async getSlider(section: string): Promise<SliderImage[]> {
        const res = await fetch(`${API_URL}/media/slider/${section}`, { cache: "no-store" });
        await this.ensureSuccess(res, "Erro ao buscar slider");
        return res.json();
    }

    async addSliderImage(section: string, formData: FormData): Promise<void> {
        const res = await fetch(`${API_URL}/media/slider/${section}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        await this.ensureSuccess(res, "Erro ao adicionar imagem ao slider");
    }

    async updateSliderImage(section: string, id: string, data: { active?: boolean; order?: number }): Promise<void> {
        const res = await fetch(`${API_URL}/media/slider/${section}/${id}`, {
            method: "PATCH",
            headers: this.headers,
            credentials: "include",
            body: JSON.stringify(data),
        });
        await this.ensureSuccess(res, "Erro ao atualizar imagem");
    }

    async deleteSliderImage(section: string, id: string): Promise<void> {
        const res = await fetch(`${API_URL}/media/slider/${section}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        await this.ensureSuccess(res, "Erro ao excluir imagem");
    }

    async getQuemSomos(): Promise<QuemSomosImage[]> {
        const res = await fetch(`${API_URL}/media/quem-somos`, { cache: "no-store" });
        await this.ensureSuccess(res, "Erro ao buscar imagens do Quem Somos");
        return res.json();
    }

    async uploadQuemSomosImage(position: number, formData: FormData): Promise<void> {
        const res = await fetch(`${API_URL}/media/quem-somos/${position}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        await this.ensureSuccess(res, "Erro ao enviar imagem");
    }

    async deleteQuemSomosImage(position: number): Promise<void> {
        const res = await fetch(`${API_URL}/media/quem-somos/${position}`, {
            method: "DELETE",
            credentials: "include",
        });
        await this.ensureSuccess(res, "Erro ao remover imagem");
    }

    // ── Especialidades ──────────────────────────────────────────────────────

    async getSpecialties(): Promise<Specialty[]> {
        const res = await fetch(`${API_URL}/specialties`, { cache: "no-store" });
        await this.ensureSuccess(res, "Erro ao buscar especialidades");
        return res.json();
    }

    async createSpecialty(data: { name: string; description: string }): Promise<Specialty> {
        const res = await fetch(`${API_URL}/specialties`, {
            method: "POST",
            headers: this.headers,
            credentials: "include",
            body: JSON.stringify(data),
        });
        await this.ensureSuccess(res, "Erro ao criar especialidade");
        return res.json();
    }

    async deleteSpecialty(id: string): Promise<void> {
        const res = await fetch(`${API_URL}/specialties/${id}`, {
            method: "DELETE",
            headers: this.headers,
            credentials: "include",
        });
        await this.ensureSuccess(res, "Erro ao excluir especialidade");
    }

    // ── Redes Sociais ───────────────────────────────────────────────────────

    async getSocialLinks(): Promise<SocialLink[]> {
        const res = await fetch(`${API_URL}/social-links`, { cache: "no-store" });
        await this.ensureSuccess(res, "Erro ao buscar redes sociais");
        return res.json();
    }

    async createSocialLink(data: { type: string; value: string; label?: string }): Promise<SocialLink> {
        const body: Record<string, string> = { type: data.type, value: data.value };
        if (data.label?.trim()) body.label = data.label.trim();
        const res = await fetch(`${API_URL}/social-links`, {
            method: "POST",
            headers: this.headers,
            credentials: "include",
            body: JSON.stringify(body),
        });
        await this.ensureSuccess(res, "Erro ao criar rede social");
        return res.json();
    }

    async updateSocialLink(id: string, data: { type?: string; value?: string; label?: string }): Promise<SocialLink> {
        const res = await fetch(`${API_URL}/social-links/${id}`, {
            method: "PATCH",
            headers: this.headers,
            credentials: "include",
            body: JSON.stringify(data),
        });
        await this.ensureSuccess(res, "Erro ao atualizar rede social");
        return res.json();
    }

    async deleteSocialLink(id: string): Promise<void> {
        const res = await fetch(`${API_URL}/social-links/${id}`, {
            method: "DELETE",
            headers: this.headers,
            credentials: "include",
        });
        await this.ensureSuccess(res, "Erro ao excluir rede social");
    }
}
