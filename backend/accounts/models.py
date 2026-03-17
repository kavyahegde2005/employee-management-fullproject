from django.db import models

# Create your models here.
class Login(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class Register(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class Profile(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    department = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)

    def __str__(self):
        return self.name

class Salary(models.Model):
    month = models.CharField(max_length=50)
    salary = models.CharField(max_length=50)
    bonus = models.CharField(max_length=50)
    deduction = models.CharField(max_length=50)
    total = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.month} - {self.total}"


class Employee(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    joining_date = models.DateField()
    photo = models.ImageField(upload_to='employee_photos/', null=True, blank=True)

    def __str__(self):
        return self.full_name


class Admin(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    department = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    salary = models.CharField(max_length=50)

    def __str__(self):
        return self.name

