import React from 'react';
import ToDoList from './ToDoList.jsx';
import DashboardHome from './DashboardHome.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div id="appcontainer">
                <div id="todolistquotecontainer">
                    <ToDoList />
                    <img src="https://i.imgur.com/zKq7Q9n.gif" alt="yung goon jung yoon" id="jung"></img>
                </div>
                <div id="dashboardcontainer">
                    <DashboardHome />
                </div>
            </div>
        )
    }
}