import React, { Component } from 'react'
import $ from 'jquery';

const style = {
    width: 300,
}

export default class ToDoInput extends Component {
    constructor(props){
        super(props)
    }

    addNewToDo(e) {
        e.preventDefault()
        this.props.addToDo(document.getElementById('todoinput').value)
        $('#todoinput').val('')
    }

    render() {
        return (
            <form id="addtodobar">
                TO DO: <input id="todoinput" style={style} type="text" placeholder="New To Do"/>
                <input type="submit" value="add" onClick={(e) => { this.addNewToDo(e)}}/>
            </form>
        )
    }
}