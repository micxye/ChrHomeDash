import React from 'react';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ToDoEntry from './ToDoEntry.jsx';
import ToDoInput from './ToDoInput.jsx';
import ItemTypes from './ItemTypes.jsx';
import axios from 'axios';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import FadeAndSlideTransition from './FadeAndSlideTransition.jsx';
import ToDoListBoard from './ToDoListBoard.jsx';

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
            toDos: [],
        };
    }

    componentDidMount() {
        this.getToDoList();
    }

    getToDoList() {
        axios.get('http://localhost:8888/todolist')
            .then(response => this.setState({ toDos: response.data }))
            .catch(error => console.log(error));
    }

    saveToDoList() {
        setTimeout(() => {
            axios.post('http://localhost:8888/todolist', this.state.toDos)
            .catch(error => console.log(error));
        }, 300);
    }

    addToDo = (text) => {
        const ID = () => '_' + Math.random().toString(36).substr(2, 9),
              toDo = {
                id: ID(),
                text: text,
                complete: false,
              },
              toDoList = this.state.toDos.slice();

        toDoList.push(toDo);
        this.setState({ toDos: toDoList }, this.saveToDoList);
    }

    removeToDo = (id) => {
        const targetIndex = this.findToDo(id).index,
              toDoList = this.state.toDos.slice();

        toDoList.splice(targetIndex, 1);
        this.setState({ toDos: toDoList }, this.saveToDoList);
    }

    completeToDo = (id) => {
        const targetIndex = this.findToDo(id).index,
              toDoList = this.state.toDos.slice();

        toDoList[targetIndex].complete = !toDoList[targetIndex].complete;
        this.setState({ toDos: toDoList }, this.saveToDoList);
    }

    moveToDo = (id, atIndex) => {
        const { toDo, index } = this.findToDo(id);
        this.setState(
            update(this.state, {
                toDos: {
                    $splice: [[index, 1], [atIndex, 0, toDo]],
                },
            }), this.saveToDoList
        );
    }

    findToDo = (id) => {
        const { toDos } = this.state,
              toDo = toDos.filter(c => c.id === id)[0];

        return {
            toDo,
            index: toDos.indexOf(toDo),
        }
    }

    renderShiaGif = () => {
        const { length } = this.state.toDos;
        return <img src="shia.gif" alt="shia" className={(() => length < 3 ? "shia" : `shia gone`)()} />;
    }

    render() {
        const { connectDropTarget } = this.props,
              { toDos } = this.state;

        return connectDropTarget(
            <div id="todolistcontainer">
                <ToDoInput addToDo={this.addToDo} count={toDos.filter(toDo => !toDo.complete).length}/>
                <TransitionGroup component={ToDoListBoard}> 
                        {toDos.map(toDo => (
                            <FadeAndSlideTransition duration={300} key={toDo.id}>
                                <li>
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
                                </li>
                            </FadeAndSlideTransition>
                        ))}
                </TransitionGroup>
                {this.renderShiaGif()}
            </div>
        )
    }
}
