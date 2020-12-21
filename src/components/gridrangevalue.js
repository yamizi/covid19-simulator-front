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
                        //step={100 / this.props.step}
                        step={25}
                        min={0}
                        max={100}
                        style={{
                            backgroundColor: "inherit",
                        }}
                        aria-labelledby={"discrete-slider"}
                        valueLabelDisplay={"on"}
                        //marks={this.props.marks}
                        value={this.state.value}
                        onChange={this.onChange}
                        getAriaValueText={this.display_value}
                    />
                </div>
            </div>
        )
    }
}

export default GridRangeValues
