export const makeSubscription = (rootReducer, initialState = null) => {
    let state = initialState;
    let listeners = [];
    let uniqueId = 0;
    let listenerIndex = 0;

    const getState = () => state;

    const dispatch = action => {
        state = rootReducer(state, action);

        while (listenerIndex < listeners.length) {
            const wrapper = listeners[listenerIndex];
            wrapper.listener(state);
            listenerIndex++;
        }

        listenerIndex = 0;
    };

    const subscribe = (listener) => {
        uniqueId++;
        const obj = {uniqueId, listener};
        listeners.push(obj);

        return () => {
            for (let i = 0; i < listeners.length; i++) {
                const wrapper = listeners[i];
                if (wrapper.uniqueId === obj.uniqueId) {
                    listeners.splice(i, 1);
                    if (listenerIndex > i) {
                        listenerIndex--;
                    }
                }
            }
        };
    };

    const destroy = () => {
        listeners.clear();
        listeners = null;
        state = null;
    }

    dispatch({});

    return {getState, dispatch, subscribe, destroy};
}