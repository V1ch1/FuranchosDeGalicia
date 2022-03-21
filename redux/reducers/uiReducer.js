import { types } from "../types/types";

export const uiReducer = (
    state = { isVisible: false, isMenuOpen: false },
    action,
) => {
    switch (action.type) {
        case types.uiShowAuth:
            return {
                isMenuOpen: state.isMenuOpen,
                isVisible: true,
            };

        case types.uiHideAuth:
            return {
                isMenuOpen: state.isMenuOpen,
                isVisible: false,
            };

        case types.uiShowMenu:
            return {
                isMenuOpen: true,
                isVisible: state.isVisible,
            };

        case types.uiHideMenu:
            return {
                isMenuOpen: false,
                isVisible: false,
            };

        default:
            return state;
    }
};
