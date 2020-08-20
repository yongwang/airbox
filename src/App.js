import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './style/App.css';
import MainNav from "./global/nav/MainNav";
import Home from "./home/Home";
import TasksListContainer from "./tasks/TasksListContainer";
import TaskProvider from "./provider/TaskProvider";

/*
TODO: Could be handled from some higher up datastore service, persistence model or cache, for now load empty
 */
const taskState = {
    tasks: []
};

function App()
{
    return (
        <TaskProvider initialState={taskState}>
            <Router>
                <MainNav/>
                <Route exact path="/" component={Home} />

                <Route path="/tasks">
                    <TasksListContainer/>
                </Route>
                <Route path="/tasks/*">
                  <TasksListContainer/>
                </Route>
            </Router>
        </TaskProvider>
    );
}

export default App;
