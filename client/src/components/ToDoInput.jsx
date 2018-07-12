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
                <input id="addtodobutton" type="submit" value="+" onClick={(e) => { this.addNewToDo(e) }} />
                <span id="addtodotext">&nbsp;{this.props.count} TO DO </span><input id="todoinput" type="text" placeholder="New To Do" maxLength="52"/>
            </form>
        )
    }
}