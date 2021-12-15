<template>
    <div class="ml-4 ">
            <div class="container-fluid mb-1">
                <div v-on:click="onClickButton(recipe)"  class="row border border-1 border-light" >

                    <div v-if="recipe.image && !ingredient" class="col-sm-3  p-0">
                        <div v-if="recipe.image">
                            <img :src=recipe.image.imageURL >
                        </div>
                    </div>
                    <div v-if="!recipe.image && !ingredient" class="col-sm-3  p-0">
                        <img src="../assets/noImage.png" >
                    </div>

<!--                    <img src="../assets/IMG_0789.jpeg"  class="col-sm-3">-->
                    <h3 class=" col-sm-9 text-left"> {{recipe.recipeName}}<span v-if="recipe.recipeOwner"> -by: {{recipe.recipeOwner}}</span> </h3>
                </div>
            </div>
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
                id: this.recipe,
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
        created(){
            console.log("here", this.recipe)
        },

        methods:{
            onClickButton (event) {
                this.$emit('btnClicked', event);
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
        background-color: #fff;
        color: #1b1e21;
        font-size: 1.5rem;
    }
    h3:hover {
        background-color: #fcf8e3;
        cursor: pointer;
    }
    img{
        height: 70px;
        width: 90px;
        object-fit: cover
    }

</style>
