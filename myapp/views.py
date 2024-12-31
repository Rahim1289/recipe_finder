import requests
from django.http import JsonResponse

def get_recipes(request):
    ingredients = request.GET.get('ingredients')
    api_key = '30bac7aec89f44e794f5f59aabd28bb8'
    url = f'https://api.spoonacular.com/recipes/findByIngredients?ingredients={ingredients}&number=5&apiKey={api_key}'

    response = requests.get(url)
    recipes = response.json()

    recipe_list = [{
        'title': recipe['title'],
        'image': recipe['image'],
        'id': recipe['id'],
    } for recipe in recipes]

    return JsonResponse(recipe_list, safe=False)

def get_recipe_details(request, recipe_id):
    api_key = 'YOUR_SPOONACULAR_API_KEY'
    url = f'https://api.spoonacular.com/recipes/{recipe_id}/information?apiKey={api_key}'

    response = requests.get(url)
    recipe_details = response.json()

    details = {
        'title': recipe_details['title'],
        'cooking_time': recipe_details['readyInMinutes'],
        'difficulty': 'N/A',  # Spoonacular does not provide difficulty
        'instructions': recipe_details['instructions'],
        'image_url': recipe_details['image'],
        'ingredients': [ingredient['name'] for ingredient in recipe_details['extendedIngredients']]
    }

    return JsonResponse(details, safe=False)
