import React, {useCallback, useContext, useState} from "react";
import {TaskContext} from "../provider/TaskProvider";
import useSubscription from "../subscription/useSubscription";
import {taskMarkerHovered} from "../provider/TaskActions";
import '../style/TasksListStyle.css';
import TASKS_API from "../network/NetworkRequestResponse";
import {Link} from "react-router-dom";

const TaskItemComponent = ({task, index}) =>
{
    const {dispatch, subscribe} = useContext(TaskContext);

    const isTaskMarkerHovered = useSubscription(subscribe, state => state.tasks[index]?.isHovered, false);
    const priority = useSubscription(subscribe, state => state.tasks[index]?.priority, task.priority);

    const onMouseOverHandler = useCallback(() => dispatch(taskMarkerHovered(true, index)) ,[dispatch, index]);
    const onMouseLeaveHandler = useCallback(() => dispatch(taskMarkerHovered(false, index)) ,[dispatch, index]);

    const [staticMode, setStaticMode] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [editedPriority, setPriority] = useState(priority);

    const staticClickHandler = useCallback(() => setStaticMode(!staticMode), [setStaticMode,staticMode]);
    const editButtonHandler = useCallback(() => setEditMode(!editMode),[editMode, setEditMode]);
    const submitButtonHandler = useCallback(() => {
        const tempTask = {...task};
        tempTask.priority = editedPriority;
        TASKS_API.TASK.put(dispatch, tempTask);
        setEditMode(false);
    }, [dispatch, task, editedPriority]);
    const deleteButtonHandler = useCallback(()=> TASKS_API.TASK.delete(dispatch, task), [dispatch, task]);

    return (
        <div className={`taskItem task_${task.AbxTaskId} ${isTaskMarkerHovered ? 'hovered' : ''}`}
             onMouseOver={onMouseOverHandler}
             onMouseLeave={onMouseLeaveHandler}
             onClick={staticClickHandler}
        >
            <div><span>AbxTaskId: </span><span><Link to={`/tasks/${task.AbxTaskId}`}>{task.AbxTaskId}</Link></span></div>
            <div><span>OrganisationTaskId: </span><span>{task.OrganisationTaskId}</span></div>
            <div><span>OrganisationId: </span><span><Link to={`/tasks/organisations/${task.OrganisationId}`}>{task.OrganisationId}</Link></span></div>
            {
                (isTaskMarkerHovered || staticMode) &&
                <>
                    { editMode ? <input type='text' placeholder={editedPriority} onInput={(e) => setPriority(e.target.value)}/> : <div><span>Priority: </span><span>{priority}</span></div>}
                    <div><span>Task Status: </span><span>{task.taskStatus}</span></div>
                    <div><span>Assigned To: </span><span>{task.assignedto}</span></div>
                    <div><span>Timestamp: </span><span>{task.timestamp}</span></div>
                    <div><span>Latitude: </span><span>{task.latitude}</span></div>
                    <div><span>Longitude: </span><span>{task.longitude}</span></div>
                    <div><span>Task Summary: </span><span>{task.tasksummary}</span></div>
                    <div><span>Task Description: </span><span>{task.taskdescription}</span></div>
                    {!editMode && <button onClick={editButtonHandler}>EDIT</button>}
                    {editMode && <>
                            <button onClick={submitButtonHandler}>SUBMIT</button>
                            <button onClick={editButtonHandler}>CANCEL</button>
                            <button onClick={deleteButtonHandler}> DELETE </button>
                        </>
                    }
                </>
            }
        </div>
    );
}

export default TaskItemComponent;