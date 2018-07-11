import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes.jsx'

const toDoSource = {
    beginDrag(props) {
        return {
            id: props.id,
            originalIndex: props.findToDo(props.id).index,
        }
    },

    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem()
        const didDrop = monitor.didDrop()

        if (!didDrop) {
            props.moveToDo(droppedId, originalIndex)
        }
    },
}

const toDoTarget = {
    canDrop() {
        return false
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem()
        const { id: overId } = props

        if (draggedId !== overId) {
            const { index: overIndex } = props.findToDo(overId)
            props.moveToDo(draggedId, overIndex)
        }
    },
}

@DropTarget(ItemTypes.TODO, toDoTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.TODO, toDoSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))

export default class ToDoEntry extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        complete: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveToDo: PropTypes.func.isRequired,
        findToDo: PropTypes.func.isRequired,
    }

    render() {
        const {
            id,
            text,
            isDragging,
            completeToDo,
            removeToDo,
            connectDragSource,
            connectDropTarget,
        } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(
            connectDropTarget(
                <div style={{opacity }} className="todoentry">
                    <div className="checkboxtodotext">
                        {(() => this.props.complete ?
                            <input checked type="checkbox" value="None" id={this.props.id} name="check" onClick={() => { completeToDo(id) }} /> :
                            <input type="checkbox" value="None" id={this.props.id} name="check" onClick={() => { completeToDo(id) }} />
                        )()}
                        <label htmlFor={this.props.id} className={(() => this.props.complete ? "complete" : "incomplete")()}>
                            <span></span>
                            {text}
                            <ins><i>{text}</i></ins>
                        </label>
                    </div>
                    <button type="button" className="x" onClick={() => { removeToDo(id) }}>✖</button>
                </div>
            )
        )
    }
}