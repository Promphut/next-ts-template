import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "../ducks";

export const makeStore = (initialState = {}) => {
    const reducer = combineReducers({
        ...reducers,
    });

    const bindMiddleware = (middleware: any) => {
        if (process.env.NODE_ENV !== "production") {
            const { composeWithDevTools } = require("redux-devtools-extension");
            return composeWithDevTools(applyMiddleware(...middleware));
        }
        return applyMiddleware(...middleware);
    };

    const store = createStore(
        reducer,
        initialState,
        bindMiddleware([thunkMiddleware])
    );

    return store;
};
