from django.urls import path
from . import views

urlpatterns = [
    path("get/<int:user_id>", views.getNotes),
    path('create/<int:user_id>', views.createNotes)    
]