"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { FeedbackModal } from "@/components/ui/feedback-modal";

type FeedbackVariant = "error" | "success" | "confirm";

interface FeedbackOptions {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

interface FeedbackState extends FeedbackOptions {
    open: boolean;
    variant: FeedbackVariant;
    loading: boolean;
    onConfirm?: (() => void | Promise<void>) | null;
}

interface FeedbackContextValue {
    showError: (options: FeedbackOptions) => void;
    showSuccess: (options: FeedbackOptions) => void;
    showConfirm: (options: FeedbackOptions & { onConfirm: () => void | Promise<void> }) => void;
    closeFeedback: () => void;
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

const initialState: FeedbackState = {
    open: false,
    title: "",
    message: "",
    variant: "error",
    loading: false,
    onConfirm: null,
    confirmLabel: "Fechar",
    cancelLabel: "Cancelar",
};

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
    const [feedback, setFeedback] = useState<FeedbackState>(initialState);

    const closeFeedback = useCallback(() => {
        setFeedback(initialState);
    }, []);

    const showError = useCallback((options: FeedbackOptions) => {
        setFeedback({
            open: true,
            variant: "error",
            loading: false,
            onConfirm: null,
            confirmLabel: options.confirmLabel ?? "Fechar",
            cancelLabel: options.cancelLabel ?? "Cancelar",
            title: options.title,
            message: options.message,
        });
    }, []);

    const showSuccess = useCallback((options: FeedbackOptions) => {
        setFeedback({
            open: true,
            variant: "success",
            loading: false,
            onConfirm: null,
            confirmLabel: options.confirmLabel ?? "Continuar",
            cancelLabel: options.cancelLabel ?? "Cancelar",
            title: options.title,
            message: options.message,
        });
    }, []);

    const showConfirm = useCallback((options: FeedbackOptions & { onConfirm: () => void | Promise<void> }) => {
        setFeedback({
            open: true,
            variant: "confirm",
            loading: false,
            onConfirm: options.onConfirm,
            confirmLabel: options.confirmLabel ?? "Confirmar",
            cancelLabel: options.cancelLabel ?? "Cancelar",
            title: options.title,
            message: options.message,
        });
    }, []);

    const handleConfirm = useCallback(async () => {
        if (!feedback.onConfirm) {
            closeFeedback();
            return;
        }

        try {
            setFeedback((current) => ({ ...current, loading: true }));
            await feedback.onConfirm();
            setFeedback(initialState);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Ocorreu um erro inesperado.";

            setFeedback({
                open: true,
                variant: "error",
                loading: false,
                onConfirm: null,
                confirmLabel: "Fechar",
                cancelLabel: "Cancelar",
                title: "Não foi possível concluir a ação",
                message,
            });
        }
    }, [closeFeedback, feedback.onConfirm]);

    const contextValue = useMemo<FeedbackContextValue>(() => ({
        showError,
        showSuccess,
        showConfirm,
        closeFeedback,
    }), [closeFeedback, showConfirm, showError, showSuccess]);

    return (
        <FeedbackContext.Provider value={contextValue}>
            {children}
            <FeedbackModal
                open={feedback.open}
                title={feedback.title}
                message={feedback.message}
                variant={feedback.variant}
                confirmLabel={feedback.confirmLabel}
                cancelLabel={feedback.cancelLabel}
                loading={feedback.loading}
                onConfirm={feedback.onConfirm ? handleConfirm : undefined}
                onClose={closeFeedback}
            />
        </FeedbackContext.Provider>
    );
}

export function useFeedback() {
    const context = useContext(FeedbackContext);

    if (!context) {
        throw new Error("useFeedback deve ser usado dentro de FeedbackProvider");
    }

    return context;
}
