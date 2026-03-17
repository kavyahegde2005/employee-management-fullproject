from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer, ProfileSerializer, SalarySerializer, EmployeeSerializer, AdminSerializer
from .models import Register, Login, Profile, Salary, Employee, Admin
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        login = serializer.save()
        return Response({'message': 'Login successful'})
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        register = serializer.save()
        return Response({'message': 'Registration successful'})
    return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])
def profile(request):
    if request.method == 'GET':
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Profile saved successfully",
                "data": serializer.data
            })
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def profile_detail(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        profile.delete()
        return Response(status=204)

@api_view(['GET', 'POST'])
def salary(request):
    if request.method == 'GET':
        salaries = Salary.objects.all()
        serializer = SalarySerializer(salaries, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SalarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Salary saved successfully",
                "data": serializer.data
            })
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def history(request):
    if request.method == 'GET':
        salaries = Salary.objects.all()
        serializer = SalarySerializer(salaries, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
def employee(request):
    if request.method == 'GET':
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Employee saved successfully",
                "data": serializer.data
            })
        return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def delete_employee(request, id):
    try:
        emp = Profile.objects.get(id=id)
        emp.delete()
        return Response({"message": "Employee deleted successfully"})
    except Profile.DoesNotExist:
        return Response({"error": "Employee not found"}, status=404)

@api_view(['GET', 'POST'])
def admin(request):
    if request.method == 'GET':
        admins = Admin.objects.all()
        serializer = AdminSerializer(admins, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Admin saved successfully",
                "data": serializer.data
            })
        return Response(serializer.errors, status=400)

def get_employee(request, id):
    emp = Employee.objects.get(id=id)

    data = {
        "id": emp.id,
        "full_name": emp.full_name,
        "email": emp.email,
        "phone": emp.phone,
        "department": emp.department,
        "designation": emp.designation,
        "joining_date": str(emp.joining_date),
        "photo": emp.photo.url if emp.photo else None,
    }

    return JsonResponse(data)
