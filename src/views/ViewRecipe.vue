<template>
    <div class="container-fluid ms-3 mb-5 ">

        <div class="row recipe-box ml-4">
            <div class="col-sm-12 row">
                <h1 class="text-danger font-weight-bolder mt-3">{{currentRecipe.recipeName}}</h1>
                <div class="border border-2 rounded-3 col-md-3">
                    <h3 class="text-danger ml-2 bg-light ">
                        Ingredients:
                        <button type="button" class="btn btn-light border-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#ingredientModal">
                            Edit
                        </button>
                    </h3>
                    <div class="recipe-box overflow-scroll">
                        <ul class="border border-white m-2 " v-for="(item) in currentRecipe.recipeIngredients" :key="item.thisRecipesIngredients">
                            <div class="row ">
                                <p class="col-sm-1 m-0">{{item.amount}}</p>
                                <p class="col-sm-3 m-0">{{item.type}}</p>
                                <p class="col-sm-6 m-0 text-right"> {{item.name}}</p>
                            </div>
                        </ul>
                    </div>

                </div>
                <div class="border border-2 rounded-3 mt-0 col-md-5 ">
                    <h3 class="text-danger ml-2 bg-light">Directions:
                        <button type="button" class="btn btn-light border-secondary shadow-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#directionsModal">
                            Edit
                        </button>
                    </h3>
                    <p >{{currentRecipe.recipeDirections}}</p>
                </div>
                <div v-if="currentRecipe.image" class="col-sm-12 col-md-4 rounded-3 border border-2">
                    <img :src=recipe.image.imageURL class="img-thumbnail border-5 border-secondary shadow-sm">
                    <div class="notes-box border mb-1 mt-1">
                        <h4>Notes:</h4>
                    </div>
                </div>

            </div>

        </div>

        <!-- Edit Ingredient Modal -->
        <div class="modal fade" id="ingredientModal" tabindex="-1" aria-labelledby="ingredientModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ingredientModalLabel">Edit Ingredients</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group list-group-flush" v-for="(item,i) in recipe.recipeIngredients" :key="item.thisRecipesIngredients">
                            <div class="row">
                                <input class="col-sm-1" v-model="item.amount" @keyup.enter="rebuildRecipeIngredients(item.name,i)"/>
                                <input class="col-sm-2" v-model="item.type" @keyup.enter="rebuildRecipeIngredients(item.name,i)"/>
                                <input class="col-sm-7" v-model="item.name" @keyup.enter="rebuildRecipeIngredients(item.name,i)"/>
                                <input class="mt-0 col-sm-2" type="submit"  value="Remove" v-on:click="removeFromList(i)"/>
                            </div>

                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="directionsModal" tabindex="-1" aria-labelledby="directionsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="directionsModalLabel">Edit Ingredients</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <textarea type="text" class="form-control col col-sm-12 h-75 text-wrap" v-model="recipe.recipeDirections" id="recipeDirections" rows="10" placeholder="Directions"></textarea><br>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "viewRecipe",
        props: {
            recipe: {
                type: Object,

            }
        },
        data(){
            return {
                currentRecipe: this.recipe
            }
        },
        created(){
            // console.log(this.recipe);
            if (this.recipe) {
                this.currentRecipe = this.recipe;
                console.log(this.currentRecipe)
            }
        }
    }
</script>

<style scoped>
img{
    height: 350px;
    width: auto;
}
    p{
        font-size: 1.5em;
    }
    .recipe-box{
        height: 450px;
    }
    .image-box{
        height: 225px;
    }
    .notes-box{
        height: 144px;
    }
</style>
