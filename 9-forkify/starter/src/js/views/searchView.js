import {elements} from './base';

/**
 * Get the search input
 */
export const getInput = () => elements.searchInput.value;

/**
 * Render one recipe object.
 * @param {object} recipe - One recipe object from the API.
 */
function renderRecipe(recipe){
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;

    elements.searchResultList.insertAdjacentHTML('beforeEnd', markup);
}

/**
 * Render all the search results from the API.
 * @param {Array} recipes - An array of recipes from the API.
 */
export function renderResults(recipes){
    recipes.forEach(renderRecipe);
}

/**
 * Clears the existing search view DOM elements
 */
export function clearResults(){
    elements.searchResultList.innerHTML = '';
}

export function clearInput(){
    elements.searchInput.value = '';
}
