export const closeOverlay = (router) => {
    if (router?.back) {
        router.back();
        return;
    }

    if (typeof window !== "undefined" && window.history.length > 0) {
        window.history.back();
    }
};
