import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import Accordion from '../components/Accordion'

// Export Template for use in CMS preview
export const ConcertsPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  concerts,
  body
}) => (
  <main>
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
    <section className="section">
      <div className="container">
        <Accordion items={concerts} />
      </div>
    </section>
  </main>
)

const ConcertsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ConcertsPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ConcertsPage

export const pageQuery = graphql`
  query ConcertsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        concerts {
          title
          description
        }
      }
    }
  }
`
