import React from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function LoadingState() {
    return (

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <strong style={{marginRight: '10px'}}>Computing best scenario...</strong>
            <Spinner animation="border" />
        </div>
    )


}