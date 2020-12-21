import React from 'react'
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Disclaimer from "../components/disclaimer"

import Carroussel from "../components/caroussel"


const Content = styled.div`
  margin: 0 auto;
  max-width: 2000px;
  padding: 1.45rem 1.0875rem;`


const APIREQUEST = {
    "dates": ["2020-08-15", "2020-08-30"],
    "measures": [["b_be", "b_fr"]],
    "values": [["close", "close"]]
}

const APIURL = 'http://localhost:8080/predict';

function Reborn() {
    return (
        <Layout>
            <SEO title="Covid19" />
            <Disclaimer />
            <Content>
                <h1>COVID-19 Adaptive Exit Strategies Finder</h1>
                <Carroussel apiRequest={APIREQUEST} apiUrl={APIURL} />
            </Content>
        </Layout>
    )
}

export default Reborn