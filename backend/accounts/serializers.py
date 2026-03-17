from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Login, Register, Profile, Salary, Employee, Admin

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'