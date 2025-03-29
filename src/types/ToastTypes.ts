export type NotificationType = "success" | "error" | "info";

export interface NotificationProps {
    type: NotificationType;
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export interface ToastNotificationProps {
    message: string;
    delay?: number;
    showToast: boolean;
    onClose: () => void;
}

export interface ToastState {
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
    showToast: (message: string, type?: "success" | "error" | "info") => void;
    hideToast: () => void;
}