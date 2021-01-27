import React, { Component } from "react"
import ReactDOM from "react-dom"
import Slider from "@material-ui/core/Slider"

class GridRangeValues extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || 0,
        }
    }

    getInputNode = () => {
        return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0]
    }

    onBlur = () => {
        this.props.onCommit()
    }

    onChange = (event, new_value) => {

        var newLabel = ""
        
        if (this.props.step === null) {
            const labelFinder = (mark) => mark.value === new_value;
            const currentLabelIndex = this.props.marks.findIndex(labelFinder);
            newLabel = this.props.marks[currentLabelIndex].label;
        }else{
            console.log('discrete range.', new_value);
            newLabel = parseInt(new_value); 
        }

        if (typeof this.props.onValueChange === "function") {
            this.props.onValueChange(this.props.id, new_value, newLabel);
        }

        this.setState({
            value: new_value,
        })
    }

    display_value = (value, index) => {
        return `${value}`
    }

    getValue = () => {
        let update = {}
        update[this.props.column.key] = this.state.value
        console.log(update)
        return update
    }

    getStyle = () => {
        return {
            width: "100%",
            height: "100%",
        }
    }

    disableContainerStyles = () => {
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
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: "85%",
                    }}
                >
                    <Slider
                        step={this.props.step}
                        min={0}
                        max={100}
                        style={{
                            backgroundColor: "inherit",
                        }}
                        aria-labelledby={"discrete-slider"}
                        valueLabelDisplay={"on"}
                        marks={this.props.marks}
                        value={this.props.value}
                        onChange={this.onChange}
                        getAriaValueText={this.display_value}
                    />
                </div>
            </div>
        )
    }
}

export default GridRangeValues
