import React, { Component } from 'react'

import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class MultiLabelTool extends Component {


    constructor(props) {
        super(props)

        this.state = {};

        props.features.forEach((f) => {
            this.state[f] = false;
        });

        this.reset = this.reset.bind(this);

    }

    handleChange(event) {
        let name = event.target.name;
        let checked = event.target.checked;
        this.state[name] = checked;
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(name, checked);
        }
    }

    reset(){
        this.props.features.forEach((f) => {
            this.state[f] = false;
        });
    }

    render() {

        var state = this.state;

        var items = this.props.features.map((key, index) => {

            return (<FormControlLabel
                control={<Checkbox checked={state[key]} onChange={this.handleChange.bind(this)} name={key} />}
                label={key}
            />)
        });

        return (
            <div>
                <h3> Hightlight Selection. </h3>
                <FormGroup row>
                    {items}
                </FormGroup>
            </div>
        )
    }
}


export default MultiLabelTool;