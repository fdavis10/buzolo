# Backend Dockerfile
FROM python:3.12-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Копируем requirements и устанавливаем зависимости
# Используем production requirements для продакшна
COPY requirements.production.txt requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.production.txt

# Копируем код приложения
COPY . .

# Создаем директорию для статических файлов
RUN mkdir -p /app/staticfiles

# Собираем статические файлы
RUN python manage.py collectstatic --noinput || true

# Создаем пользователя для запуска приложения
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Открываем порт
EXPOSE 8000

# Команда запуска
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "--timeout", "120", "buzolo_backend.wsgi:application"]
