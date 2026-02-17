/**
 * Утилита для работы с Telegram Web App API
 */
class TelegramWebApp {
  constructor() {
    this.isAvailable = typeof window !== 'undefined' && window.Telegram?.WebApp !== undefined
    this.webApp = this.isAvailable ? window.Telegram.WebApp : null
    
    if (this.isAvailable) {
      this.init()
    }
  }

  init() {
    // Расширяем приложение на весь экран
    this.webApp.expand()
    
    // Включаем закрытие по свайпу вниз
    this.webApp.enableClosingConfirmation()
    
    // Устанавливаем цвет фона
    this.webApp.setHeaderColor('#ffffff')
    this.webApp.setBackgroundColor('#ffffff')
  }

  /**
   * Проверяет, запущено ли приложение в Telegram
   */
  isInTelegram() {
    return this.isAvailable
  }

  /**
   * Получает данные пользователя из Telegram
   */
  getUser() {
    if (!this.isAvailable) return null
    return this.webApp.initDataUnsafe?.user || null
  }

  /**
   * Получает тему Telegram (light/dark)
   */
  getTheme() {
    if (!this.isAvailable) return 'light'
    return this.webApp.colorScheme || 'light'
  }

  /**
   * Получает параметры темы
   */
  getThemeParams() {
    if (!this.isAvailable) return {}
    return this.webApp.themeParams || {}
  }

  /**
   * Показывает главную кнопку внизу экрана
   */
  showMainButton(text, onClick) {
    if (!this.isAvailable) return
    this.webApp.MainButton.setText(text)
    this.webApp.MainButton.onClick(onClick)
    this.webApp.MainButton.show()
  }

  /**
   * Скрывает главную кнопку
   */
  hideMainButton() {
    if (!this.isAvailable) return
    this.webApp.MainButton.hide()
  }

  /**
   * Устанавливает текст главной кнопки
   */
  setMainButtonText(text) {
    if (!this.isAvailable) return
    this.webApp.MainButton.setText(text)
  }

  /**
   * Показывает кнопку "Назад"
   */
  showBackButton(onClick) {
    if (!this.isAvailable) return
    this.webApp.BackButton.onClick(onClick)
    this.webApp.BackButton.show()
  }

  /**
   * Скрывает кнопку "Назад"
   */
  hideBackButton() {
    if (!this.isAvailable) return
    this.webApp.BackButton.hide()
  }

  /**
   * Показывает всплывающее уведомление
   */
  showAlert(message) {
    if (!this.isAvailable) {
      alert(message)
      return
    }
    this.webApp.showAlert(message)
  }

  /**
   * Показывает подтверждение
   */
  showConfirm(message, callback) {
    if (!this.isAvailable) {
      const result = confirm(message)
      callback(result)
      return
    }
    this.webApp.showConfirm(message, callback)
  }

  /**
   * Вибрация (haptic feedback)
   */
  hapticFeedback(type = 'impact', style = 'medium') {
    if (!this.isAvailable) return
    if (type === 'impact') {
      this.webApp.HapticFeedback.impactOccurred(style)
    } else if (type === 'notification') {
      this.webApp.HapticFeedback.notificationOccurred(style)
    } else if (type === 'selection') {
      this.webApp.HapticFeedback.selectionChanged()
    }
  }

  /**
   * Закрывает приложение
   */
  close() {
    if (!this.isAvailable) return
    this.webApp.close()
  }

  /**
   * Отправляет данные на сервер
   */
  sendData(data) {
    if (!this.isAvailable) return
    this.webApp.sendData(JSON.stringify(data))
  }

  /**
   * Получает версию платформы
   */
  getPlatform() {
    if (!this.isAvailable) return 'unknown'
    return this.webApp.platform || 'unknown'
  }

  /**
   * Получает версию WebApp
   */
  getVersion() {
    if (!this.isAvailable) return '0.0.0'
    return this.webApp.version || '0.0.0'
  }
}

// Создаем единственный экземпляр
const telegramWebApp = new TelegramWebApp()

export default telegramWebApp
