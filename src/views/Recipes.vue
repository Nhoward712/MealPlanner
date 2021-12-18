<template>
    <div class="ml-1">
<!--Header-->
        <div class="bg-dark row mb-2">
            <h1 class="text-primary ms-3 col-2">Recipes</h1>
            <form class="col-3 mt-2 row" v-on:submit="searchRecipes(searchTerm)">
                <input class="col-10" type="search" id="search" v-model="searchTerm" style="height: 1.5em" v-on:keyup="searchRecipes(searchTerm)" placeholder="Search Recipes">
                <input class="col-2 p-0" type="submit" value="X" style="height: 1.5em">
            </form>
            <form class="text-right m-1  col-4 ">
                    <!--needs to be dynamic list of filter parameters-->
<!--                    <input type="checkbox" id="veg" name="veg" value="Vegetable">-->
<!--                    <label for="veg" class="p-1">Vegetable</label>-->
<!--                    <input type="checkbox" id="main" name="main" value="Main" class="ml-2" >-->
<!--                    <label for="main" class="p-1">Main Dish</label>-->
                    <input type="checkbox" id="userOwned" name="userOwned" value="userOwned" v-model="owned" v-on:change="filter()"  class="ms-5" >
                    <label for="userOwned" class="p-1" >My Favorites</label>
            </form>
            <div class="col-3 row m-auto">
                <router-link :to="{name:'AddNewRecipe',params:{userRole, userName}}">
                    <button class="bg-info btn btn-sm">
<!--                        <font-awesome-icon icon="plus-circle" class="col-2"/>-->
                        <h3 class="text-right m-1 bg-info col-12">Add New Recipe</h3>
                    </button>
                </router-link>
<!--                <font-awesome-icon icon="plus-circle" />-->
            </div>
        </div>

        <div class="row m-2 border border-3 content-box justify-content-center">
<!--Menu List-->
            <div class="col-lg-7 menuBackground recipeSearchResults border rounded-3 me-2 mt-3 overflow-scroll">
                <div v-for="item in filteredRecipes" :key="item.filteredRecipes">
                    <recipeCard  v-on:btnClicked="onClickChild($event)" :ingredient="ingredients" :recipe="item">d</recipeCard>
                </div>
            </div>
