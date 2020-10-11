import {elements, elementStrings} from './base';

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
 * Render the pagination buttons.
 * @param {number} page - The current active page
 * @param {number} totalResults - Total number of recipes
 * @param {number} resultsPerPage - Number of results displayed per page
 */
function renderButtons(page, totalResults, resultsPerPage){
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    /**
     * Create a pagination button HTML.
     * @param {number} page - Page number
     * @param {string} type - The button type, `prev` or `next`.
     */
    const createButton = (page, type) => `
    <button class="${elementStrings.pageBtn} results__btn--${type}" data-goto=${type === 'prev'? page - 1: page + 1}>
        <span>Page ${type === 'prev'? page - 1: page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev'? 'left': 'right'}"></use>
        </svg>
    </button>`;

    let button;
    if (page === 1){
        // The first page so only next button is shown
        button = createButton(page, 'next');
    } else if (page === totalPages){
        // Only the last button is shown
        button = createButton(page, 'prev');
    }else {
        // Show both buttons
        button = createButton(page, 'prev') + createButton(page, 'next');
    }
    elements.searchPages.insertAdjacentHTML('afterbegin', button);
}

/**
 * Render all the search results from the API.
 * @param {Array} recipes - An array of recipes from the API.
 */
export function renderResults(recipes, page = 1, resultsPerPage = 10){
    const start = resultsPerPage * (page - 1);
    const end = start + resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resultsPerPage);
}

/**
 * Clears the existing search view DOM elements and pagination buttons.
 */
export function clearResults(){
    elements.searchResultList.innerHTML = '';
    elements.searchPages.innerHTML = '';
}

/**
 * Clear the input in the search field.
 */
export function clearInput(){
    elements.searchInput.value = '';
}
