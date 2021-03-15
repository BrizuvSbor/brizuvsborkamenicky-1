import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <footer className="footer">
      <div className="container taCenter justify-content-center">
        <span>
          © {new Date().getFullYear()} Břízův sbor Kameničky
        </span>
      </div>
    </footer>
  </div>
)
