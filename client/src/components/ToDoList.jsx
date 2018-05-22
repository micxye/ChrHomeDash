import React from 'react';
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ToDoEntry from './ToDoEntry.jsx'
import ToDoInput from './ToDoInput.jsx'
import ItemTypes from './ItemTypes.jsx'

const style = {
    width: 400,
}

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
            toDos: [
                {
                    id: 1,
                    text: 'make a cool to do list',
                    complete: true
                },
                {
                    id: 2,
                    text: 'give it drag and drop functionality',
                    complete: true
                },
                {
                    id: 3,
                    text: 'be able to create new todos',
                    complete: true
                },
                {
                    id: 4,
                    text: 'make a checkbox',
                    complete: true
                },
                {
                    id: 5,
                    text: 'be able to delete todos',
                    complete: false
                },
                {
                    id: 6,
                    text: '???',
                    complete: false
                },
                {
                    id: 7,
                    text: 'PROFIT',
                    complete: false
                }
            ]
        }
        this.moveToDo = this.moveToDo.bind(this)
        this.findToDo = this.findToDo.bind(this)
        this.completeToDo = this.completeToDo.bind(this)
        this.removeToDo = this.removeToDo.bind(this)
        this.addToDo = this.addToDo.bind(this)
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
    }

    removeToDo(id) {
        const targetIndex = this.findToDo(id).index;
        const toDoList = this.state.toDos.slice();
        toDoList.splice(targetIndex, 1);
        this.setState({
            toDos: toDoList
        })
    }

    completeToDo(id) {
        const targetIndex = this.findToDo(id).index;
        const toDoList = this.state.toDos.slice();
        let isToDoComplete = toDoList[targetIndex].complete
        isToDoComplete ? isToDoComplete = false : isToDoComplete = true; 
        this.setState({
            toDos: toDoList
        })
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
            <div style={style}>
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

