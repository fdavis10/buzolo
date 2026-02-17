import React from 'react'
import { motion } from 'framer-motion'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" fill="none"/>
          <path d="M32 4 C20 4 10 14 10 26 L10 38 C10 50 20 60 32 60 C44 60 54 50 54 38 L54 26 C54 14 44 4 32 4 Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
          <path d="M32 4 L32 60" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M10 32 L54 32" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        </svg>
      ),
      title: 'Разработка сайтов',
      description: 'Современные, быстрые и адаптивные сайты для вашего бизнеса. От лендингов до полноценных интернет-магазинов.',
      features: ['Адаптивный дизайн', 'SEO-оптимизация', 'Интеграция с CRM', 'Техподдержка']
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="48" height="36" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
          <rect x="12" y="16" width="40" height="24" rx="1" fill="currentColor" opacity="0.1"/>
          <path d="M20 24 L28 24 M20 30 L36 30 M20 36 L32 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="16" y="52" width="32" height="4" rx="1" fill="currentColor" opacity="0.3"/>
          <path d="M24 52 L24 48 M40 52 L40 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Разработка ПО',
      description: 'Программное обеспечение под ваши задачи. Автоматизация процессов, повышение эффективности работы.',
      features: ['Индивидуальный подход', 'Современные технологии', 'Документация', 'Обучение сотрудников']
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.5" fill="none"/>
          <path d="M32 12 L32 20 M32 44 L32 52 M12 32 L20 32 M44 32 L52 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M22 22 L28 28 M36 28 L42 22 M22 42 L28 36 M36 36 L42 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.3"/>
          <path d="M26 26 L38 38 M38 26 L26 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Техническая поддержка',
      description: 'Постоянная поддержка и развитие ваших проектов. Обновления, исправления, консультации.',
      features: ['Быстрое реагирование', 'Регулярные обновления', 'Мониторинг работы', 'Консультации']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <section id="services" className="services">
      <div className="services-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="section-title">Наши услуги</h2>
          <p className="section-subtitle">
            Комплексные решения для развития вашего бизнеса
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
