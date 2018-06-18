import React, { Component } from 'react';

class Select extends Component {
        state = {
            priority: "regular"
        };

    handleChange = (event) => {
        this.setState({priority: event.target.value});
    };

    render() {

        // Set options
        const prioritiesOptions = ["high", "regular", "low"].map((item) => {
            return (
                <option key={item} value={item}>
                     {item}
                 </option>
             )
        });

        return (
            <select name="priority" id="priority" value={this.state.priority} onChange={(e) => this.handleChange(e)}>
                {prioritiesOptions}
            </select>
        )
    }
}

export default Select;