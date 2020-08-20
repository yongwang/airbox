const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*"); // update to match the domain you will make the request from
    next();
});

let tasks = [];

const AbxTaskId = ["ABX_123", "ABX_456", "ABX_789"];
const OrganisationTaskId = ["ORG_TASK_123", "ORG_TASK_456", "ORG_TASK_789"];
const OrganisationId = ["ORG_123", "ORG_456", "ORG_789"];
const priority = ["high", "med", "low"];
const status = ["done", "enroute", "requires help", "pending", "blocked"];
const vehicle = ["VEC_123", "VEC_456", "VEC_789"];
const summary = ["SUM_123", "SUM_456", "SUM_789"];
const descriptions = ["DESC_123", "DESC_456", "DESC_789"];

const randomNumberGenerator = (min, max) => Math.random() * (max - min) + min;

const randomDateGenerator = () => new Date(randomNumberGenerator(new Date('01/01/2000'), new Date()));

const randomLongLatGenerator = () => {
    const long = randomNumberGenerator(-0.46, 0.3).toFixed(3) * 1;
    const lat = randomNumberGenerator(51.25, 51.69).toFixed(3) * 1;
    return {long, lat};
};

const buildDummyTaskData = () =>
{
    for (let i = 0; i < AbxTaskId.length; i++)
    {
        const {long, lat} = randomLongLatGenerator();

        const task = {};
        task.AbxTaskId = AbxTaskId[i];
        task.OrganisationTaskId = OrganisationTaskId[i];
        task.OrganisationId = OrganisationId[i];
        task.priority = priority[i];
        task.taskStatus = status[i];
        task.assignedto = vehicle[i];
        task.timestamp = randomDateGenerator();
        task.latitude = lat;
        task.longitude = long;
        task.tasksummary = summary[i];
        task.taskdescription = descriptions[i];

        tasks.push(task);
    }
};

app.get('/taskmanager/v1/tasks', function (req, res) {
    return res.send(tasks);
});

app.post('/taskmanager/v1/tasks', function (req, res) {
    const task = req.body;
    tasks.push(task);
    return res.sendStatus(201);
});

app.get('/taskmanager/v1/tasks/organisations/:organisationId', function (req, res) {
    const { organisationId } = req.params;
    return res.send(tasks.filter(task => task.OrganisationId == organisationId));
});

app.get('/taskmanager/v1/tasks/organisations/:organisationId/:callerId', function (req, res) {
    const { organisationId, callerId } = req.params;
    return res.send(tasks.filter(task => task.OrganisationId == organisationId && task.callerId === callerId));
})

app.get('/taskmanager/v1/tasks/organisations/:organisationId/:callerId/latest', function (req, res) {
    const { organisationId, callerId } = req.params;
    return res.send(tasks.find(task => task.OrganisationId == organisationId && task.callerId === callerId));
});

app.get('/taskmanager/v1/tasks/:abxTaskId', function (req, res) {
    const { abxTaskId } = req.params;
    return res.send(tasks.find(task => task.AbxTaskId == abxTaskId));
});
app.put('/taskmanager/v1/tasks/:abxTaskId', function (req, res) {
    const { abxTaskId } = req.params;
    const taskToUpdate = req.body;

    for (let i = 0; i < tasks.length; i++)
    {
        if (tasks[i].AbxTaskId === abxTaskId)
        {
            tasks[i] = taskToUpdate;
            break;
        }
    }
    return res.sendStatus(201);
});
app.delete('/taskmanager/v1/tasks/:abxTaskId', function (req, res) {
    const { abxTaskId } = req.params;
    tasks = tasks.filter(task => task.AbxTaskId !== abxTaskId);
    return res.status(204).send("Deleted");
});

buildDummyTaskData();

app.listen(process.env.PORT || 8080);