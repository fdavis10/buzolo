import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'buzolo_backend.settings')
django.setup()


from bot.bot import main
import asyncio

if __name__ == "__main__":
    asyncio.run(main())
