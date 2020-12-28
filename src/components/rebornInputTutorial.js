import React, { Component } from "react"
import ReactJoyride, { ACTIONS, STATUS } from "react-joyride"

class RebornInputTutorial extends Component {
    constructor(props) {
        super(props)

        this.state = {
            run: false,
            steps: [],
            callback: props.callback,
        }
    }

    componentWillReceiveProps = props => {
        if (props && props.run) {
            this.setState({
                run: props.run,
                steps: [
                    {
                        target: "#covid-form-1",
                        title: "Scenario Builder",
                        content: (
                            <React.Fragment>
                                This table contains all the measure that will be
                                applied. A measure is defined by a type of
                                activity, a date at which it starts and a value
                                defining the intensity of the activity. By
                                inserting rows which define specific measure,
                                you can run simulation with different scenarios
                                in order to assess the impact of different
                                strategies. Note that all the measure that this
                                model allow to simulate concerne the
                                modification of mobility, schools teaching methods,
                                and also social distancing.
                            </React.Fragment>
                        ),
                        disableBeacon: true,
                    },
                    {
                        target:
                            "#covid-form-1 > div > div.react-grid-Container > div > div > div.react-grid-Header > div > div > div:nth-child(1) > div",
                        title: "Measure",
                        content: (
                            <React.Fragment>
                                <p>
                                    The type of activity for which you wish to
                                    change the intensitiy.
                                </p>
                                <ul>
                                    <li>
                                        <strong>Belgium, German and French border :</strong> Mobility
                                        for specific neighboring countries.
                                    </li>
                                    <li>
                                        <strong>Schools :</strong> Defining the school activity.
                                    </li>
                                    <li>
                                        <strong>Public Gathering :</strong> To prevent or not public events for example.
                                    </li>
                                    <li>
                                        <strong>Private Social Gathering :</strong> Defining the number of people 
                                        we are able to see.  
                                    </li>
                                    <li>
                                        <strong>Parks :</strong> To allow park entrance or not. 
                                    </li>
                                    <li>
                                        <strong>Travel Allowed :</strong> Allowing the population to travel.   
                                    </li>
                                    <li>
                                        <strong>Economic Activity Restriction :</strong> Modulate the economic activity 
                                        of the country (e.g. restaurant, museum...).
                                    </li>
                                    <li>
                                        <strong>Strict Respect of Government Measures :</strong> Defining if the above measures are
                                        respected.
                                    </li>
                                </ul>
                            </React.Fragment>
                        ),
                        placement: "right",
                    },
                    {
                        target:
                            "#covid-form-1 > div > div.react-grid-Container > div > div > div.react-grid-Header > div > div > div:nth-child(2) > div",
                        title: "Date",
                        content: (
                            <React.Fragment>
                                Date at which the new value for the type of
                                activity selected should be set. There is no
                                concept of an end date, and to end a measure,
                                create a new row for the same type of activity
                                with a different value.
                            </React.Fragment>
                        ),
                    },
                    {
                        target:
                            "#covid-form-1 > div > div.react-grid-Container > div > div > div.react-grid-Header > div > div > div:nth-child(3) > div",
                        title: "Value",
                        content: (
                            <React.Fragment>
                                Each value are represented by a slider. This 
                                slider will dynamically change depending 
                                on the selected measure. Each modified slider
                                will change the behaviour of the simulation.
                            </React.Fragment>
                        ),
                    },
                    {
                        target: "#covid-add-measure-1",
                        title: "Add new row",
                        content: (
                            <React.Fragment>
                                When clicking on the add button, a new row is
                                added at the end of the table containing all the
                                measures.
                            </React.Fragment>
                        ),
                    },
                    {
                        target: "#covid-remove-measure-1",
                        title: "Remove selected rows",
                        content: (
                            <React.Fragment>
                                When clicking on the remove button, all selected
                                rows are deleted from the table containing all
                                the measures.
                            </React.Fragment>
                        ),
                    },
                    {
                        target: "#covid-load-measure-1",
                        title: "Load predefined scenario",
                        content: (
                            <React.Fragment>
                                <p>
                                    When clicking on the load measure button, a
                                    list of predefined measure appears. If you
                                    click on one of this measure, it will update
                                    the table and replace anything that it is
                                    containing by the predefined scenario that
                                    was selected from the popup. The goal of
                                    this predefined strategies is to help you
                                    start creating your own by providing easy to
                                    use and understand example. Here, where
                                    provide two examples:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Brutal Strategie:</strong> All
                                        confinement measures are apllied at the lowest
                                        value on the May 11, 2020.
                                    </li>
                                    <li>
                                        <strong>Cyclic Strategie:</strong> All
                                        measure a lifted periodically before
                                        being put back in place in order to
                                        smooth the effect.
                                    </li>
                                </ul>
                            </React.Fragment>
                        ),
                    },
                    {
                        target: "#covid-compute-measure-1",
                        title: "Run simulation",
                        content: (
                            <React.Fragment>
                                Once you are satisfied with your scenario, you
                                can click the play button to launche the
                                simulation. This button triggers a call to our
                                servers which will run the simulation and return
                                a result. This process typically takes less than
                                10 seconds. Once the simulation is ready, the
                                results are presented in a chart bellow
                                this form, depicting the evolution of different
                                metrics, such as the number of cases, number of
                                death, etc. over the simulation period.
                            </React.Fragment>
                        ),
                    }
                ],
            })
        } else {
            this.setState({
                run: props.run,
                steps: [],
            })
        }
    }

    handleJoyrideCallback = data => {
        if (
            [STATUS.FINISHED, STATUS.SKIPPED].includes(data["status"]) ||
            ACTIONS.CLOSE === data["action"]
        ) {
            this.setState({ run: false, steps: [] })
            this.state.callback("end", null)
        }
    }

    render = () => {
        return (
            <ReactJoyride
                run={this.state.run}
                steps={this.state.steps}
                callback={this.handleJoyrideCallback}
                disableBeacon
                disableOverlayClose
                continuous
                showProgress
            />
        )
    }
}

export default RebornInputTutorial
