<template>
    <div class="ml-4 ">

<!--        <router-link class="mt-0" :to="{name:'ViewRecipe', params: {recipe:id}}" >-->
            <!--            <img src="..." class="card-img-top" alt="...">-->
            <div class="">
                <div v-on:click="onClickButton(recipe)"  class="row">
                    <h3 class="pl-3 col-sm-12 text-left">{{recipe.recipeName}}</h3>
<!--                    <router-link class="text-center col-sm-3" :to="{name:'EditRecipe', params: {recipe:id}}" >-->
<!--                        <button class="m-0">Edit Recipe</button>-->
<!--                    </router-link>-->
<!--                    <input class="col-sm-2 bg-warning text-center" type="submit"  value="Remove" v-on:click="removeFromList(recipe.recipeId)"/>-->
                </div>
            </div>
<!--        </router-link>-->
    </div>
</template>

<script>
    // import ingredient from "@/components/IngredientItem";
    import { db } from "../main";
    export default {
        name: "RecipeCardItem",
        components: {
            // ingredient,
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
            onClickButton (event) {
                this.$emit('btnClicked', event);
                console.log("emitted");
            },
            isIngredientInRecipe(recipeId,ingredientID){
                let recipeIngredients = this.recipe.recipeIngredients;
                let isTrue = false;
                for(let i = 0; i<recipeIngredients.length; i++){
                    if(recipeIngredients[i].ingredientId === ingredientID){
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
            removeFromList(tempId){
                // var tempId = prompt ("What is the id of the image you want to delete");
                let fullId ="";
                db.collection("recipes")
                    .get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach(doc =>{
                            const id = doc.data();
                            if(tempId === id.recipeId){
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
    h3 {
        background-color: #9fcdff;
        color: #1b1e21;
        font-size: 1.5rem;
    }
    h3:hover {
        background-color: #fcf8e3;
        cursor: pointer;
    }
</style>
