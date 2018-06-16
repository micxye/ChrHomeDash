import React, { Component } from 'react'
import $ from 'jquery';

export default class ToDoInput extends Component {
    constructor(props){
        super(props)
    }

    addNewToDo(e) {
        e.preventDefault();
        this.props.addToDo(document.getElementById('todoinput').value);
        $('#todoinput').val('');
    }

    render() {
        return (
            <form id="addtodobar">
                TO DO: <input id="todoinput" type="text" placeholder="New To Do"/>
                <input id="addtodobutton" type="submit" value="+" onClick={(e) => { this.addNewToDo(e)}}/>
            </form>
        )
    }
}