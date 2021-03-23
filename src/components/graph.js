import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { makeCorrectStringFromDate } from '../script/dataManager'

import './Caroussel.css'


class Graph extends Component {

  constructor(props) {
    super(props);

    this.confidanceMinColor = '#00bf33';
    this.confidanceMaxColor = "#e30000";
    this.feature = props.feature;
    this.showConfidenceInterval = props.showConfidenceInterval;

    if (props.color === undefined) {
      this.color = '#008ffb';
    } else {
      this.color = props.color;
    }

    if (props.title) {
      this.title = props.title;
    } else {
      this.title = props.feature
    }


  }


  SetDateToString(tick) {
    let date = new Date(tick);
    let month = (date.getMonth() + 1 > 10) ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    let strDate = date.getFullYear() + '-' + month;
    return strDate;
  }


  addAreaGradient(feature, color){
    return(
      <linearGradient id={feature}>
        <stop offset="5%" stopColor={color} 
        stopOpacity={ this.props.showAreaOnConfidenceInterval ? 1: 0 } />
        <stop offset="100%" stopColor={color} 
        stopOpacity={ this.props.showAreaOnConfidenceInterval ? 0.1: 0 } />
      </linearGradient>
    );
  }


  render() {
    const [left, right] = this.props.domain;

    var data = this.props.data;

    if(this.props.objective !== undefined && Number.isFinite(this.props.objective)){
      data.map((d) => {
        d['objective'] = 1
      });
    }


    return (
      <div>
        <h2 className='graph-title'>{this.title}</h2>

        <AreaChart width={600} height={400} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>

          <defs>
            {this.addAreaGradient(this.feature, this.color)}

            {(this.props.showConfidenceInterval) ?
              this.addAreaGradient(this.feature + '_max', this.confidanceMaxColor)
              : ''}

            {(this.props.showConfidenceInterval) ?
              this.addAreaGradient(this.feature + '_min', this.confidanceMinColor)
              : ''}

            {(this.props.objective !== undefined && Number.isFinite(this.props.objective)) ?
              this.addAreaGradient( 'objective' , "#33ff33")
              : ''}

          </defs>

          <CartesianGrid strokeDasharray="" />
          <XAxis dataKey="Date" domain={[left, right]} allowDataOverflow={true} type='number' tickFormatter={this.SetDateToString} />

          <YAxis />
          <Tooltip labelFormatter={(label) => makeCorrectStringFromDate(label)} />

          {(this.props.showConfidenceInterval) ?
            <Area dataKey={this.feature + '_max'} stroke={this.confidanceMaxColor} fill={"url(#" + this.feature + "_max)"}  />
            : ''}

          {(this.props.showConfidenceInterval) ?
            <Area dataKey={this.feature + '_min'} stroke={this.confidanceMinColor} fill={"url(#" + this.feature + "_min)"} />
            : ''}

          <Area dataKey={this.feature} stroke={this.color}  fill={"url(#" + this.feature + ")"} />

          {(this.props.objective !== undefined && Number.isFinite(this.props.objective)) ?
            <Area dataKey={"objective"} stroke={"#33ff33"} strokeWidth={3}  fill={"url(#objective)"} />
              : ''}


          <Legend />
        </AreaChart>

      </div>
    )
  }
}


export default Graph