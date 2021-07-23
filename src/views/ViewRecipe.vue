<template>
    <div>

        <div class="row text-center ml-4">
            <div class="">
                <h1 class="text-danger font-weight-bolder mt-3">{{currentRecipe.recipeName}}</h1>
                <div class="border border-primary">
                    <h3 class="text-danger ml-2 bg-light">Ingredients: </h3>
                    <ul class="border border-white mb-2" v-for="(item) in currentRecipe.recipeIngredients" :key="item.thisRecipesIngredients">
                        <div class="row">
                            <p class="col-sm-1 m-0">{{item.amount}}</p>
                            <p class="col-sm-2 m-0">{{item.type}}</p>
                            <p class="col-sm-7 m-0"> {{item.name}}</p>
                        </div>
                    </ul>
                </div>
                <div class="border border-primary mt-2 col-lg-12">
                    <h3 class="text-danger ml-2 bg-light">Directions: </h3>
                    <p >{{currentRecipe.recipeDirections}}</p>
                </div>

            </div>
            <div>
                <img src="http://www.lol-la.com/wp-content/uploads/2014/06/Cheeseburger-620x400.jpg" style="height: 20rem; width: 25rem;">
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

</style>
