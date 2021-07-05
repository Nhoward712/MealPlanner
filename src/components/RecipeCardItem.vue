<template>
    <div>
        <div class="card border-primary " style="width: 18rem;">
<!--            <img src="..." class="card-img-top" alt="...">-->
            <div class="card-body">
                <h3 class="card-title bg-info">{{recipe.recipeName}}</h3>
                <h5>Directions:</h5>
                <p class="card-text bg-light">{{recipe.recipeDirections}}</p>
                <ul  class="list-group list-group-flush" v-for="ingredient in recipe.recipeIngredients" :key="ingredient.ingredients">
                    <ingredient v-if="isIngredientInRecipe(recipe.recipeId,ingredient)" :show="false" :ingredient="getIngredientObjectById(ingredient)"/>
                </ul><br>
                <router-link class="mt-0 col-sm-5" :to="{name:'EditRecipe', params: {recipe:id}}" ><button>Edit Recipe</button></router-link>
                <input class="mt-0 col-sm-5 bg-warning" type="submit"  value="Remove" v-on:click="removeFromList(recipe.recipeId)"/>

            </div>
        </div>
    </div>
</template>

<script>
    import ingredient from "@/components/IngredientItem";
    import { db } from "../main";
    export default {
        name: "RecipeCardItem",
        components: {
            ingredient,
        },
        data(){
            return {
                id: this.recipe
            }

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
                // console.log("array", this.recipe.recipeIngredients)
                // console.log("Id",id)

                for(let i=0; i<this.ingredient.length; i++){
                    if(this.ingredient[i].ingredientId === id){
                        return this.ingredient[i];
                    }
                }
            },
            removeFromList(tempId){
                // var tempId = prompt ("What is the id of the image you want to delete");
                let fullId ="";
                db.collection("recipes")
                    .get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach(doc =>{
                            const id = doc.data();
                            if(tempId == id.recipeId){
                                fullId = doc.id;

                            }
                        })
                    })
                    .then(() =>{
                        db.collection("recipes")
                            .doc(fullId)
                            .delete()
                            .catch(error => console.log(error))
                    })

            }
        },
    }
</script>

<style scoped>

</style>
