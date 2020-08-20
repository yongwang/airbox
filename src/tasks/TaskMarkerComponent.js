import React, {useCallback, useContext} from "react";
import {TaskContext} from "../provider/TaskProvider";
import useSubscription from "../subscription/useSubscription";
import {taskMarkerHovered} from "../provider/TaskActions";


const TaskMarkerComponent = ({task, index}) =>
{
    const {dispatch, subscribe} = useContext(TaskContext);

    const isTaskMarkerHovered = useSubscription(subscribe, state => state.tasks[index]?.isHovered, false);
    const priority = useSubscription(subscribe, state => state.tasks[index]?.priority, task.priority);

    const onMouseOverHandler = useCallback(() => dispatch(taskMarkerHovered(true, index)) ,[dispatch, index]);
    const onMouseLeaveHandler = useCallback(() => dispatch(taskMarkerHovered(false, index)) ,[dispatch, index]);

    return (
        <div
            className={`task taskMarker task_${task.AbxTaskId} ${isTaskMarkerHovered ? 'showMore' : ''}`}
            onMouseOver={onMouseOverHandler}
            onMouseLeave={onMouseLeaveHandler}
        >
            <div><span>{task.AbxTaskId}</span></div>
            {
                isTaskMarkerHovered &&
                <>
                    <div><span>OrganisationTaskId</span><span>{task.OrganisationTaskId}</span></div>
                    <div><span>OrganisationId</span><span>{task.OrganisationId}</span></div>
                    <div><span>Priority</span><span>{priority}</span></div>
                    <div><span>Task Status</span><span>{task.taskStatus}</span></div>
                    <div><span>Assigned To</span><span>{task.assignedto}</span></div>
                    <div><span>Timestamp</span><span>{task.timestamp}</span></div>
                    <div><span>Latitude</span><span>{task.latitude}</span></div>
                    <div><span>Longitude</span><span>{task.longitude}</span></div>
                    <div><span>Task Summary</span><span>{task.tasksummary}</span></div>
                    <div><span>Task Description</span><span>{task.taskdescription}</span></div>
                </>
            }
        </div>
    );
}

export default TaskMarkerComponent;