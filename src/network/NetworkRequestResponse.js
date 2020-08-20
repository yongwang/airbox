import API from "../constants/NetworkConstants";
import {addTasks, deleteTaskAction, editTaskAction} from "../provider/TaskActions";

/*
/tasks
/tasks/organisations/:organisationId
/tasks/organisations/:organisationId/:callerId
/tasks/organisations/:organisationId/:callerId/latest
/tasks/:abxTaskId
 */
const fetchTasks = async (dispatch, pathname) => {
    try {
        const response = await fetch(API.BASE_URL + pathname);
        let result = await response.json();

        result = Array.isArray(result) ? result : [result];
        dispatch(addTasks(result));
    } catch (e) {
        console.log("E:",e);
    }
}
/*
/tasks
 */
const postTask = async (dispatch, task) =>
{
    try {
        const response = await fetch(API.BASE_URL + '/tasks', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        if(response.status === 201) {
            dispatch(addTasks([task]));
        }
    } catch (e){
        console.log("E:", e);
    }
}

/*
/tasks/:abxTaskId
 */
const editTask = async (dispatch, task) =>
{
    try {
        const response = await fetch(API.BASE_URL + '/tasks/' + task.AbxTaskId, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        if(response.status === 201) {
            dispatch(editTaskAction(task));
        }
    } catch (e){
        console.log("E:", e);
    }
}

/*
/tasks/:abxTaskId
 */
const deleteTask = async (dispatch, task) =>
{
    try {
        const response = await fetch(API.BASE_URL + '/tasks/' + task.AbxTaskId, {
            method: "DELETE",
        });
        if(response.status === 204) {
            dispatch(deleteTaskAction(task));
        }
    } catch (e){
        console.log("E:", e);
    }
}


const TASKS_API = {
    TASK: {
        get: fetchTasks,
        post: postTask,
        put: editTask,
        delete: deleteTask
    }
}

export default TASKS_API;