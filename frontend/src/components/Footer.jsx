import React from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import './Footer.css'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-section">
            <div className="footer-logo" onClick={scrollToTop}>
              <Logo />
            </div>
            <p className="footer-description">
              Создаем сайты и программное обеспечение для малого бизнеса.
              Качественные решения по доступным ценам.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Услуги</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => {
                  const element = document.getElementById('services')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}>
                  Разработка сайтов
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const element = document.getElementById('services')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}>
                  Разработка ПО
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const element = document.getElementById('services')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}>
                  Техподдержка
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Компания</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => {
                  const element = document.getElementById('about')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}>
                  О нас
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const element = document.getElementById('process')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}>
                  Как работаем
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const element = document.getElementById('forms')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}>
                  Контакты
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Контакты</h4>
            <div className="footer-contact">
              <p>Email: info@buzolo.ru</p>
              <p>Телефон: +7 (XXX) XXX-XX-XX</p>
            </div>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Бузоло. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
