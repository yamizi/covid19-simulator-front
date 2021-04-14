import React from "react"

import PropTypes from "prop-types"
import styled from "@emotion/styled"
import moment from "moment"

import ReactDataGrid from "react-data-grid"
import { Editors } from "react-data-grid-addons"
import Loader from "react-loader-spinner"
import Caroussel from './carrousel'
import UserDate from './userDate'

import {
    AddCircleRounded,
    RemoveCircle,
    PlayCircleFilledWhite,
    CloudDownloadRounded,
    Help,
} from "@material-ui/icons"

import {
    Grid,
    withStyles,
    MenuItem,
    FormControl,
    Toolbar,
    AppBar,
    IconButton,
    Menu,
} from "@material-ui/core"

import GridRangeValues from "./gridrangevalue"
import RebornInputTutorial from "./rebornInputTutorial"
import { defaultRebornMeasureTypes, rebornScenarios, RebornMeasureTypes, rebornMeasureToApiMeasures, marksToApiValue } from "./constants"

import API from "./api"

const styles = () => ({
    left: {
        flexGrow: 1,
    },
})

const HeaderAuthors = styled.h3`
    margin-top: 10px;
    color: #606060;
`

const { DropDownEditor } = Editors

const measureTypeEditor = <DropDownEditor options={RebornMeasureTypes} />

const columns = [
    {
        key: "measure",
        name: "Measure",
        editor: measureTypeEditor,
    },
    {
        key: "value",
        name: "Value",
        editor: <GridRangeValues />,
        editable: true,
    },
]

