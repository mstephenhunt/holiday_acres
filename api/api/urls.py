"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework import routers
from holiday_acres_api import views

router = routers.DefaultRouter()
router.register(r"api/horses", views.HorseViewSet)
router.register(r"api/barn_sections", views.BarnSectionViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("api/health", views.health_check),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/users/register", views.register_account_request),
    path("api/users/login", views.login),
    path("api/users/logout", views.logout),
    path("api/users/dummy", views.dummy),
    path("api/redirect", views.user_auth_fail),
]
