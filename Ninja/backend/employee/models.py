from django.db import models

# Create your models here.
class Department(models.Model):
    title = models.CharField(max_length=100)

class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    department = models.ForeignKey(blank=True, null=True, to=Department, on_delete=models.CASCADE)
    birthdate = models.DateField(null=True, blank=True)
    cv = models.FileField(null=True, blank=True)

