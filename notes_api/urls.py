from django.urls import path
from . import views

urlpatterns = [
    path("notes/get/", views.getNotes),
    path('notes/create/', views.createNotes),
    path('notes/delete/<int:note_id>/', views.deleteNote),
    path('notes/update/<int:note_id>/', views.updateNote),
    path('user/create/', views.createUser),
    path('user/login/', views.CookieTokenObtainPairView.as_view(), name='cookie_token_obtain_pair'),
    path('user/get/', views.getUser),
    path('user/logout/', views.logout_custom)
]   