import { types } from "../types/types";

export const login = (user, token) => {
    return {
        type: types.login,
        payload: {
            user,
            token,
        },
    };
};

export const logout = () => ({
    type: types.logout,
});
