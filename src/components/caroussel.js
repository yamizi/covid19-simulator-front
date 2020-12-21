import React, { Component } from 'react';
import Graph from '../components/graph';
import DoubleAxisGraph from '../components/doubleAxisGraph';
import LoadingState from './loadingState'

import { Brush, LineChart } from 'recharts';

import extractData from '../script/dataManager'

import { makeCorrectStringFromDate } from '../script/dataManager';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class Caroussel extends Component {

    constructor(props) {
        super(props);
        this.data = this.makeAsyncRequest(props.apiUrl, props.apiRequest);

        this.state = {
            checked: false,
            left: undefined,
            right: undefined,
            brushLeft: undefined,
            brushRight: undefined,
            loading: true
        }

    }

    async makeAsyncRequest(url, dataToPost) {
        try {
            let apiData = await this.makeApiRequest(url, dataToPost);
            apiData = JSON.parse(apiData);

            this.formatedData = extractData(apiData.df);
            this.data = apiData;

            this.setState({
                left: this.formatedData[0]['Date'],
                right: this.formatedData[this.formatedData.length - 1]['Date'],
                brushLeft: 0,
                brushRight: this.formatedData.length - 1,
                loading: false,
            });

        } catch (err) {
            console.log(err);
        }
    }

    async makeApiRequest(url, dataToPost) {
        var request = new XMLHttpRequest();

        return new Promise(function (resolve, reject) {
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status >= 300) {
                        reject("Error, status code = " + request.status)
                    } else {
                        resolve(request.responseText);
                    }
                }
            }

            request.open('POST', url, true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(JSON.stringify(dataToPost));
        });
    }

    resetStates() {
        this.setState({
            checked: false,
            left: this.formatedData[0]['Date'],
            right: this.formatedData[this.formatedData.length - 1]['Date'],
            brushLeft: 0,
            brushRight: this.formatedData.length - 1
        })
        this.formatedData = this.formatedData.slice();
    }

    updateState(e) {
        this.setState(() => ({
            checked: e
        }));
    }

    updateGraphs(newLeftIndex, newRightIndex) {

        let newLeft = this.data.df[newLeftIndex];
        let newRight = this.data.df[newRightIndex];

        if (newLeft !== undefined && newRight !== undefined) {
            this.setState(() => ({
                left: newLeft['Date'],
                right: newRight['Date']
            }));
        }
    }

    forceUpdate() {
        const { checked } = this.state;
        this.setState({
            checked: checked
        });
    }


    render() {
        const { checked, left, right, brushLeft, brushRight, loading } = this.state;

        if (loading) return (<LoadingState />);

        return (
            <div>

                <Tabs onSelect={(selectedTab, lastTab) => { if (selectedTab === 2) return false; }}>
                    <TabList>
                        <Tab style={{marginBottom:'0px'}}>Sanitary Indices</Tab>
                        <Tab style={{marginBottom:'0px'}}>Economical indices</Tab>
                        <Tab style={{marginBottom:'0px', padding:0, float:"right"}}>
                            <div className='checkbox-wrapper unChecked'>
                                <label className='input-checkbox'>
                                    <input type='checkbox'
                                    checked={checked}
                                    onChange={(e) => {
                                        this.updateState(e.target.checked)
                                    }}/>
                                    <span> {checked ? 'Hide' : 'Show'} confidence intervals</span>
                                </label>
                            </div>
                            <button
                                className='button'
                                onClick={this.resetStates.bind(this)}>
                                Reset graphs
                            </button>
                        </Tab>
                    </TabList>

                    <div className="zoom-wrapper">
                        <div className='zoom-title'>Graph Control</div>
                        <div className='zoom-bar'>
                            <LineChart width={800} height={30}
                                data={this.formatedData}
                                margin={{ right: 100, left: 100 }}>
                                <Brush dataKey='Date' height={30} stroke="#8884d8"
                                    onChange={(e) => { this.updateGraphs(e.startIndex, e.endIndex) }}
                                    tickFormatter={makeCorrectStringFromDate}
                                    startIndex={brushLeft} endIndex={brushRight}
                                />
                            </LineChart>
                        </div>
                    </div>


                    <TabPanel>
                        <div className='custom-container'>

                            <DoubleAxisGraph
                                className='cell'
                                feature={["SimulationCases_ALL", 'SimulationDeaths_ALL']}
                                data={this.formatedData}
                                axis={['left', 'right']} title='Total Cases and Deaths'
                                showConfidenceInterval={checked} domain={[left, right]} />

                            <Graph
                                className='cell'
                                feature="SimulationCritical_ALL" data={this.formatedData} title='Simulation critical'
                                showConfidenceInterval={checked} domain={[left, right]} showAreaOnConfidenceInterval={true} />

                            <Graph
                                className='cell'
                                feature="R_ALL" data={this.formatedData} title='Reproduction rate'
                                showConfidenceInterval={checked} domain={[left, right]} showAreaOnConfidenceInterval={false} />

                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='custom-container'>
                            <Graph feature="unemploy" data={this.formatedData} title='Unemploy'
                                showConfidenceInterval={checked} domain={[left, right]} showAreaOnConfidenceInterval={true} />
                            <Graph feature="export" data={this.formatedData} title='Export'
                                showConfidenceInterval={checked} domain={[left, right]} showAreaOnConfidenceInterval={true} />
                            <Graph feature="inflation" data={this.formatedData} title='Inflation'
                                showConfidenceInterval={checked} domain={[left, right]} showAreaOnConfidenceInterval={true} />
                            <Graph feature="ipcn" data={this.formatedData} title='IPCN'
                                showConfidenceInterval={checked} domain={[left, right]} showAreaOnConfidenceInterval={true} />

                        </div>
                    </TabPanel>
                </Tabs>

            </div>
        );

    }
}

export default Caroussel