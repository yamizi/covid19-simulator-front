import React, { Component } from 'react'

import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

var code_to_name = {
    "R_A":"AGRICULTURE, FORESTRY AND FISHING",
    "R_B":'MINING AND QUARRYING',
    "R_C": "MANUFACTURING",
    "R_D":"ELECTRICITY, GAS, STEAM AND AIR CONDITIONING SUPPLY",
    "R_E":"WATER SUPPLY; SEWERAGE, WASTE MANAGEMENT AND REMEDIATION ACTIVITIES",
    "R_F":"CONSTRUCTION",
    "R_G":"WHOLESALE AND RETAIL TRADE...",
    "R_H":"TRANSPORTATION AND STORAGE",
    "R_I":"HORECA",
    "R_J":"INFORMATION AND COMMUNICATION",
    "R_K":"FINANCIAL AND INSURANCE ACTIVITIES",
    "R_L":"REAL ESTATE ACTIVITIES",
    "R_M":"PROFESSIONAL, SCIENTIFIC AND TECHNICAL ACTIVITIES",
    "R_N":"ADMINISTRATIVE SERVICES",
    "R_O":"PUBLIC ADMINISTRATION AND DEFENCE",
    "R_P":"EDUCATION",
    "R_Q":"HUMAN HEALTH AND SOCIAL WORK ACTIVITIES",
    "R_S":"OTHER SERVICE ACTIVITIES",
    "R_T":"Household activities. [@@@@@]",
    "R_U":"ACTIVITIES OF EXTRATERRITORIAL ORGANISATIONS AND BODIES",
};


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

        var items = this.props.features.map((key, index) => {

            let name = code_to_name[key].toLowerCase();
            name = name.charAt(0).toUpperCase() + name.slice(1);

            return (<FormControlLabel
                control={<Checkbox checked={this.state[key]} onChange={this.handleChange.bind(this)} name={key} />}
                label={name}
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