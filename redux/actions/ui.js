import { types } from "../types/types";

export const showAuth = () => ({
    type: types.uiShowAuth,
});

export const hideAuth = () => ({
    type: types.uiHideAuth,
});

export const hideMenu = () => ({
    type: types.uiHideMenu,
});

export const showMenu = () => ({
    type: types.uiShowMenu,
});
