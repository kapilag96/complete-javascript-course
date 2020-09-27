import axios from 'axios';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    /**
     * Get the recipe from food2fork API for ``this.id``.
     */
    async getRecipe(){
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const recipe = result.data.recipe;
            console.log(recipe);
            // Set all the neeeded attributes for this recipe
            this.title       = recipe.title;
            this.author      = recipe.publisher;
            this.img         = recipe.image_url;
            this.url         = recipe.source_url;
            this.ingredients = recipe.ingredients;

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
     * The number of servings created using this recipe.
     */
    get recipe(){
        return 4;
    }
}
