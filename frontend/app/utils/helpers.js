export const closeOverlay = (router) => {
    if (router?.back) {
        router.back();
        return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
        window.history.back();
    }
};
