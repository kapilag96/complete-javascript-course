import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

/**
 * Global state object
 * - Search object
 * - Shoppist list objet
 * - Liked recipes
 */
const state = {}

async function controlSearch(){

    // 1. Get query from view
    const query = searchView.getInput();

    if (!query) return;
    // 2. Create a new search object
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();

    // 4. Search for recipies
    await state.search.getResults();

    // 5. Render results in UI
    searchView.renderResults(state.search.result);
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
