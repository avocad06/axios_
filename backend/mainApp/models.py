from django.db import models
from drfproject.settings import AUTH_USER_MODEL
# Create your models here.

class Review(models.Model):
    title = models.CharField(max_length=50,blank=True)
    content = models.TextField(blank=True)
    updated_at = models.DateField(auto_now=True)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)