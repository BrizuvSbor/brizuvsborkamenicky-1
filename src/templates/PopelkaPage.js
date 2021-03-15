import React from 'react'
import { graphql } from 'gatsby'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './PopelkaPage.css'

// Export Template for use in CMS preview
export const PopelkaPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  body
}) => (
  <main className="PopelkaPage">
    <section className="section PopelkaPage--Section">
      <div className="container PopelkaPage--Section--Container">
        <div>
          <Content source={body} />
        </div>
        <div>
          <h4>Ukázky z CD Popelka Nazaretská</h4>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">
              01-Popelka Nazaretská
            </div>
            <div className="PopelkaPage--Audio">
              <audio
                src="/sounds/01-Popelka Nazaretska.wav"
                type="audio/wav"
                controls
              >
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">
              02-Pojď duše neklidná
            </div>
            <div className="PopelkaPage--Audio">
              <audio
                className="PopelkaPage--Audio"
                src="/sounds/02-Pojd duse neklidna.wav"
                controls
              >
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">
              04-Světem, jenž před dávnými časy
            </div>
            <div className="PopelkaPage--Audio">
              <audio
                src="/sounds/04-Svetem, jenz pred davnymi casy.wav"
                controls
              >
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">06- Král Hospodin</div>
            <div className="PopelkaPage--Audio">
              <audio src="/sounds/06-Kral Hospodin.wav" controls>
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">
              08 - Ani den bílý nezastíní
            </div>
            <div className="PopelkaPage--Audio">
              <audio src="/sounds/08-Ani den bily nezastini.wav" controls>
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">
              10 - Nastal čas velkonočních svátků
            </div>
            <div className="PopelkaPage--Audio">
              <audio
                src="/sounds/10-Nastal cas velkonocnich svatku.wav"
                controls
              >
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">
              14 - Dej, matko, synu požehnání
            </div>
            <div className="PopelkaPage--Audio">
              <audio src="/sounds/14-Dej, matko, synu pozehnani.wav" controls>
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">
              16 - Poslední záchvěv. Dokonáno
            </div>
            <div className="PopelkaPage--Audio">
              <audio src="/sounds/16-Posledni zachvev. Dokonano.wav" controls>
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">
              18 - Nastalo jitro, hle, den třetí
            </div>
            <div className="PopelkaPage--Audio">
              <audio
                src="/sounds/18-Nastalo jitro, hle, den treri.wav"
                controls
              >
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">
              20 - Velebí duše má Hospodina
            </div>
            <div className="PopelkaPage--Audio">
              <audio src="/sounds/20-Velebi duse ma Hospodina.wav" controls>
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
          <div className="PopelkaPage--Records">
            <div className="PopelkaPage--Label">
              21 - Ó moudrosti, vŠech barev matko
            </div>
            <div className="PopelkaPage--Audio">
              <audio 
                src="/sounds/21-O moudrosti, vsech barev matko.wav"
                controls
              >
                <track
                  src="captions_en.vtt"
                  kind="captions"
                  srclang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
)

const PopelkaPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <PopelkaPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default PopelkaPage

export const pageQuery = graphql`
  query PopelkaPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
  }
`
