from django.contrib import admin
from .models import CalculationRequest, CallbackRequest


@admin.register(CalculationRequest)
class CalculationRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'business_type', 'deadline', 'created_at']
    list_filter = ['created_at', 'deadline']
    search_fields = ['name', 'phone', 'email', 'business_type']
    readonly_fields = ['created_at']


@admin.register(CallbackRequest)
class CallbackRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'phone']
    readonly_fields = ['created_at']
