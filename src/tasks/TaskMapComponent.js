import React from "react";
import GoogleMapReact from "google-map-react";
import TaskMarkerComponent from "./TaskMarkerComponent";

const TaskMapComponent = ({tasks}) => {
    let i = 0;
    return (
    <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyChy__W9pYMQa7KRal1WuUTKZThgWVmoY4' }}
        defaultCenter={{lat: 51.4, lng: 0.1}}
        defaultZoom={11}
    >
        {Object.values(tasks).map(task => <TaskMarkerComponent key={task.AbxTaskId} lat={task.latitude} lng={task.longitude} index={i++} task={task}/>)}
    </GoogleMapReact>
    );
}

export default TaskMapComponent;