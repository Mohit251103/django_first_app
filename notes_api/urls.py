from django.urls import path
from . import views

urlpatterns = [
    path("notes/get/<int:user_id>/", views.getNotes),
    path('notes/create/<int:user_id>/', views.createNotes),
    path('user/create/', views.createUser),
    path('user/get/<int:user_id>/', views.createUser)
]