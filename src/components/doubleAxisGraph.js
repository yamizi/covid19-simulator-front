import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { makeCorrectStringFromDate } from '../script/dataManager'

import './Caroussel.css'


class DoubleAxisGraph extends Component {

    constructor(props) {
        super(props);
        if (props.title) {
            this.title = props.title;
        } else {
            this.title = "Default Title";
        }

    }

    MakeLineInformations() {

        var linesInformation = [];

        for (var i = 0; i < this.props.feature.length; i++) {
            var color;

            if (this.props.axis[i] === 'left') {
                color = "rgb(0, 143, 251)";
            } else if (this.props.axis[i] === 'right') {
                color = 'rgb(255, 0, 0)';
            }

            if (this.props.showConfidenceInterval) {

                linesInformation.push({
                    feature: this.props.feature[i] + '_max',
                    axis: this.props.axis[i],
                    
                    lineColor:color,
                    fillColor:color,
                    fillOpacity:0.25
                });

                linesInformation.push({
                    feature: this.props.feature[i] + '_min',
                    axis: this.props.axis[i],

                    lineColor:color,
                    fillColor:'#ffffff',
                    fillOpacity:100
                });

                linesInformation.push({
                    feature: this.props.feature[i],
                    axis: this.props.axis[i],

                    lineColor:color,
                    fillColor:color,
                    fillOpacity:0
                });

            } else {
                linesInformation.push({
                    feature: this.props.feature[i],
                    axis: this.props.axis[i],

                    lineColor:color,
                    fillColor:"url(#" + this.props.feature[i] + ")",
                    fillOpacity:0.25
                });
            }




        }
        return linesInformation;
    }

    SetDateToString(tick) {
        let date = new Date(tick);
        let month = (date.getMonth() + 1 > 10) ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
        let strDate = date.getFullYear() + '-' + month;
        return strDate;
    }


    render() {
        var lineInformation = this.MakeLineInformations();

        const [left, right] = this.props.domain;


        return (

            <div>
                <h2 className='graph-title'>{this.title}</h2>

                <AreaChart width={600} height={400} data={this.props.data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    onMouseMove={(e) => this.setState({ activePoint: e.activeLabel })}
                    onMouseLeave={(e) => this.setState({ activePoint: '' })}>

                    <defs>
                        {
                            lineInformation.map(element => {
                                 return (
                                    <linearGradient id={element.feature} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={element.lineColor} stopOpacity={this.props.showConfidenceInterval ? 1 : 1} />
                                        <stop offset="100%" stopColor={element.lineColor} stopOpacity={this.props.showConfidenceInterval ? 0.1 : 0.1} />
                                    </linearGradient>
                                )
                            })
                        }
                    </defs>


                    <XAxis dataKey="Date" domain={[left, right]} allowDataOverflow={true} type='number' tickFormatter={this.SetDateToString} />
                    <YAxis yAxisId="left" stroke='#008fff' />
                    <YAxis yAxisId="right" orientation="right" stroke="#FF4336" padding={{left: 100, right: 0}}/>
                    <Legend />

                    <Tooltip labelFormatter={(label) => makeCorrectStringFromDate(label)} />

                    {
                        lineInformation.map(element => {
                            return (<Area yAxisId={element.axis} dataKey={element.feature}
                                stroke={element.lineColor} fill={element.fillColor} fillOpacity={element.fillOpacity} />)
                        })
                    }
                    <CartesianGrid strokeDasharray="" />
                </AreaChart>

            </div>
        )

    }

}


export default DoubleAxisGraph