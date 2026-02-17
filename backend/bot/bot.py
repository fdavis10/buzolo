"""
Telegram бот для уведомлений о новых заявках
"""
import os
import asyncio
from aiogram import Bot, Dispatcher
from aiogram.types import Message
from aiogram.filters import Command
from dotenv import load_dotenv
import logging

load_dotenv()

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Инициализация бота
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
bot = None
dp = Dispatcher()

# Инициализируем бота только если токен есть
if BOT_TOKEN:
    try:
        bot = Bot(token=BOT_TOKEN)
        logger.info("Бот инициализирован успешно")
    except Exception as e:
        logger.error(f"Ошибка инициализации бота: {e}")
        bot = None
else:
    logger.warning("TELEGRAM_BOT_TOKEN не найден в .env файле. Уведомления не будут отправляться.")

# ID чатов для уведомлений (можно указать несколько через запятую в .env)
NOTIFICATION_CHAT_IDS = []

def parse_chat_ids():
    """Парсит ID чатов из .env"""
    chat_ids_str = os.getenv('TELEGRAM_NOTIFICATION_CHAT_IDS', '')
    if not chat_ids_str:
        return []
    
    try:
        # Поддерживаем формат: "123456789,987654321" или "123456789"
        chat_ids = [int(chat_id.strip()) for chat_id in chat_ids_str.split(',') if chat_id.strip()]
        return chat_ids
    except ValueError as e:
        logger.error(f"Ошибка парсинга TELEGRAM_NOTIFICATION_CHAT_IDS: {e}")
        return []


def get_bot_instance():
    """
    Создает новый экземпляр бота для использования в разных потоках/event loops
    """
    if not BOT_TOKEN:
        return None
    try:
        return Bot(token=BOT_TOKEN)
    except Exception as e:
        logger.error(f"Ошибка создания экземпляра бота: {e}")
        return None


async def send_notification(message_text: str, parse_mode: str = 'HTML'):
    """
    Отправляет уведомление во все указанные чаты
    
    Args:
        message_text: Текст сообщения
        parse_mode: Режим парсинга (HTML или Markdown)
    """
    if not BOT_TOKEN:
        logger.warning("TELEGRAM_BOT_TOKEN не настроен. Уведомления не будут отправляться.")
        return
    
    chat_ids = parse_chat_ids()
    
    if not chat_ids:
        logger.warning("TELEGRAM_NOTIFICATION_CHAT_IDS не настроен. Уведомления не будут отправляться.")
        return
    
    # Создаем новый экземпляр бота для этого вызова
    bot_instance = get_bot_instance()
    if not bot_instance:
        logger.warning("Не удалось создать экземпляр бота. Уведомления не будут отправляться.")
        return
    
    try:
        for chat_id in chat_ids:
            try:
                await bot_instance.send_message(
                    chat_id=chat_id,
                    text=message_text,
                    parse_mode=parse_mode
                )
                logger.info(f"Уведомление отправлено в чат {chat_id}")
            except Exception as e:
                logger.error(f"Ошибка отправки уведомления в чат {chat_id}: {e}")
    finally:
        # Закрываем сессию бота после использования
        await bot_instance.session.close()


async def send_calculation_notification(name: str, phone: str, email: str, 
                                       business_type: str, task: str, deadline: str):
    """
    Отправляет уведомление о новой заявке на расчет стоимости
    """
    message = f"""
🔔 <b>Новая заявка на расчет стоимости</b>

👤 <b>Имя:</b> {name}
📞 <b>Телефон:</b> {phone}
📧 <b>Email:</b> {email}
🏢 <b>Тип бизнеса:</b> {business_type}
📝 <b>Задача:</b> {task}
⏰ <b>Сроки:</b> {deadline}
    """.strip()
    
    await send_notification(message)


async def send_callback_notification(name: str, phone: str):
    """
    Отправляет уведомление о запросе обратного звонка
    """
    message = f"""
📞 <b>Новый запрос на обратный звонок</b>

👤 <b>Имя:</b> {name}
📞 <b>Телефон:</b> {phone}
    """.strip()
    
    await send_notification(message)


# Команды бота для управления
@dp.message(Command("start"))
async def cmd_start(message: Message):
    """Команда /start"""
    await message.answer(
        "🤖 Бот для уведомлений о заявках\n\n"
        "Бот автоматически отправляет уведомления о новых заявках.\n"
        "Используйте /help для списка команд."
    )


@dp.message(Command("help"))
async def cmd_help(message: Message):
    """Команда /help"""
    await message.answer(
        "📋 <b>Доступные команды:</b>\n\n"
        "/start - Начать работу с ботом\n"
        "/help - Показать эту справку\n"
        "/test - Отправить тестовое уведомление\n"
        "/chat_id - Показать ID текущего чата",
        parse_mode='HTML'
    )


@dp.message(Command("test"))
async def cmd_test(message: Message):
    """Команда /test - отправка тестового уведомления"""
    test_message = """
🧪 <b>Тестовое уведомление</b>

Это тестовое сообщение для проверки работы бота.
Если вы видите это сообщение, значит бот работает корректно!
    """.strip()
    
    await send_notification(test_message)
    await message.answer("✅ Тестовое уведомление отправлено!")


@dp.message(Command("chat_id"))
async def cmd_chat_id(message: Message):
    """Команда /chat_id - показать ID текущего чата"""
    chat_id = message.chat.id
    await message.answer(
        f"🆔 <b>ID этого чата:</b> <code>{chat_id}</code>\n\n"
        f"Добавьте этот ID в переменную TELEGRAM_NOTIFICATION_CHAT_IDS в .env файле.",
        parse_mode='HTML'
    )


async def main():
    """Главная функция для запуска бота"""
    if not bot:
        logger.error("Бот не инициализирован. Проверьте TELEGRAM_BOT_TOKEN в .env файле.")
        return
    
    logger.info("Запуск бота...")
    try:
        # Проверка настроек
        chat_ids = parse_chat_ids()
        if not chat_ids:
            logger.warning(
                "⚠️ TELEGRAM_NOTIFICATION_CHAT_IDS не настроен!\n"
                "Используйте команду /chat_id в боте, чтобы узнать ID чата,\n"
                "затем добавьте его в .env файл."
            )
        
        # Запуск polling
        await dp.start_polling(bot)
    except Exception as e:
        logger.error(f"Ошибка при запуске бота: {e}")
        raise
    finally:
        if bot:
            await bot.session.close()


if __name__ == "__main__":
    asyncio.run(main())
