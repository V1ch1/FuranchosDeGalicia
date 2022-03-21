import axios from "axios";

export const GET_PLACES_LIST_QUERY = () => {
    return axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_SERVER}`,
    });
};
