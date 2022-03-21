import { types } from "../types/types";

export const authReducer = (state = { isAuthenticated: false }, action) => {
    switch (action.type) {
        case types.login:
            return {
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
            };

        case types.logout:
            return {
                isAuthenticated: false,
            };

        default:
            return state;
    }
};