class Covid19Form extends React.Component {
    constructor(props) {
        super(props)
        this.global_date_1 = moment('2021-01-01').format("YYYY-MM-DD");
        this.state = {
            countryName_1: "Luxembourg",
            rows_1: defaultRebornMeasureTypes,
            selectedIndexes_1: [],
            increment_1: 0,
            reproduction_path: "",
            case_path: "",
            hospital_path: "",
            critical_path: "",
            death_path: "",
            data_json_1: "",
            loading_1: false,
            menuAnchorEl_1: null,
            inputTutorial: false,
            scenarios: rebornScenarios,
            date_1: this.global_date_1,
        }
        this.savedState = null
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value,
        })
    }

    handleNewMeasureClick_1 = () => {
        this.setState(previousState => ({
            rows_1: [
                ...previousState.rows_1,
                {
                    id: previousState.increment_1,
                    measure: "Belgium border",
                    date: this.global_date_1,
                    value: 0,
                    label: 'Open'
                },
            ],
            increment_1: previousState.increment_1 + 1,
        }))
    }

    handleDeleteMeasureClick_1 = () => {
        var new_rows = this.state.rows_1;
        new_rows.pop();

        this.setState(previousState => ({
            rows_1: new_rows,
            selectedIndexes_1: [],
        }))
    }

    handleLoadMenuOpen = event => {
        this.data_to_load()
        const id = event.currentTarget.id
        id === "covid-load-measure-1"
            ? this.setState(() => ({
                menuAnchorEl_1: document.getElementById(id),
            }))
            : this.setState(() => ({
                menuAnchorEl_2: document.getElementById(id),
            }))
    }

    onSliderValueChange = (id, newValue, newLabel) => {
        const findId = (element) => element.id === id;

        var state = this.state.rows_1;
        let index = state.findIndex(findId);

        state[index].value = newValue;
        state[index].label = newLabel

        this.setState({
            rows_1: state
        });
    }


    updateDateState(newDate) {
        this.setState({
            date_1: newDate
        })
    }



    handleMenuClose_1 = () => {
        this.setState(() => ({ menuAnchorEl_1: null }))
    }

    isLoadMenuOpen = num => {
        return num === 1
            ? this.state.menuAnchorEl_1 != null
            : this.state.menuAnchorEl_2 != null
    }

    handleScenarioClick_1 = event => {
        const scenario = this.state.scenarios.filter(
            (v, i) => v.id === event.currentTarget.id
        )

        this.setState(() => ({
            rows_1: scenario[0].mitigations,
        }))

        this.handleMenuClose_1()


    }

    onGridRowsUpdated_1 = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows_1 = state.rows_1.slice()
            for (let i = fromRow; i <= toRow; i++) {
                rows_1[i] = { ...rows_1[i], ...updated }
            }

            return { rows_1: rows_1 }
        })
    }


    onRowsSelected_1 = rows => {
        var selectedIdx = rows.map(r => r.rowIdx)
        this.setState({
            selectedIndexes_1: this.state.selectedIndexes_1.concat(selectedIdx),
        })
    }

    onRowsDeselected_1 = rows => {
        let rowIndexes = rows.map(r => r.rowIdx)
        this.setState({
            selectedIndexes_1: this.state.selectedIndexes_1.filter(
                i => rowIndexes.indexOf(i) === -1
            ),
        })
    }

    handleHelpMeasure = () => {
        this.savedState = this.state
        this.setState({ inputTutorial: true })
    }

    callbackHelpMeasure = () => {
        this.setState({ ...this.savedState, inputTutorial: false })
        this.savedState = null
    }


    isNumeric(str) {
        if (typeof str != "string") return false
        return !isNaN(str) && !isNaN(parseFloat(str))
    }

    handleSubmit_1 = () => {
        var measures = this.state.rows_1.map(e => rebornMeasureToApiMeasures[e.measure]);
        const dates = [this.state.date_1];
        var values = this.state.rows_1.map(e => e.label);
        values = values.map((v) => (typeof v === "string") ? v.toLowerCase() : v);

        for (let i = 0; i < measures.length; i++) {
            var tmp_measure = measures[i];

            if (tmp_measure in marksToApiValue) {
                let tmp_value = marksToApiValue[tmp_measure][values[i]];
                values[i] = tmp_value;
            }
        }

        this.setState({
            reproduction_path: "",
            case_path: "",
            hospital_path: "",
            critical_path: "",
            death_path: "",
            loading_1: true,
        })

        API.post(`predict_reborn`, {
            country_name: this.state.countryName_1,
            measures: [measures],
            dates: dates,
            values: [values],
        }).then(res => {
            let df = res.data.df
            // const max_herd = Math.ceil(
            //     Math.max.apply(
            //         Math,
            //         df.map(function (o) {
            //             return o.Herd_immunity
            //         })
            //     )
            // )
            df.forEach(entry => (entry.Date = new Date(entry.Date)))
            // df.forEach(entry => (entry.MaxHerd_immunity = max_herd))

            this.setState({
                data_json_1: df,
                loading_1: false,
            })
        })

    }

    renderLoadMenu = (num = 1) => {
        return (
            <Menu
                anchorEl={
                    num === 1
                        ? this.state.menuAnchorEl_1
                        : this.state.menuAnchorEl_2
                }
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={num === 1 ? "load-menu-1" : "load-menu-2"}
                keepMounted
                variant={"selectedMenu"}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={this.isLoadMenuOpen(num)}
                onClose={
                    num === 1 ? this.handleMenuClose_1 : this.handleMenuClose_2
                }
            >
                {this.state.scenarios.map((v, i) => (
                    <MenuItem
                        key={i}
                        id={v.id}
                        onClick={
                            num === 1
                                ? this.handleScenarioClick_1
                                : this.handleScenarioClick_2
                        }
                    >
                        <p>{v.id}</p>
                    </MenuItem>
                ))}
            </Menu>
        )
    }


    data_to_load = () => {
        const data = JSON.parse(localStorage.getItem("data_saved"))
        this.setState((prevState, props) => ({
            scenarios: data || prevState.scenarios,
        }))
    }

    updateLabel(rowId, newLabel, newValue) {
        var row1 = this.state.rows_1;
        row1[rowId].label = newLabel;
        row1[rowId].value = newValue;
        this.state.rows_1 = row1;
    }


    row_renderer = ({ renderBaseRow, ...props }) => {

        const two_values = [
            "Belgium border",
            "French border",
            "German border",
            "Parks",
        ]

        const yes_no_values = [
            "Travel allowed",
            "Public Gathering",
            "Strict Respect of Government Measures"
        ]

        const three_values = ["Economic Activity Restriction"]
        const four_values = ["Schools"]
        const five_values = ["Private Social Gathering"]
        const range_values = {
            "Number of persons vaccinated per week": [0, 30000]
        }
        let row = {}

        if (
            two_values.some(
                v => v.toLowerCase() === props.row.measure.toLowerCase()
            )
        ) {
            var value =
                typeof props.row.value === "number" && props.row.value !== null
                    ? props.row.value
                    : 0

            const marks = [
                { value: 0, label: "Open" },
                { value: 100, label: "Close" },
            ];

            const labels = marks.map(m => m.label);

            if (labels.indexOf(props.row.label) === -1) {
                value = 0;
                props.row.label = marks[0].label;
            }

            row = {
                id: props.row.id,
                measure: props.row.measure,
                value: (
                    <GridRangeValues
                        onValueChange={this.onSliderValueChange}
                        id={props.row.id}
                        value={value}
                        step={null}
                        marks={marks}
                    />
                ),
            }

            this.updateLabel(props.row.id, props.row.label, value);

        } else if (
            yes_no_values.some(
                v => v.toLowerCase() === props.row.measure.toLowerCase()
            )
        ) {
            var value =
                typeof props.row.value === "number" && props.row.value !== null
                    ? props.row.value
                    : 0

            const marks = [
                { value: 0, label: "Yes" },
                { value: 100, label: "No" },
            ];

            const labels = marks.map(m => m.label);

            if (labels.indexOf(props.row.label) === -1) {
                value = 0;
                props.row.label = marks[0].label;
            }

            row = {
                id: props.row.id,
                measure: props.row.measure,
                value: (
                    <GridRangeValues
                        onValueChange={this.onSliderValueChange}
                        id={props.row.id}
                        value={value}
                        step={null}
                        marks={marks}
                    />
                ),
            }
            this.updateLabel(props.row.id, props.row.label, value);

        } else if (
            three_values.some(
                v => v.toLowerCase() === props.row.measure.toLowerCase()
            )
        ) {
            var value =
                typeof props.row.value === "number" && props.row.value !== null
                    ? props.row.value
                    : 0

            const marks = [
                { value: 0, label: "None" },
                { value: 50, label: "Full" },
                { value: 100, label: "Mixed" },
            ];

            const labels = marks.map(m => m.label);

            if (labels.indexOf(props.row.label) === -1) {
                value = 0;
                props.row.label = marks[0].label;
            }

            row = {
                id: props.row.id,
                measure: props.row.measure,
                value: (
                    <GridRangeValues
                        onValueChange={this.onSliderValueChange}
                        id={props.row.id}
                        value={value}
                        step={null}
                        marks={marks}
                    />
                ),
            }

            this.updateLabel(props.row.id, props.row.label, value);

        } else if (
            four_values.some(
                v => v.toLowerCase() === props.row.measure.toLowerCase()
            )
        ) {
            var value =
                typeof props.row.value === "number" && props.row.value !== null
                    ? props.row.value
                    : 0
            const marks = [
                { value: 0, label: "Open" },
                { value: 33, label: "OWSD" },
                { value: 66, label: "PO" },
                { value: 100, label: "Close" },
            ];

            const labels = marks.map(m => m.label);

            if (labels.indexOf(props.row.label) === -1) {
                value = 0;
                props.row.label = marks[0].label;
            }

            row = {
                id: props.row.id,
                measure: props.row.measure,
                value: (
                    <GridRangeValues
                        onValueChange={this.onSliderValueChange}
                        id={props.row.id}
                        value={value}
                        step={null}
                        marks={marks}
                    />
                ),
            }
        } else if (
            five_values.some(
                v => v.toLowerCase() === props.row.measure.toLowerCase()
            )
        ) {
            var value =
                typeof props.row.value === "number" && props.row.value !== null
                    ? props.row.value
                    : 0

            const marks = [
                { value: 0, label: "None" },
                { value: 25, label: "5P" },
                { value: 50, label: "10P" },
                { value: 75, label: "20P" },
                { value: 100, label: "No R" },
            ];

            const labels = marks.map(m => m.label);

            if (labels.indexOf(props.row.label) === -1) {
                value = 0;
                props.row.label = marks[0].label;
            }


            row = {
                id: props.row.id,
                measure: props.row.measure,
                value: (
                    <GridRangeValues
                        onValueChange={this.onSliderValueChange}
                        id={props.row.id}
                        value={value}
                        step={null}
                        marks={marks}
                    />
                ),
            }
            this.updateLabel(props.row.id, props.row.label, value);
        } else if (
            Object.keys(range_values).some(
                v => v.toLowerCase() === props.row.measure.toLowerCase()
            )
        ) {
            var value =
                typeof props.row.value === "number" && props.row.value !== null
                    ? props.row.value
                    : 0

            const marks = [
                { value: 0, label: 0 },
                { value: 100, label: 30000 },
            ];

            props.row.label = value;
            
            row = {
                id: props.row.id,
                measure: props.row.measure,
                value: (
                    <GridRangeValues
                        onValueChange={this.onSliderValueChange}
                        id={props.row.id}
                        value={value}
                        step={10}
                        marks={marks}
                    />
                ),
            }
        }
        this.updateLabel(props.row.id, props.row.label, value);
        props = { ...props, row }
        return <div>{renderBaseRow(props)}</div>
    }

    render_grid = (num = 1) => {
        const { classes } = this.props
        return (
            <Grid id={num === 1 ? "covid-form-1" : "covid-form-2"} item xs={12}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <div className={classes.left}>
                            <IconButton
                                id={
                                    num === 1
                                        ? "covid-add-measure-1"
                                        : "covid-add-measure-2"
                                }
                                edge="start"
                                className={classes.menuButton}
                                onClick={
                                    num === 1
                                        ? this.handleNewMeasureClick_1
                                        : this.handleNewMeasureClick_2
                                }
                                color="inherit"
                                aria-label="add"
                            >
                                <AddCircleRounded />
                            </IconButton>
                            <IconButton
                                id={
                                    num === 1
                                        ? "covid-remove-measure-1"
                                        : "covid-remove-measure-2"
                                }
                                edge="start"
                                className={classes.menuButton}
                                onClick={
                                    num === 1
                                        ? this.handleDeleteMeasureClick_1
                                        : this.handleDeleteMeasureClick_2
                                }
                                color="inherit"
                                aria-label="remove"
                            >
                                <RemoveCircle />
                            </IconButton>
                            <IconButton
                                id={
                                    num === 1
                                        ? "covid-load-measure-1"
                                        : "covid-load-measure-2"
                                }
                                edge="start"
                                className={classes.menuButton}
                                onClick={this.handleLoadMenuOpen}
                                color="inherit"
                                aria-label="load"
                                aria-haspopup="true"
                            >
                                <CloudDownloadRounded />
                            </IconButton>
                        </div>
                        <IconButton
                            id={
                                num === 1
                                    ? "covid-help-measure-1"
                                    : "covid-help-measure-2"
                            }
                            className={classes.menuButton}
                            onClick={this.handleHelpMeasure}
                            color="inherit"
                            aria-label="play"
                        >
                            <Help />
                        </IconButton>
                        <IconButton
                            id={
                                num === 1
                                    ? "covid-compute-measure-1"
                                    : "covid-compute-measure-2"
                            }
                            className={classes.menuButton}
                            onClick={
                                num === 1
                                    ? this.handleSubmit_1
                                    : this.handleSubmit_2
                            }
                            color="inherit"
                            aria-label="play"
                        >
                            <PlayCircleFilledWhite />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {this.renderLoadMenu(num)}

                <FormControl
                    onSubmit={
                        num === 1 ? this.handleSubmit_1 : this.handleSubmit_2
                    }
                    fullWidth={true}
                >
                    <ReactDataGrid
                        rowRenderer={this.row_renderer}
                        enableCellSelect={true}
                        columns={columns}

                        rowGetter={i =>
                            num === 1
                                ? this.state.rows_1[i]
                                : this.state.rows_2[i]
                        }

                        rowsCount={
                            num === 1
                                ? this.state.rows_1.length
                                : this.state.rows_2.length
                        }

                        onGridRowsUpdated={
                            num === 1
                                ? this.onGridRowsUpdated_1
                                : this.onGridRowsUpdated_2
                        }
                    />
                </FormControl>
            </Grid>
        )
    }

    render_graph = (num = 1) => {
        return (
            <Grid item xs={12}>
                {(num === 1 ? this.state.loading_1 : this.state.loading_2) && (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Loader
                            type="ThreeDots"
                            color="#54257c"
                            height="100"
                            width="100"
                        />
                    </div>
                )}
                {(num === 1
                    ? this.state.data_json_1
                    : this.state.data_json_2) &&
                    !(num === 1
                        ? this.state.loading_1
                        : this.state.loading_2) && (
                        <Caroussel data={this.state.data_json_1}
                        />
                    )}
                {this.state.reproduction_path !== "" && (
                    <img src={this.state.reproduction_path} alt="" />
                )}
                {this.state.case_path !== "" && (
                    <img src={this.state.case_path} alt="" />
                )}
                {this.state.hospital_path !== "" && (
                    <img src={this.state.hospital_path} alt="" />
                )}
                {this.state.critical_path !== "" && (
                    <img src={this.state.critical_path} alt="" />
                )}
                {this.state.death_path !== "" && (
                    <img src={this.state.death_path} alt="" />
                )}
            </Grid>
        )
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <HeaderAuthors>
                            By Serval & Trux research groups @ SnT, University
                            of Luxembourg
                        </HeaderAuthors>
                        <RebornInputTutorial
                            run={this.state.inputTutorial}
                            callback={this.callbackHelpMeasure}
                        />

                    </Grid>
                    <Grid container justify='center' item xs={12}>
                        <Grid container justify='center' direction="row" spacing={2}>
                            <Grid item xs={7}>
                                {this.render_grid(1)}
                            </Grid>
                            <Grid item xs={3}>
                                <div class="dateDiv">
                                    <UserDate updateCallback={this.updateDateState.bind(this)} />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            {this.render_graph(1)}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Covid19Form.propTypes = {
    classes: PropTypes.object.isRequired,
}

const Covid19Component = withStyles(styles)(Covid19Form)

export default Covid19Component
