import React from 'react'
import { User, Phone, Mail } from 'react-feather'
import { graphql } from 'gatsby'

import FormSimpleAjax from '../components/FormSimpleAjax'
import Content from '../components/Content'
import Layout from '../components/Layout'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  body,
  boss,
  phone,
  email
}) => (
  <main className="Contact">
    <section className="section Contact--Section1">
      <div className="container Contact--Section1--Container">
        <div>
          <Content source={body} />
          <div className="Contact--Details">
            {boss && (
              <div className="Contact--Details--Item">
                <User /> {boss}
              </div>
            )}
            {phone && (
              <div className="Contact--Details--Item">
                <Phone /> {phone}
              </div>
            )}
            {email && (
              <div className="Contact--Details--Item">
                <Mail /> {email}
              </div>
            )}
          </div>
        </div>

        <div>
          <FormSimpleAjax name="Simple Form Ajax" />
        </div>
      </div>
    </section>
  </main>
)

const ContactPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        template
        boss
        phone 
        email
      }
    }
  }
`
