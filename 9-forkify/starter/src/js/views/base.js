export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm : document.querySelector('.search'),
    searchResultList: document.querySelector('.results__list'),
    searchContainer: document.querySelector('.results')
};

export const elementStrings = {
    loader: 'loader'
}

/**
 * Render a loader on the parent element
 * @param {Node} parent
 */
export function renderLoader(parent){
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
}

/**
 * Clear the loader
 */
export function clearLoader(){
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}
