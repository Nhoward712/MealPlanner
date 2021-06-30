<template>
    <div>
    <h1 class="bg-primary">Recipes</h1>

        <div v-for="item in recipes" :key="item.recipes">
<!--        I put the following code into the component -recipeCard-->
<!--            <p>name: {{item.recipeName}}</p>-->
<!--            <p>Instructions: {{item.recipeDirections}}</p>-->
<!--            <div v-for="ingredient in recipes[item.recipeId-1].recipeIngredients" :key="ingredient.ingredients">-->
<!--                <ingredient v-if="isIngredientInRecipe(item.recipeId,ingredient)" :ingredient="getIngredientObjectById(ingredient)"/>-->
<!--            </div><br>-->
            <recipeCard :ingredient="ingredients" :recipe="item">d</recipeCard>
        </div>
    </div>
</template>

<script>

    import { db } from "../main";
    // import ingredient from "@/components/IngredientItem";
    import recipeCard from "@/components/RecipeCardItem";
    export default {
        name: "Recipes",
        components: {
            // ingredient,
            recipeCard
        },

        props:{

        },
        data(){
            return{
                recipes: [],
                ingredients: [],


            }
        },
        created() {

            db.collection("recipes").onSnapshot((snapshotChange) => {
                this.recipes = [];
                snapshotChange.forEach((doc) => {
                    this.recipes.push({
                            recipeId: doc.data().recipeId,
                            recipeName: doc.data().recipeName,
                            recipeDirections: doc.data().recipeDirections,
                            recipeIngredients: doc.data().recipeIngredients,

                        }
                    );
                });
            });
            db.collection("ingredientList").onSnapshot((snapshotChange) => {
                this.ingredients = [];
                snapshotChange.forEach((doc) => {
                    this.ingredients.push({
                            ingredientId: doc.data().ingredientId,
                            name: doc.data().name,
                            onHand: doc.data().onHand,
                            purchased: doc.data().purchased,
                            cost: doc.data().cost,
                        }
                    );
                })
            })

        },
        methods:{
            isIngredientInRecipe(recipeId,ingredientID){
                let recipeIngredients = this.recipes[recipeId-1].recipeIngredients;
                let isTrue = false;
                for(let i = 0; i<recipeIngredients.length; i++){
                    if(recipeIngredients[i] === ingredientID){
                        isTrue=true;
                    }
                }
                    return isTrue;
            },
            getIngredientObjectById(id){
                for(let i=0; i<this.ingredients.length; i++){
                    if(this.ingredients[i].ingredientId === id){
                        return this.ingredients[i];
                    }
                }
            },
        },

        mounted() {

            // this.recipes = db.recipes;
            // this.ingredients = db.ingredientList;

        }
    }
</script>

<style scoped>
h1{
    color: #229922;
}
</style>
