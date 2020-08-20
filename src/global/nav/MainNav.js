import React from 'react';
import {Link} from "react-router-dom";

const MainNav = () =>
{
    return <div className='nav'>
        <div><Link to={'/'}>Home</Link></div>
        <div><Link to={'/tasks'}>Tasks</Link></div>
    </div>
}

export default MainNav;