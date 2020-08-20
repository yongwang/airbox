import React from 'react';
import {makeSubscription} from "../subscription/Subscription";
import reducer from "./TaskReducer";

/*
TODO: IF Persistence then can feed into initialState
 */
const TaskProvider = ({ initialState = {}, children }) =>
{
    const subscription = makeSubscription(reducer, initialState);

    return (
        <TaskContext.Provider value={subscription}>
            {children}
        </TaskContext.Provider>
    );
};

export const TaskContext = React.createContext(null);
export default TaskProvider;