import React from 'react'
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Disclaimer from "../components/disclaimer"

import LoadableReborn from '../components/lodableReborn'

const Content = styled.div`
  margin: 0 auto;
  max-width: 2000px;
  padding: 1.45rem 1.0875rem;`



function Reborn() {
    return (
        <Layout>
            <SEO title="Reborn" />
            <Disclaimer />
            <Content>
                <h1>COVID-19 Adaptive Exit Strategies Finder</h1>
                <LoadableReborn/>
            </Content>
        </Layout>
    )
}

export default Reborn