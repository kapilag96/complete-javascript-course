import {elements} from './base';

/**
 * Get the search input
 */
export const getInput = () => elements.searchInput.value;


/**
 *
 * @param {String} title - The title that should be trimmed
 * @param {number} limit - The upper limit of the length of the trimmed title
 * that should be returned. (default = 17)
 */
function trimTitle(title, limit = 17){
    if (title.length > limit){
        const words = title.split(' ');
        const out = words.reduce((acc, cur) => {
            const newWord = acc + ' ' + cur;
            if (newWord.length > limit) return acc;
            else return newWord;
        }, '');
        return out + ' ...'
    }
    return title;
}

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
                <h4 class="results__name">${trimTitle(recipe.title)}</h4>
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
