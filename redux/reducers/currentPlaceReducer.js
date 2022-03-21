import { types } from "../types/types";

export const currentPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case types.placesSetCurrentPlace:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};
