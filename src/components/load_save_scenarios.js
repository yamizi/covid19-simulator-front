import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Alert from "@material-ui/lab/Alert"
import Popover from "@material-ui/core/Popover"

//import { connect } from "react-redux"

export default class LoadSaveDialog extends React.Component {
    state = {
        open: false,
        name: "",
        error: false,
        save_ok: false,
        load_ok: false,
        anchor: null,
    }

    onValueChange = event => {
        this.setState({ name: event.target.value })
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleSave = event => {
        let data = this.props.data_to_save(this.state.name, this.props.num)
        if (data.length !== 0) {
            localStorage.setItem("data_saved", JSON.stringify(data))
            this.setState({
                saved_ok: true,
                anchor: event.currentTarget,
            })
            this.handleClose()
        } else {
            this.setState({ error: true })
        }
    }

    handleLoad = () => {
        if (this.state.name !== "") {
            this.props.data_to_load(localStorage.getItem(this.state.name))
        } else {
            this.props.data_to_load(localStorage.getItem("save"))
        }
        this.handleClose()
    }

    popover_close = () => {
        this.setState({ anchor: null })
    }

    render() {
        return (
            <div>
                <Button
                    variant="text"
                    color="primary"
                    onClick={this.handleClickOpen}
                >
                    {this.props.action === "save" ? "Save" : "Load"}
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {this.props.action === "save"
                            ? "Save the current scenario"
                            : "Load a scenario"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.action === "save"
                                ? "You can save the current scenarios. Name the scenario"
                                : "Select a scenario for loading"}
                            {this.state.error && (
                                <Alert severity="error">
                                    No row or country are selected to save.
                                </Alert>
                            )}
                        </DialogContentText>
                        <TextField
                            value={this.state.name}
                            onChange={this.onValueChange}
                            margin="dense"
                            name={"scenario"}
                            id="name"
                            label="Scenario Name"
                            type="text"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        {this.props.action === "save" ? (
                            <Button onClick={this.handleSave} color="primary">
                                Save
                            </Button>
                        ) : (
                            <Button onClick={this.handleLoad} color="primary">
                                Load
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
                {this.state.save_ok && (
                    <Popover
                        open={this.state.save_ok}
                        anchorEl={this.state.anchor}
                        color={"lightblue"}
                        onClose={this.popover_close}
                        anchorOrigin={{
                            vertical: "center",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "center",
                            horizontal: "center",
                        }}
                    >
                        Scenario has been saved
                    </Popover>
                )}
            </div>
        )
    }
}
