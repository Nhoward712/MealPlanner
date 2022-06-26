<template>
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ingredientModalLabel">Edit Ingredients</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="list-group list-group-flush" v-for="(item,i) in recipe.recipeIngredients" :key="item.thisRecipesIngredients">
                        <div class="row">
                            <input class="col-2 col-md-1" v-model="item.amount" @keyup.enter="rebuildRecipeIngredients(item.name,i)"/>
                            <input class="col-2" v-model="item.type" @keyup.enter="rebuildRecipeIngredients(item.name,i)"/>
                            <input class="col-5 col-md-8" v-model="item.name" @keyup.enter="rebuildRecipeIngredients(item.name,i)"/>
                            <input class="mt-0 col-3 col-md-1" type="submit" style="font-size: .75em; background-color: lightsalmon" value="Remove" v-on:click="removeFromList(i)"/>
                        </div>
                    </ul>
       <div class="row m-1">
            <label for="amount" class="sr-only">Amount</label>
            <input type="text" class="form-control col-sm-1 pl-1" v-model="ingredient.amount" id="amount" placeholder="qty" required>
            <select class="form-select col-sm-1" aria-label="Default select example" v-model="ingredient.type" required>
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
            <input type="text" class="form-control col-sm-4" v-model="ingredient.name" id="name" placeholder="New ingredient Name" required>
            <input type="submit" class="mt-0 col-sm-1" value="Add" v-on:click="addToList"/>
        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="saveChanges" data-bs-dismiss="modal" >Save changes</button>
                </div>
            </div>
        </div>
</template>

<script>
    import { db } from "../main";
    // import firebase from "firebase";
    export default {
        name: "AddEditIngredientModal",
        props: {
            recipe: {
                type: Object,
            },
        },
        data() {
            return {
                newRecipe: this.recipe,
                databaseIngredients: [],
                databaseRecipes: [],
                ingredient: {},
                thisRecipesIngredients: [],
                image: {},
                userName: "",
            }
        },
        created() {
            //if this recipe exists, then use this recipe. Else start new recipe
            if (this.recipe) {
                this.newRecipe = this.recipe;
            }
            this.userName = this.$store.state.userName;
            this.GetIngredientList();

        },
        methods:{
            saveChanges(){
                // this.newRecipe.recipeIngredients = this.convertToIngredientId(this.thisRecipesIngredients);
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
            // pull in ingredient list to display current recipe ingredients then loads recipe ingredients into separate array
            GetIngredientList(){
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
            removeFromList(i){
                this.thisRecipesIngredients.splice(i,1);
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
            update(tempId){
                console.log("Ingredients",this.newRecipe.recipeName);

                db.collection("recipes")
                    .doc(tempId)
                    .update({
                        recipeIngredients: this.newRecipe.recipeIngredients,
                    });
            },
            getIngredientObjectById(){
                //Pulls a list of all the ingredients in the recipe and adds it to a collection
                for(let i=0; i<this.newRecipe.recipeIngredients.length; i++){
                    //Need to get object by Id
                    for(let j=0; j<this.databaseIngredients.length; j++){
                        if(this.databaseIngredients[j].ingredientId === this.newRecipe.recipeIngredients[i].ingredientId){
                            this.thisRecipesIngredients.push(this.databaseIngredients[j])
                        }
                    }
                }
            },

        },





    }
</script>

<style scoped>

</style>
