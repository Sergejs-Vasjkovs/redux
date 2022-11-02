export const createStore = (reducer, initialState) => {
    let state = initialState;
    let listeners = [];

    const getState = () => {
        return state;
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }
    }

    const subscribe = (listener) => {
        listeners.push(listener)
    }

    return { getState, dispatch, subscribe }
};
