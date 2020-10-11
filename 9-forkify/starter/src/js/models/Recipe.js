import axios from 'axios';

export default class Recipe{
    constructor(id){
        this.id = id;
        // The default servings
        this.servings = 4;
    }

    /**
     * Get the recipe from food2fork API for ``this.id``.
     */
    async getRecipe(){
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const recipe = result.data.recipe;
            // Set all the neeeded attributes for this recipe
            this.title       = recipe.title;
            this.author      = recipe.publisher;
            this.img         = recipe.image_url;
            this.url         = recipe.source_url;
            this.ingredients = recipe.ingredients.map(this.parseIngredient);

        } catch (error){
            console.log(error);
        }
    }

    /**
     * The approximate time needed to create this recipe.
     */
    get time(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        return periods * 15;
    }

    /**
     *
     * @param {String} ingredient - An ingridient string from the forkify API.
     * @returns {Object} Parsed ingredient object.
     */
    parseIngredient(ingredient){

        let ele = ingredient.toLowerCase();

        // Remove items in paranthesis
        ele = ele.replace(/ *\([^)]*\) */g, ' ');

        // Uniform units
        const unitMap = new Map([
            [ 'tbsp', ['tablespoons', 'tablespoon']],
            [   'oz', ['ounces', 'ounce']          ],
            [  'tsp', ['teaspoons', 'teaspoon']    ],
            [  'cup', ['cups']                     ],
            ['pound', ['pounds']                   ]
        ]);

        // Replace all non uniform units with their uniform units
        unitMap.forEach((nonStdUnits, stdUnit) => {
            nonStdUnits.forEach(nonStdUnit => {
                ele = ele.replace(nonStdUnit, stdUnit);
            });
        });

        // Parse ingredients into count, unit and ingredient
        const ingArr    = ele.split(' ');
        const units = [...Array.from(unitMap.keys()), 'g', 'kg'];
        const unitIndex = ingArr.findIndex(i => units.includes(i));

        let objIng;
        if (unitIndex > -1){
            //There is a unit
            let countString = ingArr.slice(0, unitIndex).join('+');
            countString = countString.replace('-', '+');
            objIng = {
                count     : eval(countString),
                unit      : ingArr[unitIndex],
                ingredient: ingArr.slice(unitIndex + 1).join(' ')
            }
        } else if (unitIndex === -1){
            // There is no unit and no number
            objIng = {
                count     : 1,
                unit      : '',
                ingredient: ingArr.join(' ')
            };
        } else if (parseInt(ingArr[0]), 10){
            // There is no unit but a number
            objIng = {
                count     : parseInt(ingArr[0], 10),
                unit      : '',
                ingredient: ingArr.slice(1).join(' ')
            };
        }
        return objIng;
    }

    /**
     * Update the servings and ingredient count for this `Recipe`.
     * Do nothing if ``this.servings`` is 1.
     * @param {String} type - ``dec`` to decrease the servings by 1,
     * ``inc`` to increase the servings by 1.
     */
    updateServings(type){
        // Find the new servings amount
        const newServings = type === 'dec'? this.servings - 1: this.servings + 1;
        if (newServings < 1) return;
        // Update the ingredient counts
        this.ingredients.forEach((ing => {
            ing.count *= newServings / this.servings;
        }))
        // Update the servings
        this.servings = newServings;
    }
}
