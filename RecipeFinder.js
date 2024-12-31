import React, { useState } from 'react';
import './RecipeFinder.css';

function RecipeFinder() {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const fetchRecipes = async () => {
        try {
            const response = await fetch(`http://localhost:8000/myapp/recipes/?ingredients=${ingredients}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const fetchRecipeDetails = async (recipeId) => {
        const response = await fetch(`http://localhost:8000/myapp/recipes/${recipeId}/`);
        const data = await response.json();
        setSelectedRecipe(data);
    };

    return (
        <div className="container">
            <h1 className="title">Recipe Finder by Ingredients</h1>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients separated by commas"
                className="input"
            />
            <button onClick={fetchRecipes} className="button">Find Recipes</button>
            <ul className="recipe-list">
                {recipes.map((recipe) => (
                    <li key={recipe.id} onClick={() => fetchRecipeDetails(recipe.id)} className="recipe-item">
                        <h2 className="recipe-title">{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                    </li>
                ))}
            </ul>
            {selectedRecipe && (
                <div className="recipe-details">
                    <h2>{selectedRecipe.title}</h2>
                    <p>Cooking Time: {selectedRecipe.cooking_time} minutes</p>
                    <p>Difficulty: {selectedRecipe.difficulty}</p>
                    <p>Instructions: {selectedRecipe.instructions}</p>
                    <ul>
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <img src={selectedRecipe.image_url} alt={selectedRecipe.title} className="recipe-image-detail" />
                </div>
            )}
        </div>
    );
}

export default RecipeFinder;
