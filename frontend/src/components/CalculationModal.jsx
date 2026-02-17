import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import './CalculationModal.css'

const CalculationModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    task: '',
    deadline: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const totalSteps = 4

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const submitData = {
        ...formData,
        business_type: formData.businessType
      }
      delete submitData.businessType
      await axios.post('/api/calculate/', submitData)
      setSubmitted(true)
      setTimeout(() => {
        onClose()
        setCurrentStep(1)
        setFormData({
          name: '',
          phone: '',
          email: '',
          businessType: '',
          task: '',
          deadline: ''
        })
        setSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.')
    } finally {
      setLoading(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.phone && formData.email
      case 2:
        return formData.businessType && formData.task
      case 3:
        return formData.deadline
      default:
        return true
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Progress Bar */}
        <div className="modal-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="progress-steps">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`progress-step ${currentStep >= step ? 'active' : ''}`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="modal-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Спасибо за заявку!</h3>
                <p>Мы свяжемся с вами в ближайшее время</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              className="modal-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Контакты */}
              {currentStep === 1 && (
                <div className="step-content">
                  <h2 className="step-title">Ваши контакты</h2>
                  <p className="step-description">
                    Как мы можем с вами связаться?
                  </p>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Телефон"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: О проекте */}
              {currentStep === 2 && (
                <div className="step-content">
                  <h2 className="step-title">О вашем проекте</h2>
                  <p className="step-description">
                    Расскажите нам о вашем бизнесе и задаче
                  </p>
                  <div className="form-group">
                    <input
                      type="text"
                      name="businessType"
                      placeholder="Тип бизнеса"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="task"
                      placeholder="Опишите задачу подробно"
                      value={formData.task}
                      onChange={handleChange}
                      rows="5"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Сроки */}
              {currentStep === 3 && (
                <div className="step-content">
                  <h2 className="step-title">Сроки выполнения</h2>
                  <p className="step-description">
                    Когда вам нужен готовый проект?
                  </p>
                  <div className="form-group">
                    <select
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Выберите срок</option>
                      <option value="urgent">Срочно (1-3 дня)</option>
                      <option value="week">Неделя</option>
                      <option value="month">Месяц</option>
                      <option value="flexible">Не торопимся</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Подтверждение */}
              {currentStep === 4 && (
                <div className="step-content">
                  <h2 className="step-title">Проверьте данные</h2>
                  <p className="step-description">
                    Убедитесь, что все данные верны
                  </p>
                  <div className="review-data">
                    <div className="review-item">
                      <span className="review-label">Имя:</span>
                      <span className="review-value">{formData.name}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Телефон:</span>
                      <span className="review-value">{formData.phone}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Email:</span>
                      <span className="review-value">{formData.email}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Тип бизнеса:</span>
                      <span className="review-value">{formData.businessType}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Задача:</span>
                      <span className="review-value">{formData.task}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Сроки:</span>
                      <span className="review-value">
                        {formData.deadline === 'urgent' && 'Срочно (1-3 дня)'}
                        {formData.deadline === 'week' && 'Неделя'}
                        {formData.deadline === 'month' && 'Месяц'}
                        {formData.deadline === 'flexible' && 'Не торопимся'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {!submitted && (
          <div className="modal-actions">
            {currentStep > 1 && (
              <button className="btn-secondary" onClick={prevStep}>
                Назад
              </button>
            )}
            {currentStep < totalSteps ? (
              <button
                className="btn-primary"
                onClick={nextStep}
                disabled={!isStepValid()}
              >
                Далее
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Отправка...' : 'Отправить заявку'}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default CalculationModal
