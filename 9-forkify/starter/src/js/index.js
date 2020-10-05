import Recipe from './models/Recipe';
import Search from './models/Search';
import * as recipeView from './views/recipeView';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader, elementStrings } from './views/base';

/**
 * Global state object
 * - Search object
 * - Shoppist list objet
 * - Liked recipes
 */
const state = {};

/**
 * Search controller
 */
async function controlSearch() {

    // 1. Get query from view
    const query = searchView.getInput();

    if (!query) return;
    // 2. Create a new search object
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchContainer);

    try{
        // 4. Search for recipies
        await state.search.getResults();

        // 5. Render results in UI
        clearLoader();
        searchView.renderResults(state.search.result);

    } catch (err){
        console.log(`Could not load the recipe search results.\n${err}`);
        clearLoader();
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchPages.addEventListener('click', e => {
    const btn = e.target.closest(`.${elementStrings.pageBtn}`);

    if (!btn) return;

    const goto = parseInt(btn.dataset.goto, 10);

    searchView.clearResults();
    searchView.renderResults(state.search.result, goto);
});

/**
 * Recipe controller
 */
async function controlRecipe(){

    // Get the ID from url
    const id = window.location.hash.replace('#', '');

    // Skip if no ID
    if (!id) return;

    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Create new Recipe object
    state.recipe = new Recipe(id);

    try {
        // Get recipe data
        await state.recipe.getRecipe();

        // Render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);
    } catch (err){
        console.log(`Could not fetch the recipe details.\n${err}`)
    }
}

// Add Recipe event listeners
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));