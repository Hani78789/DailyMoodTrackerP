import React, {useState, useCallback} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {
  FiAlignJustify,
  FiX,
  FiHome,
  FiBarChart2,
  FiLogOut,
} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Memoize toggle function to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  /** Handle logout and redirect to login page */
  const handleLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  /** Navigation links (reused for both desktop & mobile) */
  const NavLinks = ({onClick}) => (
    <ul>
      <li>
        <Link to="/" onClick={onClick} aria-label="Home">
          <FiHome className="icon" /> Home
        </Link>
      </li>
      <li>
        <Link to="/report" onClick={onClick} aria-label="Report">
          <FiBarChart2 className="icon" /> Report
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            handleLogout()
            onClick?.()
          }}
          className="logout-btn"
          aria-label="Logout"
        >
          <FiLogOut className="icon" /> Logout
        </button>
      </li>
    </ul>
  )

  return (
    <header className="header" role="banner">
      {/* Logo */}
      <Link to="/" className="logo-link" aria-label="Home">
        <div className="logo_section">
          <h1 className="logoText">
            Daily <span>Mode Tracker</span>
          </h1>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="desktop-nav" aria-label="Main navigation">
        <NavLinks />
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        aria-expanded={isMenuOpen}
      >
        <FiAlignJustify />
      </button>

      {/* Overlay (click to close menu) */}
      {isMenuOpen && (
        <div
          className="overlay"
          onClick={toggleMenu}
          role="button"
          aria-label="Close Menu"
          tabIndex={0}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <nav
        className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}
        aria-label="Mobile navigation"
      >
        <button
          className="close-btn"
          onClick={toggleMenu}
          aria-label="Close Menu"
        >
          <FiX />
        </button>
        <NavLinks onClick={toggleMenu} />
      </nav>
    </header>
  )
}

export default withRouter(Header)
