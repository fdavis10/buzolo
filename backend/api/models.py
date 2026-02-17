from django.db import models


class CalculationRequest(models.Model):
    name = models.CharField(max_length=100, verbose_name='Имя')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    email = models.EmailField(verbose_name='Email')
    business_type = models.CharField(max_length=200, verbose_name='Тип бизнеса')
    task = models.TextField(verbose_name='Задача')
    deadline = models.CharField(max_length=50, verbose_name='Сроки')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')

    class Meta:
        verbose_name = 'Запрос на расчет'
        verbose_name_plural = 'Запросы на расчет'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} - {self.business_type}'


class CallbackRequest(models.Model):
    name = models.CharField(max_length=100, verbose_name='Имя')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')

    class Meta:
        verbose_name = 'Запрос на обратный звонок'
        verbose_name_plural = 'Запросы на обратный звонок'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} - {self.phone}'
