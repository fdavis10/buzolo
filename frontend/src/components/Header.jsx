import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import './Header.css'

const Header = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="header-container">
        <div className="logo-container">
          <Logo />
        </div>
        <nav className="nav">
          <button onClick={() => scrollToSection('services')} className="nav-link">
            Услуги
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link">
            О нас
          </button>
          <button onClick={() => scrollToSection('portfolio')} className="nav-link">
            Портфолио
          </button>
          <button onClick={() => scrollToSection('process')} className="nav-link">
            Как работаем
          </button>
          <button onClick={() => scrollToSection('forms')} className="nav-link">
            Контакты
          </button>
        </nav>
        <button
          className="cta-button"
          onClick={onOpenModal ? onOpenModal : () => scrollToSection('forms')}
        >
          Рассчитать стоимость
        </button>
      </div>
    </motion.header>
  )
}

export default Header
