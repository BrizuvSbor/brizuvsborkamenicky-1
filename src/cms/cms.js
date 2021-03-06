import React from 'react'
import CMS from 'netlify-cms-app'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { ComponentsPageTemplate } from '../templates/ComponentsPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { SinglePostTemplate } from '../templates/SinglePost'
import { ConcertsPageTemplate } from '../templates/ConcertsPage'
import { RecordsPageTemplate } from '../templates/RecordsPage'
// import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary';

// CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary);

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('components-page', ({ entry }) => (
  <ComponentsPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePostTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('concerts-page', ({ entry }) => (
  <ConcertsPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('records-page', ({ entry }) => (
  <RecordsPageTemplate {...entry.toJS().data} />
))
