import axios from "axios";

export const SIGN_UP_QUERY = ({ name, municipality, email, password }) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/usuarios/`, {
        nombre: name,
        municipio: municipality,
        correo: email,
        password: password,
    });
};

export const LOGIN_QUERY = ({ email, password }) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/auth/login/`, {
        correo: email,
        password: password,
    });
};
