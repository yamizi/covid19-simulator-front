import React from 'react'
import moment from "moment"
import TextField from '@material-ui/core/TextField';
import API from "./api"


class UserDate extends React.Component {

    constructor(props) {
        super(props)
        // Make default value for dates.
        var maxDate = moment('2020-08-01').format('YYYY-MM-DD');
        var minDate = moment('2020-05-30').format('YYYY-MM-DD');
        this.previousValue = moment('2020-08-01').format('YYYY-MM-DD');

        this.state = {
            maxDate: maxDate,
            minDate: minDate,
            date: maxDate
        }

        this.getMaxDate();
    }

    getMaxDate(){
        console.log('[+] API call for dates !')
        API.post(`reborn_api_limit`, {
            
        }).then(res => {
            console.log(res.data);
            let max_date = res.data.max_date
            let min_date = res.data.min_date
            this.setState({
                maxDate:moment(max_date).format('YYYY-MM-DD'),
                minDate:moment(min_date).format('YYYY-MM-DD')
            })
        })
    }

    logUserError(message){
        alert(message);
    }

    updateDateState(newDate) {
        const maxDate = this.state.maxDate;
        const minDate = this.state.minDate;

        console.log(minDate);
        console.log(maxDate);

        console.log(newDate.target);


        console.log(maxDate >= newDate && minDate <= newDate);

        if(maxDate >= newDate && minDate <= newDate){
            this.previousValue = newDate;
            this.setState({
                date: newDate
            });
            if(typeof this.props.updateCallback === "function"){
                this.props.updateCallback(newDate);
            }
        }else{
            this.logUserError("The date must be between " + minDate + " and " + maxDate )
            this.setState({
                date:this.previousValue
            })
        }

    }

    render() {
        return(
        <>
            <p>Date of application for all measures: </p>
            <form noValidate>
                <TextField
                    id="date"
                    label=''
                    type="date"
                    defaultValue={moment(this.state.date).format('YYYY-MM-DD')}
                    value={moment(this.state.date).format('YYYY-MM-DD')}
                    onChange={(e) => {
                        this.updateDateState(e.target.value);
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        </>)
    }

}


export default UserDate;
