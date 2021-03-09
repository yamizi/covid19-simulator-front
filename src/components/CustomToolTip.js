import React, { Component } from 'react'
import { makeCorrectStringFromDate } from '../script/dataManager'
import { allSectors } from '../components/constants'

import './Caroussel.css'


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

class CustomTooltip extends Component {


    convertToEasierForm(payload, showConfidenceInterval, featureToDisplay) {

        var finalObject = {}

        let strokes = payload.map(p => p.stroke);
        let values = payload.map(p => p.value);
        let names = payload.map(p => p.name);

        featureToDisplay.forEach((f) => {

            let fIndex = names.indexOf(f);

            finalObject[f] = {
                stroke: strokes[fIndex],
                value: values[fIndex]
            };

            if (showConfidenceInterval) {

                let fmaxIndex = names.indexOf(f + "_max");
                let fminIndex = names.indexOf(f + "_min");

                finalObject[f + "_max"] = {
                    stroke: strokes[fmaxIndex],
                    value: values[fmaxIndex]
                };

                finalObject[f + "_min"] = {
                    stroke: strokes[fminIndex],
                    value: values[fminIndex]
                };
            }

        });

        return finalObject;

    }


    render() {
        const { active, payload, label, showConfidenceInterval, features } = this.props;

        var featureToDisplay = allSectors;

        if (features.length > 0) {
            featureToDisplay = features;
        }

        if (active && payload && payload.length) {

            
            const fixedPayload = this.convertToEasierForm(payload, showConfidenceInterval, featureToDisplay);
            
            console.log(payload);
            console.log(fixedPayload);
            console.log(featureToDisplay);
            
            const fixedLabel = makeCorrectStringFromDate(label);

            var items = featureToDisplay.map((f) => {
                console.log(f);

                if (!showConfidenceInterval) {

                    return (
                        <Grid container justify="space-between" direction="row" spacing={0} xs={12} style={{ height: '20px' }}>
                            <Grid item xs={6}> <p style={{ color: fixedPayload[f].stroke }}> <b>{f}:</b> {fixedPayload[f].value.toFixed(2)}</p> </Grid>
                        </Grid>
                    )
                } else {

                    let pNormal = fixedPayload[f];
                    let pMax = fixedPayload[f+ '_max'];
                    let pMin = fixedPayload[f + '_min'];

                    return (
                        <Grid container justify="space-between" direction="row" spacing={0} xs={12} style={{ height: '20px' }}>
                            <Grid item xs={4}> <p style={{ color: pNormal.stroke }}> <b>{f}:</b> {pNormal.value.toFixed(2)}</p> </Grid>
                            <Grid item xs={4}> <p style={{ color: pMin.stroke }}> <b>{f + '_max'}:</b> {pMin.value.toFixed(2)}</p> </Grid>
                            <Grid item xs={4}> <p style={{ color: pMax.stroke }}> <b>{f + '_min'}:</b> {pMax.value.toFixed(2)}</p> </Grid>
                        </Grid>
                    )

                }

            })

            return (
                <div style={{ backgroundColor: '#ffffff', width: '400px', border: '1px solid' }}>
                    <b>{fixedLabel}</b>
                    {items}
                </div>
            );

        }
        return null;

    }
}

export default CustomTooltip;
