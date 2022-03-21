import axios from "axios";

export const GET_USER_INFO_QUERY = ({ token }) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/usuarios/`, {
        headers: { Authorization: token },
    });
};

export const CHANGE_USER_INFO_QUERY = ({
    userId,
    name,
    municipality,
    email,
    token,
}) => {
    return axios.put(
        `${process.env.NEXT_PUBLIC_API_SERVER}/usuarios/${userId}/`,
        {
            nombre: name,
            municipio: municipality,
            correo: email,
        },
        {
            headers: { Authorization: token },
        },
    );
};

export const CHANGE_PASSWORD_QUERY = ({
    userId,
    currentPassword,
    newPassword,
    token,
}) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER}/usuarios/change_password/`,
        {
            id: userId,
            old_password: currentPassword,
            password: newPassword,
        },
        {
            headers: { Authorization: token },
        },
    );
};

export const UPDATE_FAVORITES_QUERY = ({ userId, token, placeId }) => {
    return axios.put(
        `${process.env.NEXT_PUBLIC_API_SERVER}/usuarios/favoritos`,
        {
            id: userId,
            lugarId: placeId,
        },
        {
            headers: { Authorization: token },
        },
    );
};

export const POST_COMMENT_QUERY = ({
    userId,
    placeId,
    description,
    title,
    rate,
    nickname,
    token,
}) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER}/usuarios/post_comment/`,
        {
            id: userId,
            placeId,
            description,
            title,
            rate,
            nickname,
        },
        {
            headers: { Authorization: token },
        },
    );
};
