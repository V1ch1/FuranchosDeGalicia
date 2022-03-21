import {
    CHANGE_PASSWORD_QUERY,
    CHANGE_USER_INFO_QUERY,
    GET_USER_INFO_QUERY,
    POST_COMMENT_QUERY,
    UPDATE_FAVORITES_QUERY,
} from "./schema";

export async function getUserInfo(params) {
    const response = await GET_USER_INFO_QUERY(params).catch(({ response }) => {
        if (response.data.errors) {
            return { error: response.data.errors[0].msg };
        }
        return response.data;
    });

    return response;
}

export async function changeUserInfo(params) {
    const response = await CHANGE_USER_INFO_QUERY(params).catch(
        ({ response }) => {
            if (response.data.errors) {
                return { error: response.data.errors[0].msg };
            }
            return response.data;
        },
    );

    return response;
}

export async function changePassword(params) {
    const response = await CHANGE_PASSWORD_QUERY(params).catch(
        ({ response }) => {
            if (response.data.errors) {
                return { error: response.data.errors[0].msg };
            }
            return response.data;
        },
    );

    return response;
}

export async function updateFavorites(params) {
    const { data, status } = await UPDATE_FAVORITES_QUERY(params).catch(
        ({ response }) => {
            if (response.data.errors) {
                return { error: response.data.errors[0].msg };
            }
            return { status };
        },
    );

    return { status };
}

export async function postComment(params) {
    const response = await POST_COMMENT_QUERY(params).catch(({ response }) => {
        return { error: "Something went wrong" };
    });

    return response;
}
