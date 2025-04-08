from django.db import models
from django.utils import timezone
from django.core.validators import URLValidator

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)
    email = models.EmailField(unique=True, null=False, blank=False)
    password = models.CharField(max_length=300, null=False, blank=False)
    image = models.CharField(max_length=300, null=True, blank=True, validators=[URLValidator()])

    def __str__(self):
        return self.name + "__" + self.email;

class Note(models.Model):
    title=models.CharField(max_length=200, null=False, blank=False)
    content=models.TextField(null=False, blank=False)
    created_at = models.DateTimeField("created at", default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title + "__by_" + self.user.name + "_" + str(self.user.id) + "__" + str(self.created_at)
