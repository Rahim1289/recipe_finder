from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=100)

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    ingredients = models.ManyToManyField(Ingredient)
    cooking_time = models.IntegerField()  # in minutes
    difficulty = models.CharField(max_length=50)
    instructions = models.TextField()
    image_url = models.URLField()
