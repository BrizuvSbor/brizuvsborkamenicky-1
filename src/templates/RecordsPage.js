import React from 'react'
import { graphql } from 'gatsby'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './RecordsPage.css'

// Export Template for use in CMS preview
export const RecordsPageTemplate = ({ title, links, body }) => (
  <section className="section">
    <div className="container">
      <Content source={body} />
      <div className="RecordsPage">
        <div className="RecordsPage--Grid">
          {!!links.length ?
            links.map((link, index) => {
              return (
                <iframe
                  title={index}
                  height="315"
                  src={link}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              )
            }) : "Aktuálně nemáme žádné záznamy z koncertů."} 
        </div>
      </div>
    </div>
  </section>
)

const RecordsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <RecordsPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default RecordsPage

export const pageQuery = graphql`
  query RecordsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        links
      }
    }
  }
`
