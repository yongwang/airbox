import React, {useCallback, useContext, useState} from 'react';
import TASKS_API from "../network/NetworkRequestResponse";
import {TaskContext} from "../provider/TaskProvider";


/*
    TODO:
     CHANGE PROPOSAL: FORM BUILDER (create a form builder to:)
        - take in an object as config, to build a form based on input
        - based on config create state to use for building data-binding for post method
        - take in url for post request
        - optimisation point: use reducer to handle each input change for one object - minimise closures
 */
const TaskForm = () =>
{
    const {dispatch} = useContext(TaskContext);

    const [showForm, setFromShown] = useState(false);
    const showFormHandler = useCallback(() => setFromShown(!showForm), [showForm, setFromShown]);

    const [abxTaskIdInput, setAbxTaskIdInput] = useState('');
    const [organisationTaskIdInput, setOrganisationTaskIdInput] = useState('');
    const [organisationIdInput, setOrganisationIdInput] = useState('');
    const [priorityInput, setPriorityInput] = useState('');
    const [taskStatusInput, setTaskStatusInput] = useState('');
    const [assignedToInput, setAssignedToInput] = useState('');
    const [timestampInput, setTimestampInput] = useState('');
    const [latitudeInput, setLatitudeInput] = useState('');
    const [longitudeInput, setLongitudeInput] = useState('');
    const [taskSummaryInput, setTaskSummaryInput] = useState('');
    const [taskDescriptionInput, setTaskDescriptionInput] = useState('');

    const submitHandler = useCallback((e) =>
    {
        e.preventDefault();
        const data = {
            AbxTaskId: abxTaskIdInput,
            OrganisationTaskId: organisationTaskIdInput,
            OrganisationId: organisationIdInput,
            priority: priorityInput,
            taskStatus: taskStatusInput,
            assignedto: assignedToInput,
            timestamp: timestampInput,
            latitude: latitudeInput,
            longitude: longitudeInput,
            tasksummary: taskSummaryInput,
            taskdescription: taskDescriptionInput
        }

        TASKS_API.TASK.post(dispatch, data);

    }, [
        abxTaskIdInput,
        organisationTaskIdInput,
        organisationIdInput,
        priorityInput,
        taskStatusInput,
        assignedToInput,
        timestampInput,
        latitudeInput,
        longitudeInput,
        taskSummaryInput,
        taskDescriptionInput,
        dispatch
    ]);

    return (
    <>
        {
            showForm &&
            <>
                <form onSubmit={submitHandler}>
                    <input type='text' value={abxTaskIdInput} onChange={(e) => setAbxTaskIdInput(e.target.value)}
                           placeholder='ABX Task ID'/>
                    <input type='text' value={organisationTaskIdInput}
                           onChange={(e) => setOrganisationTaskIdInput(e.target.value)} placeholder='Organisation Task ID'/>
                    <input type='text' value={organisationIdInput}
                           onChange={(e) => setOrganisationIdInput(e.target.value)}
                           placeholder='Organisation ID'/>
                    <input type='text' value={priorityInput} onChange={(e) => setPriorityInput(e.target.value)}
                           placeholder='Priority'/>
                    <input type='text' value={taskStatusInput} onChange={(e) => setTaskStatusInput(e.target.value)}
                           placeholder='Status'/>
                    <input type='text' value={assignedToInput} onChange={(e) => setAssignedToInput(e.target.value)}
                           placeholder='Vehicle ID'/>
                    <input type='text' value={timestampInput} onChange={(e) => setTimestampInput(e.target.value)}
                           placeholder='Date'/>
                    <input type='text' value={latitudeInput} onChange={(e) => setLatitudeInput(e.target.value)}
                           placeholder='Latitude'/>
                    <input type='text' value={longitudeInput} onChange={(e) => setLongitudeInput(e.target.value)}
                           placeholder='Longitude'/>
                    <input type='text' value={taskSummaryInput} onChange={(e) => setTaskSummaryInput(e.target.value)}
                           placeholder='Summary'/>
                    <input type='text' value={taskDescriptionInput}
                           onChange={(e) => setTaskDescriptionInput(e.target.value)}
                           placeholder='Description'/>
                    <input type='submit' value='submit'/>
                </form>
                <button onClick={showFormHandler}>CANCEL</button>
            </>
        }
        {!showForm &&
        <button onClick={showFormHandler}>ADD TASK</button>
        }
    </>
    )
}
export default TaskForm;