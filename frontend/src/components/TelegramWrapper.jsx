import { useEffect, useState } from 'react'
import telegramWebApp from '../utils/telegram'
import './TelegramWrapper.css'

/**
 * Компонент-обертка для адаптации приложения под Telegram MiniApp
 */
function TelegramWrapper({ children }) {
  const [isTelegram, setIsTelegram] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const inTelegram = telegramWebApp.isInTelegram()
    setIsTelegram(inTelegram)

    if (inTelegram) {
      // Устанавливаем тему
      const currentTheme = telegramWebApp.getTheme()
      setTheme(currentTheme)

      // Слушаем изменения темы через viewport
      const webApp = window.Telegram?.WebApp
      if (webApp && webApp.onEvent) {
        const handleViewportChanged = () => {
          const newTheme = webApp.colorScheme || 'light'
          setTheme(newTheme)
        }
        
        // Слушаем изменения viewport, которые могут включать изменения темы
        webApp.onEvent('viewportChanged', handleViewportChanged)
        
        return () => {
          if (webApp.offEvent) {
            webApp.offEvent('viewportChanged', handleViewportChanged)
          }
        }
      }
    }
  }, [])

  return (
    <div className={`telegram-wrapper ${isTelegram ? 'telegram-app' : ''} theme-${theme}`}>
      {children}
    </div>
  )
}

export default TelegramWrapper
