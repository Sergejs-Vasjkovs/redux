import * as actionTypes from "./actionsTypes";

export const taskCompleted = (id) => {
    return {
        type: actionTypes.taskUptadet,
        payload: {
            id: id,
            completed: true
        }
    };
}

export const titleChanged = (id) => {
    return {
        type: actionTypes.taskUptadet,
        payload: {
            id: id,
            title: `new title for ${id}`
        }
    };
}

export const taskDeleted = (id) => {
    return {
        type: actionTypes.taskDeleted,
        payload: {
            id: id
        }
    };
}