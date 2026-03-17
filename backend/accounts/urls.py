from django.urls import path
from .views import login, register, profile, profile_detail, salary, history, employee, admin, delete_employee
from . import views
urlpatterns = [
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('profile/', profile, name='profile'),
    path('profile/<int:pk>/', profile_detail, name='profile_detail'),
    path('salary/', salary, name='salary'),
    path('history/', history, name='history'),
    path('employee/', employee, name='employee'),
    path('admin/', admin, name='admin'),
    path('profile/delete/<int:id>/', delete_employee, name='delete_employee'),
    path('employee/<int:id>/', views.get_employee),
]
