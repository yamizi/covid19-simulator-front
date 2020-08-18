import React, { Component } from "react"
import ReactDOM from "react-dom"
import Slider from "@material-ui/core/Slider"
import Search from "@material-ui/icons/Search"

class GridRangeValues extends Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.state = {
      value: props.value,
    }
  }

  getInputNode() {
    return ReactDOM.findDOMNode(this)
  }

  onBlur = () => {
    this.props.onCommit()
  }

  onChange = event => {
    this.setState({
      [this.props.column.key]: Math.min(100, Math.max(0, event.target.value)),
    })
  }

  getValue = () => {
    return { value: this.state.value }
  }

  getStyle = () => {
    return {
      width: "100%",
      height: "100%",
    }
  }

  disableStyle = () => {
    return {
      backgroundColor: "#A4A4A4",
      fontWeight: 600,
      color: "#FFF",
    }
  }

  render() {
    return (
      <div style={{ display: "flex",
          justifyContent: "space-around",
          alignItems: "center", }}>
        <div style={{
            width: "80%",
          }}>
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
            <Search
              style={{
                fontSize: "90%",
              }}
              color="primary"
            />
        </div>
      </div>
    )
  }
}

export default GridRangeValues
