from typing import Optional
from django.shortcuts import get_object_or_404
from ninja import Schema
from datetime import date
from ninja import Router
from .models import Employee

router = Router()


class EmployeeIn(Schema):
    first_name: str
    last_name: str
    department_id: int = None
    birthdate: date = None

@router.post("/employees")
def create_employee(request, payload: EmployeeIn):
    employee = Employee.objects.create(**payload.dict())
    return {"id": employee.id}

class EmployeeOut(Schema):
    id: int
    first_name: str
    last_name: str
    department_id: Optional[int] = None
    birthdate: date = None


@router.get("/employees/{employee_id}", response=EmployeeOut)
def get_employee(request, employee_id: int):
    employee = get_object_or_404(Employee, id=employee_id)
    return employee


@router.get("/employees", response=list[EmployeeOut])
def list_employees(request):
    qs = Employee.objects.all()
    return qs

@router.put("/employees/{employee_id}")
def update_employee(request, employee_id: int, payload: EmployeeIn):
    employee = get_object_or_404(Employee, id=employee_id)
    for attr, value in payload.dict().items():
        setattr(employee, attr, value)
    employee.save()
    return {"success": True}


@router.delete("/employees/{employee_id}")
def delete_employee(request, employee_id: int):
    employee = get_object_or_404(Employee, id=employee_id)
    employee.delete()
    return {"success": True}
