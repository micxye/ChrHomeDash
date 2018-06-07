import React from 'react';
import ToDoList from './ToDoList.jsx';
import Dashboard from './Dashboard.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div id="appcontainer">
                <ToDoList />
                <Dashboard />
            </div>
        )
    }
}