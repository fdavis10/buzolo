import React from 'react'
import { motion } from 'framer-motion'
import './Process.css'

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Знакомство',
      description: 'Обсуждаем ваши задачи и цели. Погружаемся в ваш бизнес, чтобы понять, как лучше помочь.'
    },
    {
      number: '02',
      title: 'Анализ и планирование',
      description: 'Изучаем вашу нишу и конкурентов. Создаем план разработки с четкими сроками и этапами.'
    },
    {
      number: '03',
      title: 'Разработка',
      description: 'Создаем решение по современным стандартам. Держим вас в курсе на каждом этапе.'
    },
    {
      number: '04',
      title: 'Запуск и поддержка',
      description: 'Запускаем проект, тестируем и передаем вам. Остаемся на связи для поддержки и развития.'
    }
  ]

  return (
    <section id="process" className="process">
      <div className="process-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="section-title">Как мы работаем</h2>
          <p className="section-subtitle">
            Простой и прозрачный процесс от идеи до запуска
          </p>
        </motion.div>

        <div className="process-steps">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="process-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className="step-connector"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.15 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
