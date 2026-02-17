import React from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const Hero = ({ onOpenModal }) => {

  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Создаем сайты и ПО
            <br />
            <span className="highlight">для вашего бизнеса</span>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Мы помогаем малому бизнесу расти с помощью современных
            <br />
            веб-решений и программного обеспечения
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <button
              className="btn-primary"
              onClick={onOpenModal}
            >
              Рассчитать стоимость
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                const element = document.getElementById('services')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Наши услуги
            </button>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="floating-shapes">
            <motion.div
              className="shape shape-1"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="shape shape-2"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div
              className="shape shape-3"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
