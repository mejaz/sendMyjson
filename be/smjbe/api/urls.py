from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('getUserInfo/', views.UserInfo.as_view(), name='userInfo'),
    path('projects/', views.Project.as_view(), name='project'),
    path('projects/<project_id>/', views.ProjectOne.as_view(), name='project_one'),
    path('projects/<project_id>/apis/', views.Api.as_view(), name='api'),
    # path('apis/<api_id>/', views.ApiOne.as_view(), name='api_one'),
]
