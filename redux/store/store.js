import { createStore, combineReducers, compose } from "redux";

import { authReducer } from "../reducers/authReducer";
import { currentPlaceReducer } from "../reducers/currentPlaceReducer";
import { filterByReducer } from "../reducers/filterByReducer";
import { uiReducer } from "../reducers/uiReducer";

//---------REDUX-DEV-TOOLS---------
// const composeEnhancers =
//     (typeof window !== "undefined" &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//             trace: true, // (action) => { return ‘trace as string’; }
//             traceLimit: 25,
//         })) ||
//     compose;

const reducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    filterBy: filterByReducer,
    currentPlace: currentPlaceReducer,
});

export const store = createStore(reducers);
