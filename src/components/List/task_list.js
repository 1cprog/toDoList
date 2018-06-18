import React from 'react';
import './task_list.css';

const TaskList = (props) => {
    const taskList = props.status;

    const findIndex = (listItem) => {
        return taskList.indexOf(listItem);
    };

    // Delete task
    const deleteHandler = (item) => {
        taskList.splice(findIndex(item), 1);
        localStorage.setItem("tdl", JSON.stringify(taskList));
        props.change([]);
    };

    // Highlight task as expired
    let tdlClass = (item) => {
        let str = "expDate";
        if(new Date(item.expiredDateTime) < new Date()) {
            str += " expired";
        }
        return str;
    };

    // Set task 'done' status
    const changeHandler = (item, e) => {
        let listItem = findIndex(item);
        if(e.target.checked) {
            taskList[listItem].done = true;
        } else {
            taskList[listItem].done = false;
        }
        localStorage.setItem("tdl", JSON.stringify(taskList));
        props.change([]);
    };

    // Generate task item
    const task = (taskList) => {
        // console.log(taskList);
        return (
            taskList !== null ?
                taskList.map(item => (
                    <div
                        key={item.id}
                        className="item"
                    >
                        <p className={"title " + item.priority}>
                            {item.name}
                        </p>
                        <div
                            className="delete"
                            onClick={deleteHandler.bind(this, item)}
                        >
                            +
                        </div>
                        <p
                            className="edit"
                            onClick={
                                () => props.change(item)
                            }
                        >
                            edit
                        </p>
                        <div className="clear">
                        </div>
                        <p>
                            {item.description}
                        </p>
                        <p>
                            <span className={tdlClass(item)}>
                                Exp. date {item.expiredDateTime}
                            </span>
                            <span className="done">
                                <label htmlFor="done">
                                    Done
                                </label>
                                <input
                                    type="checkbox"
                                    id="done"
                                    checked={item.done}
                                    onChange={changeHandler.bind(this, item)}
                                />
                            </span>
                        </p>
                        <div className="clear">
                        </div>
                    </div>
                )) :
                null
        )
    };

    return (
        <div>
            {task(props.status)}
        </div>
    )
};

export default TaskList;