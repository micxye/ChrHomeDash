import React from 'react';
import ToDoList from './ToDoList.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div id="todolist">
                <ToDoList />
            </div>
        )
    }
}