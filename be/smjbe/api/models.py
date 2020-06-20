from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Projects(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Apis(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)
    method = models.CharField(max_length=6, null=False, blank=False)
    endpoint = models.CharField(max_length=50, null=False, blank=False)
    resource = models.CharField(max_length=30, null=False, blank=False)
    parameters = models.CharField(max_length=30, null=True, blank=True)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateField(auto_now=True)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
