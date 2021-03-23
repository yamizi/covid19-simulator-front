import React, { Component } from 'react';
import Graph from '../components/graph';
import DoubleAxisGraph from '../components/doubleAxisGraph';
import MultiLabelGraph from '../components/multiLabelGraph'

import { Brush, LineChart } from 'recharts';

import extractData from '../script/dataManager'

import { makeCorrectStringFromDate } from '../script/dataManager';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { allSectors } from '../components/constants'


class Caroussel extends Component {

    constructor(props) {
        super(props);
        this.data = props.data;
        this.formatedData = extractData(this.data);

        this.state = {
            checked: false,
            left: this.formatedData[0]['Date'],
            right: this.formatedData[this.formatedData.length - 1]['Date'],
            brushLeft: 0,
            brushRight: this.formatedData.length - 1
        };

        this.ref = React.createRef();

    }


    resetStates() {

        this.setState({
            checked: false,
            left: this.formatedData[0]['Date'],
            right: this.formatedData[this.formatedData.length - 1]['Date'],
            brushLeft: 0,
            brushRight: this.formatedData.length - 1
        })

        if(this.ref.current !== null){
            this.ref.current.resetGraph()
        }

        this.formatedData = this.formatedData.slice();
    }

    updateState(e) {
        this.setState(() => ({
            checked: e
        }));
    }

    updateGraphs(newLeftIndex, newRightIndex) {

        let newLeft = this.data[newLeftIndex];
        let newRight = this.data[newRightIndex];

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
        const { checked, left, right, brushLeft, brushRight } = this.state;

        return (
            <div style={{ marginTop: '20px', minHeight: '85vh' }}>


                {/* Here, we make sure that if the end user clicks on the fourth tab nothing appened. */}
                <Tabs onSelect={(selectedTab, lastTab) => { if (selectedTab === 3) return false; }}>
                    <TabList>
                        <Tab style={{ marginBottom: '0px' }}>Sanitary Indices</Tab>
                        <Tab style={{ marginBottom: '0px' }}>Reproduction rate by sectors</Tab>
                        <Tab style={{ marginBottom: '0px' }}>Economical indices</Tab>
                        <Tab style={{ marginBottom: '0px', padding: 0, float: "right" }}>
                            <div className='checkbox-wrapper unChecked'>
                                <label className='input-checkbox'>
                                    <input type='checkbox'
                                        checked={checked}
                                        onChange={(e) => {
                                            this.updateState(e.target.checked)
                                        }} />
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
                                showConfidenceInterval={checked} domain={[left, right]}
                                />

                            <Graph
                                className='cell'
                                feature="SimulationCritical_ALL" data={this.formatedData} title='Simulation critical'
                                showConfidenceInterval={checked} domain={[left, right]} showAreaOnConfidenceInterval={true} />

                            <Graph
                                className='cell'
                                feature="R_ALL" data={this.formatedData} title='Reproduction rate'
                                showConfidenceInterval={checked} domain={[left, right]} showAreaOnConfidenceInterval={false} 
                                objective={1}
                                />

                        </div>
                    </TabPanel>

                    <TabPanel>
                        <MultiLabelGraph features={allSectors} data={this.formatedData} title='Reproduction rate by sectors'
                            showConfidenceInterval={checked} domain={[left, right]} ref={this.ref} objective={1}/>
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