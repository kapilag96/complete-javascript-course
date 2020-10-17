import uniqueid from 'uniqid';

export default class List{
    constructor(){
        this.items = [];
    }

    /**
     * Add an item in the shopping list.
     * @param {number} count - The count.
     * @param {string} unit - The unit of the count.
     * @param {string} ingredient - The cooking ingredient.
     */
    addItem(count, unit, ingredient){
        // Add an ID to the item
        const item = {
            id: uniqueid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return this.items();
    }

    /**
     * Delete an item from the shopping list
     * @param {String} id - ID of the item which has to be deleted
     */
    deleteItem(id){
        this.items = this.items.filter((el => el.id !== id));
    }

    /**
     * Update the count of an item in the list.
     * @param {String} id - The ID of the item whose count is to be updated
     * @param {number} newCount - The new count
     */
    updateCount(id, newCount){
        const item = this.items.find(el => el.id === id);
        item.count = newCount;
    }
}
