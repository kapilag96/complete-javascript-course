import { elements } from './base';
import { Fraction } from 'fractional';

/**
 *
 * @param {object} ingredientObj - An ingredient object
 * @returns {String} HTML markup for an ingredient
 */
function createIngredient(ingredientObj){

    /**
     * Format a count into a nice looking fraction.
     * @param {number} count- The recipe ingredient count.
     * @returns {String} Fraction representation of the count
     */
    function formatCount(count){

        if (!count) return '?';

        count = Math.round(count * 1000) / 1000

        const [int, dec] = count.toString().split('.').map(num => parseInt(num, 10));

        if (!dec) return count;

        if (int === 0){
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`;
        } else {
            const fr = new Fraction(count - int);
            return `${int} ${fr.numerator}/${fr.denominator}`
        }
    }

    return `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredientObj.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredientObj.unit}</span>
            ${ingredientObj.ingredient}
        </div>
    </li>`;
}

/**
 * Render a recipe.
 * @param {recipe} A `Recipe` object
 */
export function renderRecipe(recipe, isLiked){
    const markup = `
    <figure class="recipe__fig">
        <img src="${recipe.img}" alt="Tomato" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart-outlined"></use>
            </svg>
        </button>
    </div>

    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(createIngredient).join(' ')}
        </ul>

        <button class="btn-small recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>`;

    elements.recipe.insertAdjacentHTML('afterbegin', markup);
}

/**
 * Clear the current recipe
 */
export function clearRecipe(){
    elements.recipe.innerHTML = '';
}
