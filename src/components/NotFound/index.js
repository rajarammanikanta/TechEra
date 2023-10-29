import Navbar from '../Navbar'

import './index.css'

const NotFound = () => (
  <div>
    <Navbar />
    <div className="notfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="notfound-image"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="desc">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
