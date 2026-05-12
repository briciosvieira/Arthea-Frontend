"use client";

import { useEffect } from "react";
import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoHelpCircleOutline } from "react-icons/io5";

type FeedbackVariant = "error" | "success" | "confirm";

interface FeedbackModalProps {
    open: boolean;
    title: string;
    message: string;
    variant?: FeedbackVariant;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    onConfirm?: () => void;
    onClose: () => void;
}

const variantStyles: Record<FeedbackVariant, { icon: typeof IoAlertCircleOutline; iconClassName: string; buttonClassName: string; }> = {
    error: {
        icon: IoAlertCircleOutline,
        iconClassName: "text-rose-500",
        buttonClassName: "bg-rose-600 hover:bg-rose-500 focus-visible:outline-rose-300",
    },
    success: {
        icon: IoCheckmarkCircleOutline,
        iconClassName: "text-emerald-500",
        buttonClassName: "bg-emerald-600 hover:bg-emerald-500 focus-visible:outline-emerald-300",
    },
    confirm: {
        icon: IoHelpCircleOutline,
        iconClassName: "text-amber-500",
        buttonClassName: "bg-amber-500 hover:bg-amber-400 focus-visible:outline-amber-200 text-slate-950",
    },
};

export function FeedbackModal({
    open,
    title,
    message,
    variant = "error",
    confirmLabel = "Fechar",
    cancelLabel = "Cancelar",
    loading = false,
    onConfirm,
    onClose,
}: FeedbackModalProps) {
    useEffect(() => {
        if (!open) {
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !loading) {
                onClose();
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [loading, onClose, open]);

    if (!open) {
        return null;
    }

    const { icon: Icon, iconClassName, buttonClassName } = variantStyles[variant];
    const isConfirm = variant === "confirm";

    return (
        <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
            onClick={() => {
                if (!loading) {
                    onClose();
                }
            }}
            role="presentation"
        >
            <div
                className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#f6f1e8] p-6 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.35)]"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="feedback-modal-title"
            >
                <div className="flex items-start gap-4">
                    <div className={`mt-1 shrink-0 ${iconClassName}`}>
                        <Icon size={34} />
                    </div>

                    <div className="min-w-0">
                        <h2 id="feedback-modal-title" className="text-xl font-semibold leading-tight">
                            {title}
                        </h2>
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                    {isConfirm && (
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {cancelLabel}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onConfirm ?? onClose}
                        disabled={loading}
                        className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${buttonClassName}`}
                    >
                        {loading ? "Aguarde..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
