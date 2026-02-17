from rest_framework import serializers
from .models import CalculationRequest, CallbackRequest


class CalculationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalculationRequest
        fields = ['name', 'phone', 'email', 'business_type', 'task', 'deadline']


class CallbackRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallbackRequest
        fields = ['name', 'phone']
