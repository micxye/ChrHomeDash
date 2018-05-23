import React from 'react';
import ToDoList from './ToDoList.jsx';
import DateTime from './DateTime.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div id="appcontainer">
                <div id="todolistcontainer">
                    <ToDoList />
                </div>
                <div id="datetimecontainer">
                    <DateTime />
                </div>
            </div>
        )
    }
}