from django.urls import path
from . import views

urlpatterns = [
    path("notes/get/<int:user_id>/", views.getNotes),
    path('notes/create/<int:user_id>/', views.createNotes),
    path('user/create/', views.createUser),
    path('user/login/', views.CookieTokenObtainPairView.as_view(), name='cookie_token_obtain_pair')
]   