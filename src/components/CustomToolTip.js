import React, { Component } from 'react'
import { makeCorrectStringFromDate } from '../script/dataManager'
import { allSectors } from '../components/constants'

import './Caroussel.css'
import './customToolTip.css'

import {Grid} from "@material-ui/core"


var code_to_name = {
    "R_A":"AGRICULTURE, FORESTRY AND FISHING",
    "R_D":"ELECTRICITY, GAS, STEAM AND AIR CONDITIONING SUPPLY",
    "R_F":"CONSTRUCTION",
    "R_G":"WHOLESALE AND RETAIL TRADE...",
    "R_H":"TRANSPORTATION AND STORAGE",
    "R_I":"HORECA",
    "R_J":"INFORMATION AND COMMUNICATION",
    "R_K":"FINANCIAL AND INSURANCE ACTIVITIES",
    "R_M":"PROFESSIONAL, SCIENTIFIC AND TECHNICAL ACTIVITIES",
    "R_N":"ADMINISTRATIVE AND SUPPORT SERVICE ACTIVITIES",
    "R_O":"PUBLIC ADMINISTRATION AND DEFENCE",
    "R_P":"EDUCATION",
    "R_Q":"HUMAN HEALTH AND SOCIAL WORK ACTIVITIES",
    "R_S":"OTHER SERVICE ACTIVITIES"
};

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

    showObejctive(){
        return(
            <Grid item xs={12}  style={{height: '30px' }}> 
                <p style={{ color:"#33ff33"}}> 
                    <b>Objective:</b> 
                    {this.props.objective.toFixed(2)}
                </p> 
            </Grid>
        )
        
    }


    render() {
        const { active, payload, label, showConfidenceInterval, features, objective } = this.props;

        var featureToDisplay = allSectors;

        if (features.length > 0) {
            featureToDisplay = features;
        }

        if (active && payload && payload.length) {

            
            const fixedPayload = this.convertToEasierForm(payload, showConfidenceInterval, featureToDisplay);
            
            const fixedLabel = makeCorrectStringFromDate(label);

            var items = featureToDisplay.map((f) => {

                let name = code_to_name[f].toLowerCase();
                name = name.charAt(0).toUpperCase() + name.slice(1);

                if (!showConfidenceInterval) {

                    return (
                            <Grid item xs={12}  style={{height: '30px' }}> <p style={{ color: fixedPayload[f].stroke }}> <b>{name}:</b> {fixedPayload[f].value.toFixed(2)}</p> </Grid>
                        )
                } else {

                    let pNormal = fixedPayload[f];
                    let pMax = fixedPayload[f+ '_max'];
                    let pMin = fixedPayload[f + '_min'];
                    
                    return (
                            <Grid container xs={12}> 
                                <Grid item xs={12} style={{height:"30px"}}> 
                                    <p style={{ color: pNormal.stroke }}> 
                                        <b>{name}:</b> 
                                    </p> 
                                </Grid>
                                <Grid container justify="space-between" direction="row" spacing={0} xs={12} style={{height:"30px"}}>
                                    <Grid item xs={3}> <p style={{ color: pMin.stroke }}> <b>Min: </b>{pMin.value.toFixed(2)}       </p></Grid>
                                    <Grid item xs={3}> <p style={{ color: pNormal.stroke }}> <b>Normal: </b>{pNormal.value.toFixed(2)} </p></Grid>
                                    <Grid item xs={3}> <p style={{ color: pMax.stroke }}> <b>Max: </b>{pMax.value.toFixed(2)}       </p></Grid>
                                </Grid>
                            </Grid>
                    )

                }

            })

            return (
                <div style={{ backgroundColor:'#ffffff', width:'500px', border:'1px solid' }}>
                    <b>{fixedLabel}</b>
                    <Grid container spacing={0} xs={12}>
                        {(objective !== undefined && Number.isFinite(objective))?
                            this.showObejctive(objective)
                            :''
                        }
                        {items}
                    </Grid>
                </div>
            );

        }
        return null;

    }
}

export default CustomTooltip;
