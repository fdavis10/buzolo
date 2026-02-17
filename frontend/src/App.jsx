import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Process from './components/Process'
import Forms from './components/Forms'
import Footer from './components/Footer'
import CalculationModal from './components/CalculationModal'
import TelegramWrapper from './components/TelegramWrapper'
import telegramWebApp from './utils/telegram'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isInTelegram = telegramWebApp.isInTelegram()

  return (
    <TelegramWrapper>
      <div className="App">
        {!isInTelegram && <Header onOpenModal={() => setIsModalOpen(true)} />}
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <Services />
        <About />
        <Portfolio />
        <Testimonials />
        <Process />
        <Forms />
        {!isInTelegram && <Footer />}
        <CalculationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </TelegramWrapper>
  )
}

export default App
