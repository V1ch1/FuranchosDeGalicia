import { LOGIN_QUERY, RESET_PASSWORD_QUERY, SIGN_UP_QUERY } from "./schema";

export function signUp(params) {
    const response = SIGN_UP_QUERY(params).catch(({ response }) => {
        if (response.data.errors) {
            return { error: response.data.errors[0].msg };
        }
        return response.data;
    });

    return response;
}

export async function signIn(params) {
    const response = await LOGIN_QUERY(params).catch(({ response }) => {
        if (response.data.errors) {
            return { error: response.data.errors[0].msg };
        }
        return response.data;
    });

    return response;
}

export async function resetPassword(params) {
    const response = await RESET_PASSWORD_QUERY(params).catch(
        ({ response }) => {
            if (response.data.errors) {
                return { error: response.data.errors[0].msg };
            }
            return response.data;
        },
    );

    return response;
}
