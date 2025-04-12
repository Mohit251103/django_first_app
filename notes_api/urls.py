from django.urls import path
from . import views

urlpatterns = [
    path("notes/get/", views.getNotes),
    path('notes/create/', views.createNotes),
    path('user/create/', views.createUser),
    path('user/login/', views.CookieTokenObtainPairView.as_view(), name='cookie_token_obtain_pair'),
    path('user/get/', views.getUser)
]   