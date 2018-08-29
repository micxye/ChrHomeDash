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
                <span id="addtodotext">{(() => this.props.count === 1 ? `${this.props.count} THING ` : `${this.props.count} THINGS`)()}</span>
                <input id="todoinput" type="text" placeholder="+ a new thing" maxLength="52" autoComplete="off"/>
            </form>
        )
    }
}