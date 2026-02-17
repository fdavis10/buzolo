import React from 'react'
import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const stats = [
    { number: '100+', label: 'Довольных клиентов' },
    { number: '3-7', label: 'Дней разработки' },
    { number: '24/7', label: 'Техподдержка' },
    { number: '100%', label: 'Гарантия качества' }
  ]

  return (
    <section id="about" className="about">
      <div className="about-container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="section-title">О нас</h2>
          <p className="about-text">
            Мы — команда профессионалов, специализирующаяся на создании сайтов и 
            программного обеспечения для малого бизнеса. Мы понимаем, что каждый 
            бизнес уникален, и предлагаем индивидуальные решения по доступным ценам.
          </p>
          <p className="about-text">
            Наша цель — помочь вашему бизнесу расти с помощью современных 
            технологий. Мы работаем быстро, качественно и всегда на связи.
          </p>
          <div className="about-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Небольшая команда — больше внимания к вашему проекту</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Прозрачные цены и сроки в договоре</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Современные технологии и лучшие практики</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Постоянная поддержка после запуска</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
