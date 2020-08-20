import React from "react";
import TaskItemComponent from "./TaskItemComponent";
import TaskForm from "./TaskForm";

const TaskBreakDownComponent = ({tasks}) => {
    let i = 0;
    return (
        <div className={'taskBreakDownList'}>
            {Object.values(tasks).map(task => <TaskItemComponent key={task.AbxTaskId} index={i++} task={task}/>)}
            <TaskForm/>
        </div>
    );
}

export default TaskBreakDownComponent;