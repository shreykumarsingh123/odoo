from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import json

# Use SimpleJWT to issue access/refresh tokens
from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def get_user_data(user):
    return {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'is_staff': user.is_staff,
    }


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password):
            tokens = get_tokens_for_user(user)
            return Response({'tokens': tokens, 'user': get_user_data(user)}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return Response({'error': 'Username, email, and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        first_name = data.get('first_name') or data.get('firstName', '')
        last_name = data.get('last_name') or data.get('lastName', '')
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        tokens = get_tokens_for_user(user)
        return Response({'message': 'User created successfully', 'user': get_user_data(user), 'tokens': tokens}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
    # For JWT, client should discard tokens; optionally implement blacklist
    return Response({'message': 'Logged out (client-side token discard)'}, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['GET', 'POST'])
def profile_update(request):
    try:
        # assume Authorization: Bearer <access>
        auth = request.headers.get('Authorization', '')
        token = auth.replace('Bearer ', '')
        if not token:
            return Response({'error': 'Authorization header required'}, status=status.HTTP_401_UNAUTHORIZED)

        # Use SimpleJWT to verify token
        from rest_framework_simplejwt.authentication import JWTAuthentication
        jwt_auth = JWTAuthentication()
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)

        if request.method == 'GET':
            return Response({'user': get_user_data(user)}, status=status.HTTP_200_OK)

        data = json.loads(request.body)
        first_name = data.get('first_name') or data.get('firstName')
        last_name = data.get('last_name') or data.get('lastName')
        email = data.get('email')

        if first_name is not None:
            user.first_name = first_name
        if last_name is not None:
            user.last_name = last_name
        if email is not None:
            if User.objects.filter(email=email).exclude(id=user.id).exists():
                return Response({'error': 'Email already in use'}, status=status.HTTP_400_BAD_REQUEST)
            user.email = email
        user.save()
        return Response({'message': 'Profile updated successfully', 'user': get_user_data(user)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