<!--Recipe Box-->
            <div class="col-lg-4 border border-dark rounded-3 recipe-box overflow-scroll mt-3">
                <div class="row mb-2 mt-2 border-bottom">
                    <div class="col-sm-8">
                        <h2 class="ml-4">{{recipe.recipeName}}</h2>
                        <p class="m-auto">Recipe By: {{recipe.recipeOwner}}</p>

                    </div>
                    <div class="col-sm-3">
                        <div v-if="this.userFavorites.includes(recipe.recipeId)">
                            <button class="btn btn-outline-secondary col-sm-12 "
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Remove recipe from your Favorites"
                                    v-on:click="removeFromFavorites(recipe)">Remove
                            </button>
                        </div>
                        <div v-else>
                            <button class="btn btn-outline-secondary col-sm-12"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Add Recipes to your Favorites"
                                    v-on:click="addToFavorites(recipe)">Add
                            </button>
                        </div>
                        <router-link v-if="recipe.recipeOwner == userName" class="text-center" :to="{name:'EditRecipe', params: {recipe:recipe}}" ><!--sends a whole object-->
                            <button class="btn btn-outline-secondary m-0 col-sm-12">Edit</button>
                        </router-link>
                    </div>

                </div>
    <!-- Add to meal Plan-->
                <form class="text-center border-bottom pb-2">
                    <select name="day" id="day" v-model="day">
                        <option selected value="Monday">Monday</option>
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
                    <input type="button" value="Add To Meal Plan" v-on:click="saveItems(userName,recipe)">
                </form>
                <div v-if="recipe.image">
                    <img :src=recipe.image.imageURL class="img-thumbnail">
                </div>
    <!--recipe details-->
                <h3 class="text-danger ml-2 bg-light">Ingredients: </h3>
                <ul class="border border-white container-fluid mb-2" v-for="(item) in recipe.recipeIngredients" :key="item.thisRecipesIngredients">
                    <div class="row">
                        <p class="col-1 m-0">{{item.amount}}</p>
                        <p class="col-2 m-0">{{item.type}}</p>
                        <p class="col-6 m-0"> {{item.name}}</p>
                    </div>
                </ul>
                <div class="border border-primary mt-2 col-lg-12">
                    <h3 class="text-danger ml-2 bg-light">Directions: </h3>
                    <p class="p-2">{{recipe.recipeDirections}}</p>
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
            userName: {},
            UserRole: {},
        },
        data(){
            return{
                recipes: [],
                ingredients: [],
                recipe: {},
                day: "Monday",
                period: "Breakfast",
                newRecipes: [],
                filteredRecipes: [],
                searchTerm: "",
                userFavorites: [],
                owned: false

            }
        },

        created() {
            this.userRole = this.$route.params.userRole; //this pulls the param that was sent by the router
            this.userName = this.$store.state.userName; // this one uses vuex... better
            this.getAllRecipes();
            this.getIngredients();
            this.getUserFavorites();


        },
        methods:{
            getAllRecipes(){
                db.collection("recipes").onSnapshot((snapshotChange) => {
                    this.recipes = [];
                    snapshotChange.forEach((doc) => {
                        this.recipes.push(
                            {
                                recipeId: doc.data().recipeId,
                                recipeName: doc.data().recipeName,
                                recipeDirections: doc.data().recipeDirections,
                                recipeIngredients: doc.data().recipeIngredients,
                                recipeOwner: doc.data().recipeOwner,
                                image: doc.data().image,

                            }
                        );
                        this.filteredRecipes = this.recipes;
                        this.recipe.recipeId = doc.data().recipeId;
                        this.recipe.recipeName = doc.data().recipeName;
                        this.recipe.recipeDirections = doc.data().recipeDirections;
                        this.recipe.recipeIngredients = doc.data().recipeIngredients;
                    })
                });
            },
            getIngredients(){
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
            },
            getUserFavorites(){
                db.collection("users").where("userName", "==", this.userName)
                    .get()
                    .then((querySnapshot) => {
                        this.userFavorites = [];
                        querySnapshot.forEach((doc) => {
                            if(doc.data().recipes) {
                                for (let i = 0; i < doc.data().recipes.length; i++) {
                                    this.userFavorites.push(doc.data().recipes[i])
                                }
                            }
                        })
                    })
            },
            saveItems(planId, recipe){
                // console.log(this.day,this.period, recipe.recipeId);
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
                                this.updateMealPlan(docId);
                            }
                        })
                    })
            },
            updateMealPlan(tempId){
                db.collection("MealPlans")
                    .doc(tempId)
                    .update(
                        {
                            [this.day + this.period]: this.newRecipes
                        }
                    )
            },
            onClickChild (value) {
                // console.log("single",this.userFavorites);  // someValue
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
            searchRecipes(searchStr){
                //on keyup, search array for name and ingredients
                //count number of chars in search,
                const regexp = new RegExp(searchStr, 'i');
                this.filteredRecipes = this.recipes.filter(x => regexp.test(x.recipeName));

            },
            addToFavorites(recipe){
                this.userFavorites = [];
                db.collection("users").where("userName", "==", this.userName)
                    .get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach((doc)=>{
                            let docId = doc.id;
                            if(doc.data().recipes) {//adds all favorites to array
                                for (let i = 0; i < doc.data().recipes.length; i++) {
                                    this.userFavorites.push(doc.data().recipes[i])
                                }
                            }
                            let flag = true;
                            for(let i = 0; i < this.userFavorites.length; i++){// looks for duplicates
                                if(recipe.recipeId === this.userFavorites[i]){
                                    flag = false;
                                }
                            }
                            if(flag){//Adds to recipe to favorites
                                this.filteredRecipes.push(recipe);
                                this.userFavorites.push(recipe.recipeId);
                                this.updateUserFavorites(docId);
                                this.filter();
                            }
                        })
                    })
            },
            updateUserFavorites(tempId){
                db.collection("users")
                    .doc(tempId)
                    .update({recipes: this.userFavorites});
            },
            removeFromFavorites(recipe){
                this.userFavorites.splice(this.userFavorites.indexOf(recipe.recipeId),1);
                db.collection("users")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) =>{
                            let docId = doc.id;
                            this.updateUserFavorites(docId);
                        });
                        this.filter();
                    })
            },
            filter(){
                let tempArray = [];
                if(this.owned) {
                    for (let j = 0; j < this.filteredRecipes.length; j++) {
                        for (let i = 0; i < this.userFavorites.length; i++) {
                            if (this.userFavorites[i] === this.filteredRecipes[j].recipeId) {
                                tempArray.push(this.filteredRecipes[j]);
                            }
                        }
                    }
                    this.filteredRecipes = tempArray;
                }
                else if(!this.owned){
                    this.searchRecipes(this.searchTerm)
                }
            },
        },

        mounted() {

        }
    }
</script>

<style scoped>
    .menuBackground{
        background-color: #EAE7DC;
        height: 500px;
    }
    .recipeSearchResults{
        background-color: #EAE7DC;
        height: 450px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .recipe-box{
        height: 450px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .content-box{
        height: 500px;
    }

label{
    color: #fcf8e3;
}
</style>
