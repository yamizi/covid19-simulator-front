import React from "react"

import PropTypes from "prop-types"
import styled from "@emotion/styled"
import moment from "moment"

import ReactDataGrid from "react-data-grid"
import { Editors } from "react-data-grid-addons"
import Loader from "react-loader-spinner"

import {
    AddCircleRounded,
    RemoveCircle,
    PlayCircleFilledWhite,
    CloudDownloadRounded,
    Help,
    ExpandMore,
} from "@material-ui/icons"
import {
    Grid,
    withStyles,
    MenuItem,
    FormControl,
    // FormHelperText,
    // Select,
    Toolbar,
    AppBar,
    IconButton,
    Menu,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from "@material-ui/core"

import GridDatePicker from "./griddatepicker"
import GridRangeValues from "./gridrangevalue"
import GridCheckBox from "./gridcheckbox"
import InputTutorial from "./inputTutorial"
import LoadSaveDialog from "./load_save_scenarios"
import { /* countries, */ scenarios, measureTypes } from "./constants"

import API from "./api"
import Chart from "./chart"

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

const measureTypeEditor = <DropDownEditor options={measureTypes} />

const columns = [
    {
        key: "measure",
        name: "Measure",
        editor: measureTypeEditor,
    },
    { key: "date", name: "Date", editable: true, editor: <GridDatePicker /> },
    {
        key: "value",
        name: "Value",
        editor: <GridCheckBox />,
        editable: true,
    },
]

class Covid19Form extends React.Component {
    constructor(props) {
        super(props)
        //localStorage.clear()
        this.state = {
            countryName_1: "Luxembourg",
            countryName_2: "Luxembourg",
            rows_1: [],
            rows_2: [],
            selectedIndexes_1: [],
            selectedIndexes_2: [],
            increment_1: 0,
            increment_2: 0,
            reproduction_path: "",
            case_path: "",
            hospital_path: "",
            critical_path: "",
            death_path: "",
            data_json_1: "",
            data_json_2: "",
            loading_1: false,
            loading_2: false,
            menuAnchorEl_1: null,
            menuAnchorEl_2: null,
            inputTutorial: false,
            scenarios: scenarios,
            date_1: moment().format("YYYY-MM-DD"),
            date_2: moment().format("YYYY-MM-DD"),
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
                    date: this.state.date_1,
                    value: 100,
                },
            ],
            increment_1: previousState.increment_1 + 1,
        }))
    }

    handleNewMeasureClick_2 = () => {
        this.setState(previousState => ({
            rows_2: [
                ...previousState.rows_2,
                {
                    id: previousState.increment_2,
                    measure: "Belgium border",
                    date: this.state.date_2,
                    value: 100,
                },
            ],
            increment_2: previousState.increment_2 + 1,
        }))
    }

    handleDeleteMeasureClick_1 = () => {
        var new_rows = []
        for (var i = 0; i < this.state.rows_1.length; i++) {
            if (this.state.selectedIndexes_1.indexOf(i) === -1) {
                new_rows.push(this.state.rows_1[i])
            }
        }
        this.setState(previousState => ({
            rows_1: new_rows,
            selectedIndexes_1: [],
        }))
    }

    handleDeleteMeasureClick_2 = () => {
        var new_rows = []
        for (var i = 0; i < this.state.rows_2.length; i++) {
            if (this.state.selectedIndexes_2.indexOf(i) === -1) {
                new_rows.push(this.state.rows_2[i])
            }
        }
        this.setState(previousState => ({
            rows_2: new_rows,
            selectedIndexes_2: [],
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

    handleMenuClose_1 = () => {
        this.setState(() => ({ menuAnchorEl_1: null }))
    }

    handleMenuClose_2 = () => {
        this.setState(() => ({ menuAnchorEl_2: null }))
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

    handleScenarioClick_2 = event => {
        const scenario = this.state.scenarios.filter(
            (v, i) => v.id === event.currentTarget.id
        )
        this.setState(() => ({
            rows_2: scenario[0].mitigations,
        }))
        this.handleMenuClose_2()
    }

    onGridRowsUpdated_1 = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows_1 = state.rows_1.slice()
            for (let i = fromRow; i <= toRow; i++) {
                rows_1[i] = { ...rows_1[i], ...updated }
            }
            return { rows_1 }
        })
    }

    onGridRowsUpdated_2 = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows_2 = state.rows_2.slice()
            for (let i = fromRow; i <= toRow; i++) {
                rows_2[i] = { ...rows_2[i], ...updated }
            }
            return { rows_2 }
        })
    }

    onRowsSelected_1 = rows => {
        var selectedIdx = rows.map(r => r.rowIdx)
        this.setState({
            selectedIndexes_1: this.state.selectedIndexes_1.concat(selectedIdx),
        })
    }

    onRowsSelected_2 = rows => {
        var selectedIdx = rows.map(r => r.rowIdx)
        this.setState({
            selectedIndexes_2: this.state.selectedIndexes_2.concat(selectedIdx),
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

    onRowsDeselected_2 = rows => {
        let rowIndexes = rows.map(r => r.rowIdx)
        this.setState({
            selectedIndexes_2: this.state.selectedIndexes_2.filter(
                i => rowIndexes.indexOf(i) === -1
            ),
        })
    }

    changeName_1 = event => {
        this.setState({ countryName_1: event.target.value })
    }

    changeName_2 = event => {
        this.setState({ countryName_2: event.target.value })
    }

    handleHelpMeasure = () => {
        this.savedState = this.state
        this.setState({ inputTutorial: true })
    }

    callbackHelpMeasure = () => {
        this.setState({ ...this.savedState, inputTutorial: false })
        this.savedState = null
    }

    handleSubmit_1 = () => {
        const selectedLines = this.state.rows_1.filter(
            value => this.state.selectedIndexes_1.indexOf(value.id) !== -1
        )
        const measures = selectedLines.map(e => e.measure)
        const dates = selectedLines.map(e => e.date)
        const values = selectedLines.map(e => e.value)

        console.log(measures, dates, values)

        this.setState({
            reproduction_path: "",
            case_path: "",
            hospital_path: "",
            critical_path: "",
            death_path: "",
            loading_1: true,
        })

        /* API.post(`predict`, {
            country_name: this.state.countryName_1,
            measures: measures,
            dates: dates,
            values: values,
        }).then(res => {
            let df = res.data.df
            const max_herd = Math.ceil(
                Math.max.apply(
                    Math,
                    df.map(function(o) {
                        return o.Herd_immunity
                    })
                )
            )
            df.forEach(entry => (entry.Date = new Date(entry.Date)))
            df.forEach(entry => (entry.MaxHerd_immunity = max_herd))

            this.setState({
                data_json_1: df,
                loading_1: false,
            })
            //console.log(res.data.path, this.state)
        }) */
    }

    handleSubmit_2 = () => {
        const selectedLines = this.state.rows_2.filter(
            value => this.state.selectedIndexes_2.indexOf(value.id) !== -1
        )
        const measures = selectedLines.map(e => e.measure)
        const dates = selectedLines.map(e => e.date)
        const values = selectedLines.map(e => e.value)

        this.setState({
            reproduction_path: "",
            case_path: "",
            hospital_path: "",
            critical_path: "",
            death_path: "",
            loading_2: true,
        })

        /* API.post(`predict`, {
            country_name: this.state.countryName_2,
            measures: measures,
            dates: dates,
            values: values,
        }).then(res => {
            let df = res.data.df
            const max_herd = Math.ceil(
                Math.max.apply(
                    Math,
                    df.map(function(o) {
                        return o.Herd_immunity
                    })
                )
            )

            df.forEach(entry => (entry.Date = new Date(entry.Date)))
            df.forEach(entry => (entry.MaxHerd_immunity = max_herd))

            this.setState({
                data_json_2: df,
                loading_2: false,
            })
            //console.log(res.data.path, this.state)
        }) */
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

    data_to_save = (name, num = 1) => {
        let { scenarios } = this.state
        const rows = num === 1 ? this.state.rows_1 : this.state.rows_2
        const selectedIndexes =
            num === 1
                ? this.state.selectedIndexes_1
                : this.state.selectedIndexes_2
        let data = rows.filter(
            value => selectedIndexes.indexOf(value.id) !== -1
        )

        name = name !== "" ? name : new Date().toISOString()

        let ids = []
        for (let x of this.state.scenarios) {
            ids.push(x.id)
        }

        if (ids.some(v => v === name)) {
            scenarios.forEach(v => {
                if (v.id === name) {
                    v.mitigations = data
                }
            })
        } else {
            scenarios.push({ id: name, mitigations: data })
        }
        return scenarios
    }

    data_to_load = () => {
        const data = JSON.parse(localStorage.getItem("data_saved"))
        this.setState((prevState, props) => ({
            scenarios: data || prevState.scenarios,
        }))
    }

    row_renderer = ({ renderBaseRow, ...props }) => {
        const two_values = [
            "Belgium border",
            "French border",
            "German border",
            "Parks",
            "Travel allowed",
            "Strict Respect of Government Measures",
            "Public Gathering",
        ]
        const three_values = ["Economic Activity Restriction"]
        const four_values = ["Schools"]
        const five_values = ["Private Social Gathering"]
        let row = {}

        if (
            two_values.some(
                v => v.toLowerCase() === props.row.measure.toLowerCase()
            )
        ) {
            const value =
                typeof props.row.value === "number" && props.row.value !== null
                    ? props.row.value
                    : 0
            console.log("row value", value, props.row.value)
            row = {
                id: props.row.id,
                measure: props.row.measure,
                date: props.row.date,
                value: (
                    <GridRangeValues
                        value={value}
                        step={1}
                        marks={[
                            { value: 0, label: "Open" },
                            { value: 100, label: "Close" },
                        ]}
                    />
                ),
            }
        } else if (
            three_values.some(
                v => v.toLowerCase() === props.row.measure.toLowerCase()
            )
        ) {
            const value =
                typeof props.row.value === "number" && props.row.value !== null
                    ? props.row.value
                    : 0
            row = {
                id: props.row.id,
                measure: props.row.measure,
                date: props.row.date,
                value: (
                    <GridRangeValues
                        value={value}
                        step={2}
                        marks={[
                            { value: 0, label: "None" },
                            { value: 50, label: "Full" },
                            { value: 100, label: "Mixed" },
                        ]}
                    />
                ),
            }
        } else if (
            four_values.some(
                v => v.toLowerCase() === props.row.measure.toLowerCase()
            )
        ) {
            const value =
                typeof props.row.value === "number" && props.row.value !== null
                    ? props.row.value
                    : 0
            row = {
                id: props.row.id,
                measure: props.row.measure,
                date: props.row.date,
                value: (
                    <GridRangeValues
                        value={value}
                        step={3}
                        marks={[
                            { value: 0, label: "Open" },
                            { value: 33, label: "OWSD" },
                            { value: 66, label: "PO" },
                            { value: 100, label: "Close" },
                        ]}
                    />
                ),
            }
        } else if (
            five_values.some(
                v => v.toLowerCase() === props.row.measure.toLowerCase()
            )
        ) {
            const value =
                typeof props.row.value === "number" && props.row.value !== null
                    ? props.row.value
                    : 0
            row = {
                id: props.row.id,
                measure: props.row.measure,
                date: props.row.date,
                value: (
                    <GridRangeValues
                        value={value}
                        step={4}
                        marks={[
                            { value: 0, label: "None" },
                            { value: 25, label: "5P" },
                            { value: 50, label: "10P" },
                            { value: 75, label: "20P" },
                            { value: 100, label: "No R" },
                        ]}
                    />
                ),
            }
        }
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
                        //rowRenderer={this.row_renderer}
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
                        rowSelection={{
                            showCheckbox: true,
                            onRowsSelected:
                                num === 1
                                    ? this.onRowsSelected_1
                                    : this.onRowsSelected_2,
                            onRowsDeselected:
                                num === 1
                                    ? this.onRowsDeselected_1
                                    : this.onRowsDeselected_2,
                            selectBy: {
                                indexes:
                                    num === 1
                                        ? this.state.selectedIndexes_1
                                        : this.state.selectedIndexes_2,
                            },
                        }}
                    />
                </FormControl>
                <LoadSaveDialog
                    num={num}
                    action={"save"}
                    data_to_save={this.data_to_save}
                />
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
                        <Chart
                            num={num}
                            data={
                                num === 1
                                    ? this.state.data_json_1
                                    : this.state.data_json_2
                            }
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
                        <InputTutorial
                            run={this.state.inputTutorial}
                            callback={this.callbackHelpMeasure}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {[1, 2].map((value, indice) => (
                            <ExpansionPanel
                                key={indice}
                                color={"grey"}
                                square={true}
                                defaultExpanded={value === 1 ? true : false}
                            >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    Scenario {value}
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid item xs={6}>
                                        {this.render_grid(value)}
                                    </Grid>
                                    <Grid item xs={5}>
                                        {this.render_graph(value)}
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))}
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
