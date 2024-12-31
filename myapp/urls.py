from django.urls import path
from .views import get_recipes, get_recipe_details

urlpatterns = [
    path('recipes/', get_recipes, name='get_recipes'),
    path('recipes/<int:recipe_id>/', get_recipe_details, name='get_recipe_details'),
]
