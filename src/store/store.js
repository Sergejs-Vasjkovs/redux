import { createStore } from "redux";
import { tastReducer } from "./taskReduser";

const initialState = [
    { id: 1, title: "Tast 1", completed: false },
    { id: 2, title: "Tast 2", completed: false }
]

export const initiateStore = () => {
    return createStore(tastReducer, initialState);
}