import { types } from "../types/types";

export const setCurrentPlace = (place) => ({
    type: types.placesSetCurrentPlace,
    payload: {
        ...place,
    },
});

export const filterByMunicipality = (value) => ({
    type: types.placesfilterByMunicipality,
    payload: {
        search: "",
        municipality: value,
    },
});

export const searchPlace = (search) => ({
    type: types.placesSearchPlace,
    payload: {
        filter: "",
        search,
    },
});
