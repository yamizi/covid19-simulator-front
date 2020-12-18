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


  render() {
    const [left, right] = this.props.domain;

    return (
      <div>
        <h2 className='graph-title'>{this.title}</h2>

        <AreaChart width={600} height={400} data={this.props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>

          <defs>
            <linearGradient id={this.feature} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={this.color} 
              stopOpacity={ ((this.props.showAreaOnConfidenceInterval && this.props.showAreaOnConfidenceInterval) || !this.props.showConfidenceInterval) ? 1: 0 } />
              <stop offset="100%" stopColor={this.color} 
              stopOpacity={ ((this.props.showAreaOnConfidenceInterval && this.props.showAreaOnConfidenceInterval) || !this.props.showConfidenceInterval) ? 0.1: 0 } />
            </linearGradient>

            {(this.props.showConfidenceInterval) ?
              <linearGradient id={this.feature + '_max'} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={this.confidanceMaxColor} stopOpacity={ this.props.showAreaOnConfidenceInterval ? 1 : 0 } />
                <stop offset="100%" stopColor={this.confidanceMaxColor} stopOpacity={ this.props.showAreaOnConfidenceInterval ? 0.1 : 0 } />
              </linearGradient>
              : ''}

            {(this.props.showConfidenceInterval) ?
              <linearGradient id={this.feature + '_min'} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={this.confidanceMinColor} stopOpacity={ this.props.showAreaOnConfidenceInterval ? 1 : 0 } />
                <stop offset="100%" stopColor={this.confidanceMinColor} stopOpacity={ this.props.showAreaOnConfidenceInterval ? 0.1 : 0 } />
              </linearGradient>
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

          <Legend />
        </AreaChart>

      </div>
    )
  }
}


export default Graph