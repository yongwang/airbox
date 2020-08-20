
export const TASK_MARKER_HOVERED = "task-marker-hovered";
export const TASKS_ADDED = "tasks-added";
export const TASK_EDITED = 'task-edited';
export const TASK_DELETED = 'task-deleted';

export function taskMarkerHovered(isHovered, index)
{
    return {
        type: TASK_MARKER_HOVERED,
        isHovered,
        index
    }
}

export function addTasks(tasks)
{
    return {
        type: TASKS_ADDED,
        tasks
    }
}

export function editTaskAction(task)
{
    return {
        type: TASK_EDITED,
        task
    }
}

export function deleteTaskAction(task)
{
    return {
        type: TASK_DELETED,
        task
    }
}