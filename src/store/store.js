import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { logger } from "../middleware/logger";
import errorReduser from "./errors";
import taskReducer from "./task";

const rootReduser = combineReducers({
    errors: errorReduser,
    tasks: taskReducer
})

const createStore = () => {
    return configureStore({
        reducer: rootReduser,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production"
    })
}

export default createStore;