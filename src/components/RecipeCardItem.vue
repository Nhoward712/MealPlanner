<template>
    <div>
        <p>name: {{recipe.recipeName}}</p>
        <p>Instructions: {{recipe.recipeDirections}}</p>
<!--        <ingredient :ingredient="2"></ingredient>-->
        <div v-for="ingredient in recipe.recipeIngredients" :key="ingredient.ingredients">
            <ingredient v-if="isIngredientInRecipe(recipe.recipeId,ingredient)" :ingredient="getIngredientObjectById(ingredient)"/>
        </div><br>
    </div>
</template>

<script>
    import ingredient from "@/components/IngredientItem";

    export default {
        name: "RecipeCardItem",
        components: {
            ingredient,
        },
        props:{
            ingredient: {
                type: Array,
                default: null
            },
            recipe:{
                type: Object,
                default: null
            },

        },

        methods:{
            isIngredientInRecipe(recipeId,ingredientID){
                let recipeIngredients = this.recipe.recipeIngredients;
                let isTrue = false;
                for(let i = 0; i<recipeIngredients.length; i++){
                    if(recipeIngredients[i] === ingredientID){
                        isTrue=true;
                    }
                }
                return isTrue;
            },
            getIngredientObjectById(id){
                for(let i=0; i<this.ingredient.length; i++){
                    if(this.ingredient[i].ingredientId === id){
                        return this.ingredient[i];
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>
