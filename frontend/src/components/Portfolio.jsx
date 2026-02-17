import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import './Portfolio.css'

const Portfolio = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const cardRefs = useRef({})

  const projects = [
    {
      id: 1,
      image: 'https://i.imgur.com/uCWcVH8.jpeg',
      url: 'https://crocusfitness.com/',
    },
    {
      id: 2,
      image: 'https://i.imgur.com/OYGoJRf.jpeg',
      url: 'https://arizona-rp.com/',
    },
    {
      id: 3,
      image: 'https://i.imgur.com/zIMbv9Z.jpeg',
      url: 'https://mrdoors.ru/',
    },
    {
      id: 4,
      image: 'https://i.imgur.com/ysUd6dx.jpeg',
      url: 'https://ruswest.ru/',
    },
    {
      id: 5,
      image: 'https://i.imgur.com/oFDQ6u4.png',
      url: 'https://oneclickmoney.ru/',
    },
    {
      id: 6,
      image: 'https://i.imgur.com/bXyJD91.jpeg',
      url: 'https://m-istra-l.ru/',
    }
  ]

  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleMouseMove = (e, index) => {
    if (!cardRefs.current[index]) return

    const card = cardRefs.current[index]
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    card.style.setProperty('--rotate-x', `${rotateX}deg`)
    card.style.setProperty('--rotate-y', `${rotateY}deg`)
  }

  const handleMouseLeave = (index) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index].style.setProperty('--rotate-x', '0deg')
      cardRefs.current[index].style.setProperty('--rotate-y', '0deg')
    }
    setHoveredIndex(null)
  }

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="section-title">Примеры наших работ</h2>
          <p className="section-subtitle">
            Посмотрите на сайты, которые мы создали для наших клиентов
          </p>
        </motion.div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="portfolio-card-wrapper"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className={`portfolio-card ${hoveredIndex === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => handleCardClick(project.url)}
              >
                <div className="portfolio-card-inner">
                  <div className="portfolio-image-container">
                    <div className="browser-frame">
                      <div className="browser-header">
                        <div className="browser-controls">
                          <span className="browser-dot browser-dot-red"></span>
                          <span className="browser-dot browser-dot-yellow"></span>
                          <span className="browser-dot browser-dot-green"></span>
                        </div>
                        <div className="browser-url">
                          <span className="browser-url-icon">🔒</span>
                          <span className="browser-url-text">{project.url.replace('https://', '').replace('http://', '')}</span>
                        </div>
                      </div>
                      <div className="browser-content">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="portfolio-image"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="portfolio-overlay">
                      <div className="portfolio-info">
                        <h3 className="portfolio-title">{project.title}</h3>
                        <p className="portfolio-description">{project.description}</p>
                        <span className="portfolio-link">Посмотреть сайт →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
