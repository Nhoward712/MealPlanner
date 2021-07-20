<template>
    <div>

    <h1 class="bg-dark text-center text-warning">Recipes</h1>
<!--        <router-link :to="{name:'AddNewRecipe'}"><button>Add New Recipe</button></router-link>-->
        <div class="row">
            <div>
                <router-link :to="{name:'AddNewRecipe'}"><button>
                    <div class="card border-primary " style="width: 18rem;">
                        <!--            <img src="..." class="card-img-top" alt="...">-->
                        <div class="card-body">

                            <h3 class="card-title bg-info">Add New Recipe</h3>
                            <!--                        <h5>Directions:</h5>-->
                            <!--                        <p class="card-text bg-light">{{recipe.recipeDirections}}</p>-->
                        </div>
                    </div>
                </button></router-link>
            </div>

            <div v-for="item in recipes" :key="item.recipes">
                    <recipeCard  :ingredient="ingredients" :recipe="item">d</recipeCard>
            </div>

        </div>
    </div>
</template>

<script>
    import '@fortawesome/fontawesome-free'
    // import FontAwesomeIcon from "@fortawesome/vue-fontawesome";

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
                    this.recipes.push(
                        {
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

</style>
