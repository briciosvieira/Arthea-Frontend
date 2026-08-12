"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CookieConsent = {
    necessary: true;
    analytics: boolean;
    marketing: boolean;
    decided: boolean;
};

type CookieConsentCtx = {
    consent: CookieConsent;
    openPreferences: () => void;
};

// ─── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "arthea-cookie-consent";

const DEFAULT_CONSENT: CookieConsent = {
    necessary: true,
    analytics: false,
    marketing: false,
    decided: false,
};

function loadConsent(): CookieConsent | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as CookieConsent;
    } catch {
        return null;
    }
}

function saveConsent(c: CookieConsent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CookieConsentContext = createContext<CookieConsentCtx | null>(null);

export function useCookieConsent() {
    const ctx = useContext(CookieConsentContext);
    if (!ctx) throw new Error("useCookieConsent must be used inside CookieConsentProvider");
    return ctx;
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
    checked,
    onChange,
    disabled,
    label,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
    label: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#606958] focus:ring-offset-2 ${
                checked ? "bg-[#606958]" : "bg-[#BEB2A4]"
            } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        >
            <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${
                    checked ? "translate-x-5" : "translate-x-0.5"
                }`}
            />
        </button>
    );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted]       = useState(false);
    const [consent, setConsent]       = useState<CookieConsent>(DEFAULT_CONSENT);
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal]   = useState(false);
    const [draft, setDraft]           = useState({ analytics: false, marketing: false });
    const modalRef                    = useRef<HTMLDivElement>(null);

    // Hydrate from localStorage after mount to avoid SSR mismatch
    useEffect(() => {
        setMounted(true);
        const stored = loadConsent();
        if (stored?.decided) {
            setConsent(stored);
        } else {
            setShowBanner(true);
        }
    }, []);

    // Escape key closes modal
    useEffect(() => {
        if (!showModal) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setShowModal(false); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [showModal]);

    // Focus first element in modal when it opens
    useEffect(() => {
        if (!showModal) return;
        const first = modalRef.current?.querySelector<HTMLElement>(
            'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        first?.focus();
    }, [showModal]);

    // Prevent body scroll when modal is open — iOS-safe (position: fixed approach)
    useEffect(() => {
        if (!showModal) return;
        const scrollY = window.scrollY;
        document.body.style.cssText = `position:fixed;top:-${scrollY}px;left:0;right:0;overflow-y:scroll;`;
        return () => {
            document.body.style.cssText = "";
            window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
        };
    }, [showModal]);

    const commit = (c: CookieConsent) => {
        setConsent(c);
        saveConsent(c);
        setShowBanner(false);
        setShowModal(false);
    };

    const acceptAll     = () => commit({ necessary: true, analytics: true,  marketing: true,  decided: true });
    const rejectOptional = () => commit({ necessary: true, analytics: false, marketing: false, decided: true });

    const openPreferences = () => {
        const stored = loadConsent();
        setDraft({
            analytics: stored?.analytics ?? consent.analytics,
            marketing: stored?.marketing ?? consent.marketing,
        });
        setShowModal(true);
    };

    const savePreferences = () =>
        commit({ necessary: true, analytics: draft.analytics, marketing: draft.marketing, decided: true });

    const bankerClass =
        "rounded-full px-4 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#606958] focus:ring-offset-1";

    return (
        <CookieConsentContext.Provider value={{ consent, openPreferences }}>
            {children}

            {/* ── Banner ── */}
            {mounted && showBanner && !showModal && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Consentimento de cookies"
                    className="fixed inset-x-0 bottom-0 z-[200] border-t border-[#BEB2A4]/50 bg-white shadow-[0_-4px_32px_rgba(0,0,0,0.07)]"
                >
                    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#606958]">
                                    Sua privacidade é importante
                                </p>
                                <p className="mt-1 text-xs leading-5 text-[#87847D]">
                                    Utilizamos cookies para melhorar sua experiência, analisar o tráfego e
                                    personalizar conteúdo. Você pode aceitar todos, recusar os opcionais ou
                                    ajustar suas preferências. Veja nossa{" "}
                                    <Link
                                        href="/privacidade"
                                        className="underline decoration-[#AB8E66]/50 hover:text-[#606958] transition-colors"
                                    >
                                        política de privacidade
                                    </Link>
                                    .
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
                                <button
                                    type="button"
                                    onClick={openPreferences}
                                    className="text-xs font-medium text-[#AB8E66] underline decoration-[#AB8E66]/40 hover:text-[#606958] transition-colors focus:outline-none focus:ring-2 focus:ring-[#606958] focus:ring-offset-1 rounded"
                                >
                                    Gerenciar preferências
                                </button>
                                <button
                                    type="button"
                                    onClick={rejectOptional}
                                    className={`${bankerClass} border border-[#606958]/40 text-[#606958] hover:bg-[#606958]/8`}
                                >
                                    Recusar opcionais
                                </button>
                                <button
                                    type="button"
                                    onClick={acceptAll}
                                    className={`${bankerClass} bg-[#606958] text-white hover:bg-[#4f5748]`}
                                >
                                    Aceitar todos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal de preferências ── */}
            {mounted && showModal && (
                <div
                    className="fixed inset-0 z-[300] flex items-end justify-center p-4 sm:items-center"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Gerenciar preferências de cookies"
                >
                    {/* Backdrop — sem backdrop-blur para evitar artefato GPU no iOS */}
                    <button
                        type="button"
                        aria-label="Fechar preferências"
                        tabIndex={-1}
                        onClick={() => setShowModal(false)}
                        className="absolute inset-0 bg-slate-950/60"
                    />

                    {/* Card */}
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-lg rounded-3xl bg-[#EEEBE6] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)] sm:p-8"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#AB8E66]">
                                    Privacidade
                                </p>
                                <h2 className="mt-1 text-lg font-semibold text-[#606958]">
                                    Preferências de cookies
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                aria-label="Fechar"
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#BEB2A4] text-[#606958] transition hover:bg-[#BEB2A4]/40 focus:outline-none focus:ring-2 focus:ring-[#606958]"
                            >
                                <IoClose size={16} />
                            </button>
                        </div>

                        <p className="mt-3 text-xs leading-5 text-[#87847D]">
                            Escolha quais cookies aceitar. Os cookies necessários são essenciais
                            para o funcionamento do site e não podem ser desativados.
                        </p>

                        {/* Categorias */}
                        <div className="mt-5 space-y-3">

                            {/* Necessários */}
                            <div className="rounded-2xl border border-[#BEB2A4]/50 bg-white/60 p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold text-[#606958]">
                                            Cookies necessários
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-[#87847D]">
                                            Essenciais para segurança, autenticação e funcionamento básico do site.
                                            Não podem ser desativados.
                                        </p>
                                    </div>
                                    <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
                                        <Toggle
                                            checked={true}
                                            onChange={() => {}}
                                            disabled
                                            label="Cookies necessários — sempre ativos"
                                        />
                                        <span className="text-[10px] font-medium text-[#AB8E66]">
                                            Sempre ativo
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Análise */}
                            <div className="rounded-2xl border border-[#BEB2A4]/50 bg-white/60 p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold text-[#606958]">
                                            Cookies de análise
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-[#87847D]">
                                            Ajudam a entender como os visitantes interagem com o site,
                                            como páginas mais acessadas e tempo de sessão (ex: Google Analytics).
                                        </p>
                                    </div>
                                    <div className="shrink-0 pt-0.5">
                                        <Toggle
                                            checked={draft.analytics}
                                            onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
                                            label="Cookies de análise"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Marketing */}
                            <div className="rounded-2xl border border-[#BEB2A4]/50 bg-white/60 p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold text-[#606958]">
                                            Cookies de marketing
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-[#87847D]">
                                            Usados para exibir anúncios relevantes e medir o desempenho de
                                            campanhas publicitárias (ex: Meta Pixel, Google Ads).
                                        </p>
                                    </div>
                                    <div className="shrink-0 pt-0.5">
                                        <Toggle
                                            checked={draft.marketing}
                                            onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
                                            label="Cookies de marketing"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={rejectOptional}
                                className="rounded-full border border-[#606958]/40 px-5 py-2.5 text-xs font-semibold text-[#606958] transition hover:bg-[#606958]/8 focus:outline-none focus:ring-2 focus:ring-[#606958] focus:ring-offset-1"
                            >
                                Recusar opcionais
                            </button>
                            <button
                                type="button"
                                onClick={acceptAll}
                                className="rounded-full border border-[#606958]/40 px-5 py-2.5 text-xs font-semibold text-[#606958] transition hover:bg-[#606958]/8 focus:outline-none focus:ring-2 focus:ring-[#606958] focus:ring-offset-1"
                            >
                                Aceitar todos
                            </button>
                            <button
                                type="button"
                                onClick={savePreferences}
                                className="rounded-full bg-[#606958] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#4f5748] focus:outline-none focus:ring-2 focus:ring-[#606958] focus:ring-offset-1"
                            >
                                Salvar preferências
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </CookieConsentContext.Provider>
    );
}
