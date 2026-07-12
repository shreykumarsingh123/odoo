from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.login, name='login'),
    path('api/signup/', views.signup, name='signup'),
    path('api/logout/', views.logout, name='logout'),
    path('api/profile/update/', views.profile_update, name='profile_update'),
]