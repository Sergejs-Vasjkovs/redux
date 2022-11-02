import { taskUptadet, taskDeleted } from "./actionsTypes";

export const tastReducer = (state = [], action) => {
    switch (action.type) {
        case taskUptadet: {
            const newArray = [...state]
            const elementIndex = newArray.findIndex(element => element.id === action.payload.id);
            newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
            return newArray;
        };
        case taskDeleted: {
            const newArray = [...state]
            return newArray.filter(element => element.id !== action.payload.id);
        };
        default:
            return state;
    }
}