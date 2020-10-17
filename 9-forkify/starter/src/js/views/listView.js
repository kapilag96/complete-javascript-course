import {elements} from './base';

/**
 * Return the html for an item object.
 * @param {Object} item - An item object
 */
function renderShoppintListItem(item){
    const markup = `
    <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>`;
    return markup;
}

/**
 * Render the shopping list.
 * @param {Array} itemList - An array of shopping items.
 */
export function renderShoppingList(itemList){
    const markups = itemList.map(renderShoppintListItem).join('');
    // Clear the HTML from the shopping list
    elements.shoppingList.innerHTML = '';
    // Render all the shopping items
    elements.shoppingList.insertAdjacentHTML('afterbegin', markups);
}
