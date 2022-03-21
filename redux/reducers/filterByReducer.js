import { types } from "../types/types";

const initialState = { search: "", filterByMunicipality: "" };

export const filterByReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.placesfilterByMunicipality:
            return {
                ...action.payload,
            };

        case types.placesSearchPlace:
            return {
                ...action.payload,
            };

        default:
            return state;
    }
};
