import React, { Component } from "react"
import ReactDOM from "react-dom"
import Slider from "@material-ui/core/Slider"
import Search from "@material-ui/icons/Search"

class GridRangeValues extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
        }
    }

    getInputNode() {
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
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: "65%",
                    }}
                >
                    <Slider
                        step={25}
                        min={0}
                        max={100}
                        style={{
                            backgroundColor: "white",
                        }}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="on"
                        marks={true}
                        value={this.state.value}
                        onChange={this.onChange}
                        getAriaValueText={this.display_value}
                    />
                </div>
                <div>
                    <Search color="primary" />
                </div>
            </div>
        )
    }
}

export default GridRangeValues
