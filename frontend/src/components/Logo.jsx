import React from 'react'
import './Logo.css'

const Logo = () => {
  return (
    <div className="logo">
      <img 
        src="/logo.png" 
        alt="Бузоло" 
        className="logo-icon"
        onError={(e) => {
          // Fallback to SVG if PNG not found
          e.target.style.display = 'none'
          const svg = e.target.nextSibling
          if (svg) svg.style.display = 'block'
        }}
      />
      <svg
        width="120"
        height="120"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-icon logo-icon-fallback"
        style={{ display: 'none' }}
      >
        {/* Laptop base */}
        <rect x="8" y="24" width="24" height="4" rx="1" fill="currentColor" />
        {/* Laptop screen */}
        <rect x="10" y="6" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
        {/* Bar chart inside screen */}
        <rect x="13" y="15" width="3" height="3" fill="currentColor" />
        <rect x="17" y="12" width="3" height="6" fill="currentColor" />
        <rect x="21" y="9" width="3" height="9" fill="currentColor" />
        {/* Location pin - overlapping right side of laptop */}
        <circle cx="28" cy="10" r="3.5" fill="currentColor" />
        <path d="M28 14 L28 20 L25.5 23 L30.5 23 L28 20 Z" fill="currentColor" />
      </svg>
      {/* <span className="logo-text">Бузоло</span> */}
    </div>
  )
}

export default Logo
