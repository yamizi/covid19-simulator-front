import React, { Component } from "react"
import ReactDOM from "react-dom"

import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Favorite from "@material-ui/icons/FiberManualRecord"
import FavoriteBorder from "@material-ui/icons/RadioButtonUncheckedOutlined"

class GridCheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.value || false,
        }
    }

    getInputNode() {
        return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0]
    }

    onBlur = () => {
        this.props.onCommit()
    }

    onChange = (event, new_value) => {
        console.log(new_value)
        this.setState(prev => ({ checked: !prev.checked }))
    }

    display_value = (value, index) => {
        return `${value}`
    }

    getValue() {
        let update = {}
        update[this.props.column.key] = this.state.value
        return update
    }

    getStyle = () => {
        return {
            width: "100%",
            height: "100%",
        }
    }

    disableContainerStyles() {
        return {
            backgroundColor: "#A4A4A4",
            fontWeight: 600,
            color: "#FFF",
        }
    }

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite color={"disabled"} />}
                                name="checked"
                                checked={this.state.checked}
                                onChange={this.onChange}
                            />
                        }
                        //label={this.state.checked ? "open" : "close"}
                        //labelPlacement={this.state.checked ? "start" : "end"}
                    />
                </FormGroup>
            </div>
        )
    }
}

export default GridCheckBox
