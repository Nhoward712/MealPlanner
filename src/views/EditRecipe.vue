<template>
    <div class="mt-5 ml-3">
        <p class="font-weight-bold col-6">{{newRecipe.recipeName}}</p>
        <input type="submit" value="Save Changes" @click="saveRecipe"><br>
        <label for="recipeName"  class="">Recipe Name: </label><br>
        <input type="text" class="form-control col-sm-6" v-model="newRecipe.recipeName" id="recipeName" placeholder="Recipe Name" required><br>

        <ul class="list-group list-group-flush" v-for="(item,i) in thisRecipesIngredients" :key="item.thisRecipesIngredients">
            <div class="row">
                <input class="col-sm-5" v-model="item.name" @keyup.enter="rebuildRecipeIngredients(item.name,i)"/>
                <input class="mt-0 col-sm-1" type="submit"  value="Remove" v-on:click="removeFromList(i)"/>
            </div>

        </ul>

        <br>

        <div class="row">
            <label for="name" class="sr-only">Ingredient Name</label>
            <input type="text" class="form-control col-sm-5" v-model="ingredient.name" id="name" placeholder="New ingredient Name">
            <input type="submit" class="mt-0 col-sm-1" value="Add" v-on:click="addToList"/>
        </div>

        <label for="recipeDirections"  class="">Directions: </label><br>
        <textarea type="text" class="form-control col col-sm-6 h-75" v-model="newRecipe.recipeDirections" id="recipeDirections" rows="10" placeholder="Directions"></textarea><br>

    </div>
</template>

<script>
    import { db } from "../main";

    export default {
        name: "EditRecipe",
        components: {
            // ingredient,
        },
        props: {
            recipe: {
                type: Object,

            }
        },
        data() {
            return {
                newRecipe: this.recipe,
                databaseIngredients: [],
                databaseRecipes: [],
                ingredient: {},
                thisRecipesIngredients: [],
            }
        },
        created() {
            if (this.recipe) {
                this.newRecipe = this.recipe;

            }
            // pull in ingredient list to display current recipe ingredients then loads recipe ingredients into separate array
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
                });
                    this.getIngredientObjectById();
            });


        },
        mounted(){



        },
        methods:{
            saveRecipe(){
                this.newRecipe.recipeIngredients = this.convertToIngredientId(this.thisRecipesIngredients);
                //bring in all recipes, find its doc.id, match it with current recipe
                db.collection("recipes")
                    .onSnapshot(snapshot => {
                        this.ingredients = [];
                        snapshot.forEach((doc) => {
                            let tempId = doc.data().recipeId;
                            let docId = doc.id;
                            if(tempId === this.newRecipe.recipeId){
                                this.update(docId);
                            }
                        })
                    });
                this.$router.push("/recipes");
            },
            rebuildRecipeIngredients(name,Id){
                for(let i=0; i<this.databaseIngredients.length; i++){
                    if(this.databaseIngredients[i].name === name){
                        this.thisRecipesIngredients[Id].ingredientId = this.databaseIngredients[i].ingredientId;
                        this.thisRecipesIngredients[Id].name =this.databaseIngredients[i].name;
                            this.thisRecipesIngredients[Id].onHand =this.databaseIngredients[i].onHand;
                            this.thisRecipesIngredients[Id].purchased =this.databaseIngredients[i].purchased;
                            this.thisRecipesIngredients[Id].cost = this.databaseIngredients[i].cost;
                    }
                }
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
                    this.thisRecipesIngredients.push(this.ingredient);
                }
                //empty ingredient object
                this.ingredient = {};
            },
            removeFromList(i){
                this.thisRecipesIngredients.splice(i,1);
            },
            convertToIngredientId(ingredients){
                console.log("convert Id: ",ingredients[0].ingredientId);
                let temp = [];
                for(let i=0; i<ingredients.length; i++){
                    temp.push(ingredients[i].ingredientId);
                }
                console.log("temp array", temp);
                return temp
            },
            isIngredientInRecipe(recipeId,ingredientID){
                let recipeIngredients = this.newRecipe.recipeIngredients;

                let isTrue = false;
                for(let i = 0; i<recipeIngredients.length; i++){
                    if(recipeIngredients[i] === ingredientID){
                        isTrue=true;
                    }
                }
                return isTrue;
            },
            getIngredientObjectById(){
                //Pulls a list of all the ingredients in the recipe and adds it to a collection
                for(let i=0; i<this.newRecipe.recipeIngredients.length; i++){
                    //Need to get object by Id
                    for(let j=0; j<this.databaseIngredients.length; j++){
                        if(this.databaseIngredients[j].ingredientId === this.newRecipe.recipeIngredients[i]){
                            this.thisRecipesIngredients.push(this.databaseIngredients[j])
                        }
                    }
                }
            },
            update(tempId){
                db.collection("recipes")
                    .doc(tempId)
                    .update({
                        recipeName: this.newRecipe.recipeName,
                        recipeIngredients: this.newRecipe.recipeIngredients,
                        recipeDirections: this.newRecipe.recipeDirections
                    });
            },

        }
    }
</script>

<style scoped>

</style>
