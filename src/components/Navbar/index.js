import {Link} from 'react-router-dom'
import './index.css'

const Navbar = () => (
  <div className="navbar">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="website-logo"
      />
    </Link>
  </div>
)

export default Navbar
