import { getUserId } from "./auth";

export const closeOverlay = (router) => {
    if (router?.back) {
        router.back();
        return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
        window.history.back();
    }
};

export const userAvatarInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
    } else {
        return (
            names[0].charAt(0).toUpperCase() +
            names[names.length - 1].charAt(0).toUpperCase()
            
        );
    }
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
