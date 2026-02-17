"""
Django signals для отправки уведомлений в Telegram при создании заявок
"""
import asyncio
import logging
import threading
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CalculationRequest, CallbackRequest

logger = logging.getLogger(__name__)

# Импортируем функции бота
try:
    from bot.bot import send_calculation_notification, send_callback_notification
    BOT_AVAILABLE = True
except (ImportError, ValueError) as e:
    logger.warning(f"Бот не доступен: {e}. Уведомления не будут отправляться.")
    BOT_AVAILABLE = False
    # Создаем заглушки, чтобы избежать ошибок при вызове
    async def send_calculation_notification(*args, **kwargs):
        pass
    async def send_callback_notification(*args, **kwargs):
        pass


def run_async_in_thread(coro):
    """Запускает асинхронную функцию в отдельном потоке"""
    def run_in_thread():
        try:
            # Используем asyncio.run() который правильно управляет event loop
            asyncio.run(coro)
        except Exception as e:
            logger.error(f"Ошибка в асинхронной функции: {e}")
    
    thread = threading.Thread(target=run_in_thread, daemon=True)
    thread.start()


@receiver(post_save, sender=CalculationRequest)
def notify_calculation_request(sender, instance, created, **kwargs):
    """
    Отправляет уведомление в Telegram при создании новой заявки на расчет
    """
    if not created or not BOT_AVAILABLE:
        return
    
    try:
        # Запускаем асинхронную функцию в отдельном потоке
        run_async_in_thread(
            send_calculation_notification(
                name=instance.name,
                phone=instance.phone,
                email=instance.email,
                business_type=instance.business_type,
                task=instance.task,
                deadline=instance.deadline
            )
        )
        logger.info(f"Уведомление о заявке на расчет отправлено для {instance.name}")
    except Exception as e:
        logger.error(f"Ошибка отправки уведомления о заявке на расчет: {e}")


@receiver(post_save, sender=CallbackRequest)
def notify_callback_request(sender, instance, created, **kwargs):
    """
    Отправляет уведомление в Telegram при создании нового запроса на обратный звонок
    """
    if not created or not BOT_AVAILABLE:
        return
    
    try:
        # Запускаем асинхронную функцию в отдельном потоке
        run_async_in_thread(
            send_callback_notification(
                name=instance.name,
                phone=instance.phone
            )
        )
        logger.info(f"Уведомление о запросе обратного звонка отправлено для {instance.name}")
    except Exception as e:
        logger.error(f"Ошибка отправки уведомления о запросе обратного звонка: {e}")
