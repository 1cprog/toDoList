import React, { Component } from 'react';
import './style.css';

// COMPONENTS
import InputForm from './components/Form/form';
import TaskList from './components/List/task_list';

class App extends Component {

    state = {
        tdl: JSON.parse(localStorage.getItem("tdl")),
        elementToEdit: {
            element: {}, // if element is empty, show input for new else fill form from existing task details
            indexInStorage: -1
        }
    };

    // Update view
    changeStatus = (param) => {
        this.setState(() => {
            if(param.length === 0) {
                return {tdl: JSON.parse(localStorage.getItem("tdl"))};
            } else {
                return {elementToEdit: {element: param, indexInStorage: this.state.tdl.indexOf(param)}}
            }
        });
    };

    fieldChange = (event) => {
        const tdl = this.state.tdl;
        let currentIndex = this.state.tdl.indexOf(this.state.elementToEdit.element);
        tdl[currentIndex][event.target.name] = event.target.value;
        this.setState(
            Object.assign(
                {},
                this.state,
                { tdl }
            )
        );
    };

    render() {
        return (
            <div>
                App here
                <TaskList status={this.state.tdl} change={this.changeStatus}>
                    list elements
                </TaskList>
                <hr/>
                <InputForm
                    change={this.changeStatus}
                    editElement={this.state}
                    fieldChange={this.fieldChange}
                >
                    form element
                </InputForm>
            </div>
        )
    }
}

export default App;