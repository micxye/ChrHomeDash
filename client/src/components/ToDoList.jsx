import React from 'react';
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ToDoEntry from './ToDoEntry.jsx'
import ItemTypes from './ItemTypes.jsx'

const style = {
    width: 400,
}

const toDoTarget = {
    drop() { },
}

// @ ???
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
                    text: 'Write a cool JS librjkfajskdfjaksdjfkasdjfkasdjfkasdjfkajsdkfjaksdjfkasdfja ksdfjkasdfjkasdjkadsjfkary',
                },
                {
                    id: 2,
                    text: 'Make it generic enough',
                },
                {
                    id: 3,
                    text: 'Write README',
                },
                {
                    id: 4,
                    text: 'Create some examples',
                },
                {
                    id: 5,
                    text: 'Spam in Twitter and IRC to promote it',
                },
                {
                    id: 6,
                    text: '???',
                },
                {
                    id: 7,
                    text: 'PROFIT',
                }
            ]
        }
        this.moveToDo = this.moveToDo.bind(this)
        this.findToDo = this.findToDo.bind(this)
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
                <h3>TO DO</h3>
                {toDos.map(toDo => (
                    <ToDoEntry
                        key={toDo.id}
                        id={toDo.id}
                        text={toDo.text}
                        moveToDo={this.moveToDo}
                        findToDo={this.findToDo}
                    />
                ))}
            </div>,
        )
    }
}

