from django.urls import path
from . import views

urlpatterns = [
    path('calculate/', views.calculate_request, name='calculate'),
    path('callback/', views.callback_request, name='callback'),
]
