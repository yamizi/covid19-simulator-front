import React from 'react';
import { CircularProgress } from '@material-ui/core';


export default function LoadingState() {
    return (

        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'100px' }}>
            <strong style={{marginRight: '10px', fontSize:'xx-large'}}>Computing best scenario...</strong>
            <CircularProgress color='inherit' thickness={5} size={30}/>

        </div>
    )


}