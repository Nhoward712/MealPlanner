<template>
    <div>
        <label for="recipeName"  class="sr-only">Recipe Name: </label><br>
        <input type="text" class="form-control col-sm-6" v-model="newRecipe.recipeName" id="recipeName" placeholder="Recipe Name" required><br>
        <label for="recipeDirections"  class="sr-only">Directions: </label>
        <input type="text" class="form-control col col-sm-6 h-75" v-model="newRecipe.recipeDirections" id="recipeDirections" placeholder="Directions"><br>
        <div class="card col-sm-6">
            <div class="row" v-for="(item, i) in ingredients" :key="item.name">
                <input type="submit" value="Remove" class="ml-1 mb-1" v-on:click="removeFromList(i)">
                <p class="ml-5 mb-1">{{item.amount}}</p>
                <p class="ml-1 mb-1">{{item.type}}</p>
                <p class="ml-1 mb-1">{{item.name}}</p>
            </div>
        </div>
        <br>
        <div class="row">
            <label for="amount" class="sr-only">Amount</label>
            <input type="text" class="form-control col-sm-1 ml-3" v-model="ingredient.amount" id="amount" placeholder="qty" required>
            <select class="form-select" aria-label="Default select example" v-model="ingredient.type" required>
                <option value="each">each</option>
                <option value="TSP">TSP</option>
                <option value="TBL">TBL</option>
                <option value="oz">oz</option>
                <option value="Cup">Cup</option>
                <option value="Pint">Pint</option>
                <option value="Quart">Quart</option>
                <option value="Gal">Gal</option>
                <option value="Lb">Lb</option>
            </select>
            <label for="name" class="sr-only">Ingredient Name</label>
            <input type="text" class="form-control col-sm-5" v-model="ingredient.name" id="name" placeholder="New ingredient Name" required>
            <input type="submit" class="mt-0 col-sm-1" value="Add" v-on:click="addToList"/>
        </div>
        <div>
            <input type="submit" class="mt-3" value="submit" v-on:click="AddToDB"/>
            <input type="submit" class="mt-3" value="cancel" v-on:click="cancelSubmit"/>
        </div>
    </div>
</template>

<script>
    import { db } from "../main";
    export default {
        name: "AddNewRecipe",
        data(){
            return{
                newRecipe: {},
                ingredients: [],
                ingredient: {},
                databaseIngredients: [],
                recipes: [],
            };
        },
        created() {


            db.collection("ingredientList")
                .onSnapshot((snapshotChange) => {
                this.databaseIngredients = [];
                snapshotChange.forEach((doc) => {
                    this.databaseIngredients.push({
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
            AddToDB(){
                db.collection("recipes")
                    .onSnapshot((snapshotChange) => {
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
                let highestId = 0;
                db
                    .collection("recipes")
                    .get()
                    //gets new ID Number
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            const thisRecipe = doc.data();
                            if (thisRecipe.recipeId >= highestId){
                                highestId = thisRecipe.recipeId + 1;
                            }
                        });
                    })
                    .then(()=>{
                        //adding items to object not included in model
                        this.newRecipe.recipeId = highestId;
                        let tempList =[];
                        for(let i=0; i<this.ingredients.length; i++){
                            tempList.push(this.ingredients[i])
                        }
                        this.newRecipe.recipeIngredients = tempList;

                        db.collection("recipes")
                            .add(this.newRecipe)
                            .then(() => {
                                this.$router.push("/recipes");
                            })
                            .catch((error) => {
                                console.log("got this error",error);
                            });
                    })
                    .catch();
            },
            addToList(){
                //input from dropdown of all ingredients
                //take name and match it to a ingredient Id
                let isTrue = false;
                for(let i=0; i<this.databaseIngredients.length; i++){
                    if(this.ingredient.name === this.databaseIngredients[i].name){
                        //create ingredient object
                        isTrue = true;
                        this.ingredient.ingredientId = this.databaseIngredients[i].ingredientId;
                        this.ingredient.name = this.databaseIngredients[i].name;
                    }
                    if(isTrue){
                        break;
                    }
                }
                if(!isTrue){
                    alert("Ingredient does not exist. Please add it to the database")
                }else{
                    //push entire object to ingredients
                    this.ingredients.push(this.ingredient);
                }
                //empty ingredient object
                this.ingredient = {};
            },
            cancelSubmit(){
                this.$router.push("/recipes");
            },
            removeFromList(i){
                this.ingredients.splice(i,1);
            },
        }
    }
</script>

<style scoped>

</style>
