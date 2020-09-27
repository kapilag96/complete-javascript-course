import Recipe from './models/Recipe';
import Search from './models/Search';
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

    // 4. Search for recipies
    await state.search.getResults();

    // 5. Render results in UI
    clearLoader();
    searchView.renderResults(state.search.result);
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchPages.addEventListener('click', e => {
    const btn = e.target.closest(`.${elementStrings.pageBtn}`);

    if (!btn) return;

    const goto = parseInt(btn.dataset.goto);

    searchView.clearResults();
    searchView.renderResults(state.search.result, goto);
});

/**
 * Recipe controller
 */
const r = new Recipe(47746);
r.getRecipe();
console.log(r);