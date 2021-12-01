<template>
    <div class="ml-1">
        <div class="bg-dark row mb-2">
            <h1 class="text-primary ml-5 col-2">Recipes</h1>
            <form class="col-3 mt-2 row" v-on:submit="searchRecipes(searchTerm)">
                <input class="col-10" type="text" id="search" v-model="searchTerm" style="height: 1.5em" v-on:keyup="searchRecipes(searchTerm)">
                <input class="col-2 p-0" type="submit" value="X" style="height: 1.5em">
            </form>
            <form class="text-right m-2  col-4 ">
                    <!--needs to be dynamic list of filter parameters-->
                    <input type="checkbox" id="veg" name="veg" value="Vegetable">
                    <label for="veg" class="p-1">Vegetable</label>
                    <input type="checkbox" id="main" name="main" value="Main" class="ml-2">
                    <label for="main" class="p-1">Main Dish</label>
                    <input type="checkbox" id="userOwned" name="userOwned" value="userOwned" class="ml-2" checked>
                    <label for="userOwned" class="p-1">My Recipes</label>
            </form>
            <div class="col-3 row m-auto">
                <router-link :to="{name:'AddNewRecipe'}">
                    <button class="bg-info btn btn-sm">
<!--                        <font-awesome-icon icon="plus-circle" class="col-2"/>-->
                        <h3 class="text-right m-1 bg-info col-12">Add New Recipe</h3>
                    </button>
                </router-link>
<!--                <font-awesome-icon icon="plus-circle" />-->
            </div>
        </div>

        <div class="row">
            <div class="col-4 border border-dark">
                <div class="row mb-2 mt-2 border-bottom">
                    <div class="col-sm-8">
                        <h2 class="ml-4">{{recipe.recipeName}}</h2>
                        <p>Recipe By: Billy</p>
                    </div>
                    <div class="col-sm-3">
                        <button class="btn btn-outline-secondary col-sm-12">Add</button>
                        <router-link class="text-center" :to="{name:'EditRecipe', params: {recipe:recipe}}" ><!--sends a whole object-->
                            <button class="btn btn-outline-secondary m-0 col-sm-12">Edit</button>
                        </router-link>
                        <input class="btn btn-outline-secondary col-sm-12 bg-warning p-0 mb-2" type="submit"  value="Remove" v-on:click="removeFromList(recipe.recipeId)"/>
                    </div>

                </div>
                <form class="text-center border-bottom pb-2">
                    <select name="day" id="day" v-model="day">
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <select name="mealPeriod" id="mealPeriod" v-model="period">
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                    <input type="button" value="Add To Meal Plan" v-on:click="saveItems(1,recipe)">
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
            <div class="col-7">
                <div v-for="item in filteredRecipes" :key="item.filteredRecipes">
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
                recipe: {},
                day: {
                    type: "Monday"
                },
                period: {
                    type: "Breakfast"
                },
                newRecipes: [],
                filteredRecipes: [],
                searchTerm: "",
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
                    this.filteredRecipes = this.recipes;
                    this.recipe.recipeId = doc.data().recipeId;
                    this.recipe.recipeName = doc.data().recipeName;
                    this.recipe.recipeDirections = doc.data().recipeDirections;
                    this.recipe.recipeIngredients = doc.data().recipeIngredients;
                })
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
            });
            setTimeout(this.randomRecipe(),5000);
        },
        methods:{
            saveItems(planId, recipe){
                console.log(this.day,this.period, recipe.recipeId);
                db.collection("MealPlans")
                    .get()
                    .then((querySnapshot) =>{
                        querySnapshot.forEach((doc) =>{
                            //this is for the default plan.  future will have to have dynamic planID num.
                            if(doc.data().PlanId === planId ){
                                let docId = doc.id;
                                console.log("recipeHere",this.day + this.period);
                                this.newRecipes = doc.data()[this.day + this.period];
                                this.newRecipes.push(recipe.recipeId);
                                this.update(docId);
                            }
                        })
                    })


            },
            update(tempId){
                db.collection("MealPlans")
                    .doc(tempId)
                    .update(
                        {
                            [this.day + this.period]: this.newRecipes
                        }
                    )
            },
            onClickChild (value) {
                console.log("value",value);  // someValue
                this.recipe = value;
            },
            randomRecipe(){
                // setTimeout(this.onClickChild(this.recipes[2]), 10000);
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
            searchRecipes(searchStr){
                //on keyup, search array for name and ingredients
                //count number of chars in search,
                const regexp = new RegExp(searchStr, 'i');
                this.filteredRecipes = this.recipes.filter(x => regexp.test(x.recipeName));
                console.log(searchStr);
                console.log(this.filteredRecipes);

            },
        },

        mounted() {


            // this.recipe = this.recipes[2];
            // this.recipes = db.recipes;
            // this.ingredients = db.ingredientList;

        }
    }
</script>

<style scoped>
label{
    color: #fcf8e3;
}
</style>
