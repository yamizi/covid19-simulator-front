import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from '../components/CustomToolTip'
import MultiLabelTool from '../components/MultiLabelTool'


import './Caroussel.css'

import { Grid } from "@material-ui/core"

class MultiLabelGraph extends Component {

  constructor(props) {
    console.log("constructor !")
    super(props);

    this.confidanceMinColor = '#00bf33';
    this.confidanceMaxColor = "#e30000";

    this.features = props.features;
    this.showConfidenceInterval = props.showConfidenceInterval;

    this.firstDisplay = false;

    this.resetGraph = this.resetGraph.bind(this);

    this.toolRef = React.createRef(); 

    this.colorPalette = ['#ff1e00','#ff4c00','#ff7000','#ffcd00','#fdff00',
                         '#16ff00','#00f5ff','#0000ff','#9100ff','#ff00fd',
                         '#ff00c9','#ff0099','#ff0074','#ff0050','#ff0000'];

    if (props.colors !== undefined) {
      this.colorPalette = props.colors;
    } 

    if (props.title) {
      this.title = props.title;
    } else {
      this.title = "Default Title."
    }

    this.state = {
      graphWidth: 800,
      highlightMode:0
    }

    props.features.forEach((key) => {
      this.state[key] = false;
    });

    

  }

  SetDateToString(tick) {
    let date = new Date(tick);
    let month = (date.getMonth() + 1 > 10) ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    let strDate = date.getFullYear() + '-' + month;
    return strDate;
  }

  updateHightLight(label, new_value){

    let {highlightMode} = this.state;

    if(new_value){
      highlightMode++;
    }else{
      highlightMode--;
    }


    this.setState({
      [label]:new_value,
      highlightMode:highlightMode
    });
  }


  componentDidMount(){
    const width = document.getElementById('chart-container').clientWidth;
    this.firstDisplay = true;
    this.setState({ 
      graphWidth: width 
    });  
  }

  resetGraph(){
    this.toolRef.current.reset();
  }


  render() {
    const [left, right] = this.props.domain;

    var data = this.props.data;

    if(this.props.objective !== undefined && Number.isFinite(this.props.objective)){
      data.map((d) => {
        d['objective'] = 1
      });
    }

    
    var items = [];
    var toDisplay = [];
    var height = 600;

    return (

      <div>
        <h2 className='graph-title'>{this.title}</h2>
        <Grid container direction="row" spacing={2} xs={12}>
          <Grid item xs={9} id='chart-container'>
            <LineChart width={this.state.graphWidth} height={height} data={this.props.data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>

              <CartesianGrid strokeDasharray="" />
              <XAxis dataKey="Date" domain={[left, right]} allowDataOverflow={true} type='number' tickFormatter={this.SetDateToString} />

              {this.features.forEach((feature, index) => {

                let strokeColor = (this.state.highlightMode === 0 || this.state[feature])? this.colorPalette[index] : '#bfbfbf';
                if(this.state[feature]){
                  toDisplay.push(feature);
                }


                items.push(
                  ((this.props.showConfidenceInterval && this.state.highlightMode === 0 )|| (this.state[feature] && this.props.showConfidenceInterval)) ?
                    <Line dataKey={feature + '_max'} isAnimationActive={!this.firstDisplay} stroke={this.confidanceMaxColor} dot={false} />
                    : ''
                );

                items.push(
                  ((this.props.showConfidenceInterval && this.state.highlightMode === 0 )|| (this.state[feature] && this.props.showConfidenceInterval)) ?
                    <Line dataKey={feature + '_min'} isAnimationActive={!this.firstDisplay} stroke={this.confidanceMinColor} dot={false} />
                    : ''
                );

                items.push(
                  <Line dataKey={feature} stroke={strokeColor} dot={false} isAnimationActive={!this.firstDisplay} strokeWidth={(this.state[feature]? 5:1)} />
                );

              })}

              <YAxis />
              <Tooltip content={<CustomTooltip showConfidenceInterval={this.props.showConfidenceInterval} features={toDisplay} objective={this.props.objective}/>} />

              {items}

              {(this.props.objective !== undefined && Number.isFinite(this.props.objective)) ?
                  <Line dataKey={'objective'} stroke={"#33ff33"} dot={false} isAnimationActive={!this.firstDisplay} strokeWidth={3} />
              : ''}

              <Legend />
            </LineChart>
          </Grid>
          <Grid item xs={3}>
            
              <MultiLabelTool features={this.features} onChange={this.updateHightLight.bind(this)} 
                ref={this.toolRef}/>

          </Grid>
        </Grid>

      </div>
    )
  }
}


export default MultiLabelGraph