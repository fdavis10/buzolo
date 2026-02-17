from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .serializers import CalculationRequestSerializer, CallbackRequestSerializer
import traceback
import logging

logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['POST'])
def calculate_request(request):
    try:
        serializer = CalculationRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.'},
                status=status.HTTP_201_CREATED
            )
        logger.error(f'Validation errors: {serializer.errors}')
        return Response(
            {'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        logger.error(f'Error in calculate_request: {str(e)}\n{traceback.format_exc()}')
        return Response(
            {'error': str(e), 'detail': 'Произошла ошибка при обработке запроса'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_exempt
@api_view(['POST'])
def callback_request(request):
    try:
        serializer = CallbackRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Заявка успешно отправлена. Мы перезвоним вам в течение 15 минут.'},
                status=status.HTTP_201_CREATED
            )
        logger.error(f'Validation errors: {serializer.errors}')
        return Response(
            {'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        logger.error(f'Error in callback_request: {str(e)}\n{traceback.format_exc()}')
        return Response(
            {'error': str(e), 'detail': 'Произошла ошибка при обработке запроса'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
