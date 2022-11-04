import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        recived(state, actions) {
            state.entities = actions.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(element => element.id === action.payload.id);
            state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload };
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id
            );
        },
        taskRequested(state) {
            state.isLoading = true;
        },
        taskRequestFailed(state) {
            state.isLoading = false;
        },
        addTask(state, action) {
            // console.log("task.js - add task", state)
            // console.log("state.entities", state.entities)
            // console.log("payloads", action.payload)
            state.entities.push(action.payload)
            state.isLoading = false;
        }
    }
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestFailed, addTask } = actions;

export const createTask = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.createTask();
        dispatch(addTask(data))
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message))
    }
}

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message))
    }
}


export const completedTask = (id) => (dispatch, getState) => {
    dispatch(update({
        id: id,
        completed: true
    }));
}

export const titleChanged = (id) => {
    return update({
        id: id,
        title: `new title for ${id}`
    });
}

export const taskDeleted = (id) => {
    return remove({ id })
}

export const getTasks = () => state => state.tasks.entities;
export const getTaskLoadingStatus = () => state => state.tasks.isLoading;

export default taskReducer;