import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ToDoEntry from './ToDoEntry.jsx';
import ToDoInput from './ToDoInput.jsx';
import ItemTypes from './ItemTypes.jsx';
import axios from 'axios';

const toDoTarget = {
    drop() { },
}

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.TODO, toDoTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))

export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDos: []
        }
        this.moveToDo = this.moveToDo.bind(this)
        this.findToDo = this.findToDo.bind(this)
        this.completeToDo = this.completeToDo.bind(this)
        this.removeToDo = this.removeToDo.bind(this)
        this.addToDo = this.addToDo.bind(this)
    }

    componentDidMount() {
        this.getToDoList()
    }

    getToDoList() {
        axios.get('http://localhost:8888/todolist')
            .then((response) => {
                console.log(response)
                this.setState({
                    toDos: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    persistToDoList() {
        axios.post('http://localhost:8888/todolist', this.state.toDos)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    saveToDoList() {
        const save = setTimeout(()=>{this.persistToDoList()}, 300);
    }

    addToDo(text) {
        const ID = function () { // create ID function
            return '_' + Math.random().toString(36).substr(2, 9);
        };
        const toDo = {
            id: ID(),
            text: text,
            complete: false,
        };
        const toDoList = this.state.toDos.slice();
        toDoList.unshift(toDo);
        this.setState({
            toDos: toDoList
        })
        this.saveToDoList();
    }

    removeToDo(id) {
        const targetIndex = this.findToDo(id).index;
        const toDoList = this.state.toDos.slice();
        toDoList.splice(targetIndex, 1);
        this.setState({
            toDos: toDoList
        })
        this.saveToDoList();
    }

    completeToDo(id) {
        const targetIndex = this.findToDo(id).index;
        const toDoList = this.state.toDos.slice();
        toDoList[targetIndex].complete ? toDoList[targetIndex].complete = false : toDoList[targetIndex].complete = true; 
        this.setState({
            toDos: toDoList
        })
        this.saveToDoList();
    }

    moveToDo(id, atIndex) {
        const { toDo, index } = this.findToDo(id)
        this.setState(
            update(this.state, {
                toDos: {
                    $splice: [[index, 1], [atIndex, 0, toDo]],
                },
            }),
        )
        this.saveToDoList();
        console.log(this.state.toDos)
    }

    findToDo(id) {
        const { toDos } = this.state
        const toDo = toDos.filter(c => c.id === id)[0]

        return {
            toDo,
            index: toDos.indexOf(toDo),
        }
    }

    render() {
        const { connectDropTarget } = this.props
        const { toDos } = this.state

        return connectDropTarget(
            <div id="todolistcontainer">
                <ToDoInput addToDo={this.addToDo} />
                {toDos.map(toDo => (
                    <ToDoEntry
                        key={toDo.id}
                        id={toDo.id}
                        text={toDo.text}
                        complete={toDo.complete}
                        moveToDo={this.moveToDo}
                        findToDo={this.findToDo}
                        removeToDo={this.removeToDo}
                        completeToDo={this.completeToDo}
                    />
                ))}
            </div>,
        )
    }
}

