import Likes from './models/Likes';
import List from './models/List';
import Recipe from './models/Recipe';
import Search from './models/Search';
import * as likesView from './views/likesView';
import * as listView from './views/listView';
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

    // Highlight the selected search result
    if (state.search) searchView.highlightSelected(id);

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


/**
 * List controller
 */
function controlList(){
    // Create a list if one does not exist
    if (!state.list) state.list = new List();

    // Store all ingredients in the list
    state.recipe.ingredients.map(ig => {
        state.list.addItem(ig.count, ig.unit, ig.ingredient);
    })

    // render list
    listView.renderShoppingList(state.list.items);
}

/**
 * Likes Controller
 */
function controlLikes(){
    // Create a Likes instance if one does not exist
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // If current recipe liked
    if (!state.likes.isLiked(currentID)){
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
            );

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to the UI list

    // If user has pressed unlike
    } else {
        // Remove the like from Likes
        const removedLike = state.likes.deleteLike(currentID);

        // Render the like button
        likesView.toggleLikeBtn(false);

        // Remove like from the UI list
    }
}

// Handle delete and list item events
elements.shoppingList.addEventListener('click', e => {
    // Find the element
    const ele = e.target.closest('.shopping__item');
    const id  = ele.dataset.itemid;

    // Handle the delete button
    if (e.target.closest('.shopping__delete')){
        state.list.deleteItem(id);
        listView.renderShoppingList(state.list.items);

    // Handle the count update
    } else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

/**
 * Handling recipe button clicks
 */
elements.recipe.addEventListener('click', e => {
    if (e.target.closest('.btn-decrease')){
        state.recipe.updateServings('dec');
        recipeView.clearRecipe();
        recipeView.renderRecipe(state.recipe);
    } else if (e.target.closest('.btn-increase')){
        state.recipe.updateServings('inc');
        recipeView.clearRecipe();
        recipeView.renderRecipe(state.recipe);
    } else if (e.target.closest('.recipe__btn--add')){
       controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        controlLikes();
    }

});
