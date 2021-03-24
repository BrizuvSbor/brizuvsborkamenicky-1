import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Observer from './Observer'

import './Image.css'
import { result } from 'lodash'

class Image extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef();
  }

  imageSizes = [
    '320',
    '450',
    '640',
    '750',
    '800',
    '900',
    '1000',
    '1200',
    '1500',
    '1600',
    '2000'
  ] // image sizes used for image source sets

  state = {
    isIntersecting: false
  }

  handleIntersection = e => {
    if (e.isIntersecting) {
      this.setState({ isIntersecting: true })
    }
  }

  checkIsUploadcare(src) {
    return typeof src === 'string' && src.includes('ucarecdn.com')
  }

  checkIsCloudinary(src) {
    return typeof src === 'string' && src.includes('cloudinary')
  }

  getResolutionString(res) {
    /* add resolutions options for inline images */
    if (res === 'small') {
      res = '800'
    } else if (res === 'medium') {
      res = '1000'
    } else if (res === 'large') {
      res = '2000'
    }
    return res
  }

  getResultUrl(urlArray, configArray, newConfigParams) {
    return urlArray[0] + "/upload/" + newConfigParams + "/" + configArray.slice(2, configArray.length).join("/").toString();
  }

  render() {
    let {
      background,
      backgroundSize = 'cover',
      resolutions = '1000',
      className = '',
      src,
      secSet = '',
      fullSrc,
      smallSrc,
      title = '',
      alt = '',
      lazy = true
    } = this.props

    const isCloudinary = this.checkIsCloudinary(src),
      fullImage = !isCloudinary || !lazy

    /* create source set for images */
   /* if (isUploadcare) {
      secSet = this.imageSizes.map(size => {
        return `${src}-/progressive/yes/-/format/auto/-/preview/${size}x${size}/-/quality/lightest/${size}.jpg ${size}w`
      })
    };*/
    fullSrc = src;
    smallSrc = src;

    if (isCloudinary) {
      let urlArray = src.split("/upload");
      let configArray = urlArray[1].split("/");
      secSet = this.imageSizes.map(size => {
        let newConfigParams = `c_fill,f_auto,q_auto,h_${size},w_${size}`;
        return this.getResultUrl(urlArray, configArray, newConfigParams) + " " + size + "w";
      });
      let newConfigParams = `c_fill,f_auto,q_auto,w_${this.getResolutionString(resolutions)}`;
      fullSrc = this.getResultUrl(urlArray, configArray, newConfigParams);
      newConfigParams = `c_fill,f_auto,q_auto,w_10`;
      smallSrc = this.getResultUrl(urlArray, configArray, newConfigParams);
    }

    let style = {}
    if (background && lazy) {
      style = {
        backgroundImage: `url(${
          this.state.isIntersecting ? fullSrc : smallSrc
        })`,
        backgroundSize
      }
    } else {
      style = {
        backgroundImage: `url(${fullSrc})`,
        backgroundSize
      }
    }

    return (
      <Fragment>
        {isCloudinary && lazy && (
          <Observer onChange={this.handleIntersection}>
            <div
              className="BackgroundImage"
              ref={this.ref}
              style={{
                backgroundImage: `url(${smallSrc})`,
                backgroundSize: 'cover'
              }}
            >
              {!background && (
                <img
                  className={`LazyImage ${
                    className + this.state.isIntersecting ? ' faded' : ''
                  }`}
                  src={this.state.isIntersecting ? fullSrc : ''}
                  srcSet={this.state.isIntersecting ? secSet : ''}
                  sizes={'100vw'}
                  title={title}
                  alt={alt}
                />
              )}
              {background && (
                <div
                  className={`${lazy} LazyImage BackgroundImage absolute ${
                    className + this.state.isIntersecting ? ' faded' : ''
                  }`}
                  style={style}
                />
              )}
            </div>
          </Observer>
        )}
        {fullImage && (
          <Fragment>
            {background && (
              <div
                className={`BackgroundImage absolute ${className}`}
                style={style}
              />
            )}
            {!background && (
              <img
                className={`${className}`}
                src={fullSrc}
                srcSet={secSet}
                sizes={'100vw'}
                title={title}
                alt={alt}
              />
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired
}

export default Image
