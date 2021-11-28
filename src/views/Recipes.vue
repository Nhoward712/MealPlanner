<template>
    <div class="ml-1">
        <div class="bg-dark row">
            <h1 class="text-primary ml-5">Recipes</h1>
            <form class="row">
                <input class="ml-5 mt-2" type="text" id="search" style="height: 1.5em">
                <input class="ml-1 mt-2 p-0 " type="submit" value="Search" style="height: 1.5em">
            </form>

            <div class="ml-auto mr-5 bg-info card-title">
                <router-link :to="{name:'AddNewRecipe'}"><button class="border border-dark bg-info row">
                    <font-awesome-icon icon="plus-circle" /><h3 class="text-right bg-info">Add New Recipe</h3>
                </button></router-link>
            </div>
        </div>

        <div class="row">
            <div class="col-4 border border-dark">
                <div class="row mb-2 border border-bottom">
                    <h2 class="ml-4 col-sm-8">{{recipe.recipeName}}</h2>
                    <div class="col-sm-3">
                        <router-link class="text-center" :to="{name:'EditRecipe', params: {recipe:recipe}}" ><!--sends a whole object-->
                            <button class="m-0 col-sm-12">Edit</button>
                        </router-link>
                        <input class="col-sm-12 bg-warning p-0 mb-2" type="submit"  value="Remove" v-on:click="removeFromList(recipe.recipeId)"/>
                    </div>
                </div>
                <form class="text-center border-bottom pb-2">
                    <select name="day" id="day">
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <select name="mealPeriod" id="mealPeriod">
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                    <input type="submit" value="Add To Meal Plan">
                </form>
                <h3 class="text-danger ml-2 bg-light">Ingredients: </h3>
                <ul class="border border-white mb-2" v-for="(item) in recipe.recipeIngredients" :key="item.thisRecipesIngredients">
                    <div class="row">
                        <p class="col-sm-1 m-0">{{item.amount}}</p>
                        <p class="col-sm-2 m-0">{{item.type}}</p>
                        <p class="col-sm-7 m-0"> {{item.name}}</p>
                    </div>
                </ul>
                <div class="border border-primary mt-2 col-lg-12">
                    <h3 class="text-danger ml-2 bg-light">Directions: </h3>
                    <p >{{recipe.recipeDirections}}</p>
                </div>
            </div>
            <div class="col-8">
                <div v-for="item in recipes" :key="item.recipes">
                    <recipeCard  v-on:btnClicked="onClickChild($event)" :ingredient="ingredients" :recipe="item">d</recipeCard>
                </div>
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
    // import ViewRecipe from "@/views/ViewRecipe";
    export default {
        name: "Recipes",
        components: {
            // ViewRecipe,
            // ingredient,
            recipeCard

        },

        props:{

        },
        data(){
            return{
                recipes: [],
                ingredients: [],
                recipe: "",

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
            onClickChild (value) {
                console.log(value);  // someValue
                this.recipe = value;

            },
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
