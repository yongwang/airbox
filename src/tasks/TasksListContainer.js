import React, {useContext, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import TaskMapComponent from "./TaskMapComponent";
import TaskBreakDownComponent from "./TaskBreakDownComponent";
import {TaskContext} from "../provider/TaskProvider";
import useSubscription from "../subscription/useSubscription";
/*
TODO: Use SASS as an alternative
 */
import '../style/TasksListStyle.css';
import TASKS_API from "../network/NetworkRequestResponse";

/*
    TODO:
     CHANGE PROPOSAL: CACHE (utilise already retrieved values for sub path queries:)
        - possible to query against higher level data retrievals:
            > i.e. if /tasks is retrieved...
            > ... then ... if /tasks/organisations/{organisationId} is requested ...
            > query result from /tasks
        - double check that no new results will be missed in cached subset querying
        * optimisation boost to prevent unnecessary round trips
        * can be utilised offline
        * pave the way for local persistence
     CHANGE PROPOSAL: REACT TABLE (build custom generic table component or import one)
        - custom generic table for use with scroll panes that will lazy load data
           * current tables are overly verbose
*/

const TasksListContainer = () =>
{
    const {pathname} = useLocation();
    const {subscribe, dispatch, getState} = useContext(TaskContext);

    const tasks = useSubscription(subscribe, state => state.tasks, getState().tasks);

    useEffect(() => {

        /*
        TODO: add loading and error states via hook;
         */

        TASKS_API.TASK.get(dispatch, pathname);

    }, [dispatch, pathname]);

    return (<div className='tasksList'>
        <div className={'TaskMap'}>
            <TaskMapComponent tasks={tasks}/>
        </div>
        <div className={'TaskBreakDown'}>
            <TaskBreakDownComponent tasks={tasks}/>
        </div>

    </div>);
};
export default TasksListContainer;
