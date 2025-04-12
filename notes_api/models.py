from django.db import models
from django.utils import timezone
from django.core.validators import URLValidator
from django.contrib.auth.models import User

class Note(models.Model):
    title=models.CharField(max_length=200, null=False, blank=False)
    content=models.TextField(null=False, blank=False)
    created_at = models.DateTimeField("created at", default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title + "__by_" + self.user.username + "_" + str(self.user.id) + "__" + str(self.created_at)
