import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Testimonials.css'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Александр Иванов',
      company: 'ООО "ТехноСервис"',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'Отличная работа! Сайт получился современным и функциональным. Команда быстро реагировала на все наши пожелания. Рекомендую!'
    },
    {
      id: 2,
      name: 'Мария Петрова',
      company: 'ИП Петрова',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: 'Очень довольна результатом. Сайт помог увеличить количество клиентов. Особенно понравилось, что все сделали в срок и по разумной цене.'
    },
    {
      id: 3,
      name: 'Дмитрий Смирнов',
      company: 'СтройКомплекс',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'Профессиональный подход к работе. Создали для нас корпоративный сайт, который полностью отражает нашу деятельность. Спасибо!'
    },
    {
      id: 4,
      name: 'Елена Козлова',
      company: 'Салон красоты "Элегант"',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      text: 'Прекрасный лендинг для нашего салона! Дизайн современный, заявки начали поступать уже в первую неделю. Очень рекомендую эту команду.'
    },
    {
      id: 5,
      name: 'Сергей Волков',
      company: 'Интернет-магазин гаджетов',
      avatar: 'https://sun1-20.userapi.com/s/v1/ig2/7edayvUI7icEb6upI81l0DkaY4ebAG40wneyBVgvuUKD0xSXc8sntjqIB6SIlM0QH1GjudvdYu2SEKpIrpafbthk.jpg?quality=95&crop=287,0,722,722&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&u=BJmFttMWdeqbEMpWE0Lk0YdUSz4KMTk311df0vI27-I&cs=200x200',
      rating: 5,
      text: 'Сделали отличный интернет-магазин. Все функции работают идеально, интерфейс удобный. Продажи выросли на 40% после запуска сайта.'
    },
    {
      id: 6,
      name: 'Анна Морозова',
      company: 'Школа английского языка',
      avatar: 'https://i.pravatar.cc/150?img=20',
      rating: 5,
      text: 'Очень понравилось сотрудничество. Создали красивый сайт для нашей школы. Теперь родители могут легко записаться на занятия онлайн.'
    },
    {
      id: 7,
      name: 'Игорь Лебедев',
      company: 'Автосервис',
      avatar: 'https://i.pravatar.cc/150?img=13',
      rating: 5,
      text: 'Отличный сайт для нашего автосервиса! Онлайн-запись работает без сбоев, клиенты довольны. Спасибо за качественную работу.'
    },
    {
      id: 8,
      name: 'Ольга Новикова',
      company: 'Сеть кафе',
      avatar: 'https://i.pravatar.cc/150?img=47',
      rating: 5,
      text: 'Создали прекрасный сайт для нашего кафе. Меню, фотографии, онлайн-заказ - все на высшем уровне. Клиенты в восторге!'
    },
    {
      id: 9,
      name: 'Павел Соколов',
      company: 'Фитнес-клуб',
      avatar: 'https://sun9-86.userapi.com/s/v1/ig2/y37XWcmbpfwBiI8mM-J5_cbNGrQtvJDB41f9sCtR87Veni1hDQa13ilmR9DSa4jLpEbXAwuu8JdgebQhaVTpEqH4.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x639,540x719,640x853,720x959,1080x1439,1201x1600&from=bu&cs=1201x0',
      rating: 5,
      text: 'Профессиональная работа! Сайт для фитнес-клуба получился современным и функциональным. Онлайн-запись на тренировки работает отлично.'
    },
    {
      id: 10,
      name: 'Татьяна Федорова',
      company: 'Студия дизайна интерьеров',
      avatar: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      text: 'Великолепное портфолио для нашей студии! Сайт показывает наши работы в лучшем свете. Новые клиенты начали обращаться сразу после запуска.'
    }
  ]

  // Автоматическая смена слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000) // Меняется каждые 5 секунд

    return () => clearInterval(interval)
  }, [testimonials.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ))
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="section-title">Отзывы наших клиентов</h2>
          <p className="section-subtitle">
            Что говорят о нас те, кто уже работает с нами
          </p>
        </motion.div>

        <div className="testimonials-slider">
          <button
            className="slider-button slider-button-prev"
            onClick={goToPrevious}
            aria-label="Предыдущий отзыв"
          >
            ←
          </button>

          <div className="testimonial-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="testimonial-card"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div className="testimonial-stars">
                  {renderStars(currentTestimonial.rating)}
                </div>
                
                <blockquote className="testimonial-text">
                  "{currentTestimonial.text}"
                </blockquote>

                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="avatar-image"
                    />
                  </div>
                  <div className="testimonial-info">
                    <div className="testimonial-name">{currentTestimonial.name}</div>
                    <div className="testimonial-company">{currentTestimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="slider-button slider-button-next"
            onClick={goToNext}
            aria-label="Следующий отзыв"
          >
            →
          </button>
        </div>

        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к отзыву ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
