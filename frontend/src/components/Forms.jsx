import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './Forms.css'

const Forms = () => {
  const [callbackForm, setCallbackForm] = useState({
    name: '',
    phone: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCallbackChange = (e) => {
    setCallbackForm({
      ...callbackForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCallbackSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await axios.post('/api/callback/', callbackForm)
      setSubmitted(true)
      setCallbackForm({ name: '', phone: '' })
    } catch (error) {
      console.error('Error submitting callback form:', error)
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="forms" className="forms">
      <div className="forms-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="section-title">Свяжитесь с нами</h2>
          <p className="section-subtitle">
            Оставьте заявку, и мы свяжемся с вами в ближайшее время
          </p>
        </motion.div>

        <motion.div
          className="form-card callback-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="form-title">Обратный звонок</h3>
          <p className="form-subtitle">
            Оставьте контакты, и мы перезвоним вам в течение 15 минут
          </p>
          
          {submitted ? (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="success-icon">✓</div>
              <p>Спасибо! Мы перезвоним вам в ближайшее время.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={callbackForm.name}
                  onChange={handleCallbackChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  value={callbackForm.phone}
                  onChange={handleCallbackChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Отправка...' : 'Заказать звонок'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Forms
