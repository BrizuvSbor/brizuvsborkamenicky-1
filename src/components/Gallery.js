import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { PhotoSwipe } from 'react-photoswipe'
import Image from './Image'
import _kebabCase from 'lodash/kebabCase'

import './Gallery.css'
import 'react-photoswipe/lib/photoswipe.css'

export default class Gallery extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    loaded: false,
    isOpen: false,
    sliderImages: [],
    index: 0
  }

  isOpen(isOpen, index) {
    if (typeof index === 'undefined') index = 0
    this.setState({ isOpen, index })
  }
  handleKeyDown = ev => {
    if (ev.keyCode === 13 && !this.state.isOpen) {
      // enter to open
      this.isOpen(true, this.state.index)
    }
  }

  getImageInfo = (img, index) =>
    fetch(img).then(
      result => {
        let url = result.url
        let indexHeightStart = url.indexOf('h_')
        let indexWidthStart = url.indexOf('w_')
        let indexHeightEnd = url.indexOf(',', indexHeightStart)
        let indexWidthEnd = url.indexOf('/', indexWidthStart)
        let heightSubstring = url.substring(indexHeightStart, indexHeightEnd)
        let widthSubstring = url.substring(indexWidthStart, indexWidthEnd)
        let height = heightSubstring.split('_')[1]
        let width = widthSubstring.split('_')[1]
        // const [width, height] = useImageSize(url);
        //const sizeOf = require('image-size')

        //console.log(sizeOf);
        const newImagesArr = [...this.state.sliderImages]
        newImagesArr[index] = {
          src: img,
          w: 'auto',
          h: 'auto'
        }
        this.setState({
          sliderImages: newImagesArr
        })
        return true
      },
      error => {
        console.log(error)
        return false
      }
    )

  componentDidMount() {
    const { images } = this.props,
      maxCount = images.length
    let loopCount = 1
    this.getImageSizes(loopCount, maxCount);

    /*for (let i in images) {
      if (this.getImageInfo(images[i], i)) {
        this.setState({ loaded: loopCount === maxCount })
        loopCount++
      }
    }*/
  }

  getImageSizes(loopCount, maxCount) {
    fetch("https://res.cloudinary.com/dfhtw7uzk/image/list/" + this.props.tag + ".json")
    .then(res => res.json())
    .then(imagesJson => {
      let imagesJsonResources = imagesJson.resources;
      for (let index in imagesJsonResources) {
        const imageSrc = this.props.images.find(img => img.includes(imagesJsonResources[index].public_id));
        const newImagesArr = [...this.state.sliderImages];
        newImagesArr[index] = {
          src: imageSrc,
          w: imagesJsonResources[index].width,
          h: imagesJsonResources[index].height
        };
        this.setState({
          sliderImages: newImagesArr,
          loaded: loopCount === maxCount
        });
        loopCount++;
    }
  });
  }

  render() {
    const { images } = this.props
    return (
      <Fragment>
        {images && images.length > 0 && (
          <div className="Gallery">
            {images.map((image, index) => (
              <div
                className="Gallery--Item"
                key={index}
                onClick={() => this.isOpen(true, index)}
                onKeyDown={this.handleKeyDown}
                tabIndex={0}
                aria-label="Toggle Gallery"
                role="button"
              >
                <div>
                  <Image
                    resolutions="small"
                    src={image}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {this.state.loaded && this.state.sliderImages.length > 0 && (
          <PhotoSwipe
            isOpen={this.state.isOpen}
            items={this.state.sliderImages}
            options={{
              index: this.state.index,
              history: false
            }}
            onClose={() => this.isOpen(false)}
          />
        )}
      </Fragment>
    )
  }
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired
}
