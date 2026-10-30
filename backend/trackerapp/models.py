from django.db import models

# Create your models here.
class Activity(models.Model):
    student_name=models.CharField(max_length=200)
    activity=models.CharField(max_length=300)
    hours = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.student_name