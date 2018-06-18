import React from 'react';
import './form.css';
import Select from './select';

const InputForm = (props) => {

    // Validate form data
    const validateFieldData = (data) => {
        if(!data.name.value) {
            alert("Name field cannot be empty");
            return false;
        }

        if(!data.description.value) {
            alert("Description field cannot be empty");
            return false;
        }

        return true;
    };

    // Clear form values after submitting
    const clearValues = (event) => {
        event.target.name.value = "";
        event.target.description.value = "";
        event.target.expiredDateTime.value = "";
        event.target.submit.value = "Add task";
    };

    // Add new item
    const addNewItem = (event) => {
        event.preventDefault();
        const eventType = () => {
            return event.target.submit.dataset.edit === "new";
        };

        if(eventType()) {
            let tdl = JSON.parse(localStorage.getItem("tdl"));
            let items = tdl === null ? [] : tdl;
            if(!validateFieldData(event.target)) {
                return;
            }

            let newItem = {
                id: Date.now().toString(16),
                name: event.target.name.value,
                description: event.target.description.value,
                priority: (event.target.priority.value).toLowerCase(),
                expiredDateTime: event.target.expiredDateTime.value,
                doneDate: false
            };

            console.log(event.target.priority);

            items.push(newItem);
            localStorage.setItem("tdl", JSON.stringify(items));
            props.change([]);
            clearValues(event);
        } else {
            let tdl = props.editElement.tdl;
            let editElement = props.editElement.elementToEdit;
            tdl[editElement.indexInStorage] = {
                id: props.editElement.elementToEdit.element.id,
                name: event.target.name.value,
                description: event.target.description.value,
                priority: (event.target.priority.value).toLowerCase(),
                expiredDateTime: event.target.expiredDateTime.value,
                doneDate: event.target.doneDate
            };

            localStorage.setItem("tdl", JSON.stringify(tdl));
            props.change([editElement]);
            clearValues(event);
        }
    };

    // console.log(props.editElement.elementToEdit);
    if (Object.keys(props.editElement.elementToEdit.element).length > 0) {
        let element = props.editElement.elementToEdit.element;
        return (
            <form onSubmit={addNewItem}>
                <h4>Input form</h4>
                <br/>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Title"
                    onChange={props.fieldChange}
                    value={element.name}
                />
                <br/>
                <textarea
                    name="description"
                    id="description"
                    placeholder="Description"
                    onChange={props.fieldChange}
                    value={element.description}
                />
                <br/>
                <Select/>
                <br/>
                <input
                    type="text"
                    name="expiredDateTime"
                    id="endDate"
                    placeholder="yyyy / mm / dd | Till date"
                    onChange={props.fieldChange}
                    value={element.expiredDateTime}/>
                <br/>
                <input type="submit" value="Submit changes" data-edit="edit" name="submit"/>
            </form>
        )
    } else {
        return (
            <form onSubmit={addNewItem}>
                <h4>Input form</h4>
                <br/>
                <input type="text" name="name" id="name" placeholder="Title"/>
                <br/>
                <textarea name="description" id="description" placeholder="Description"/>
                <br/>
                <Select/>
                <br/>
                <input type="text" name="expiredDateTime" id="endDate" placeholder="yyyy / mm / dd | Till date"/>
                <br/>
                <input type="submit" value="Add task" data-edit="new" name="submit"/>
            </form>
        )
    }
};

export default InputForm;