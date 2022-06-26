<template>
    <div class="m-2 container-fluid">
        <div class="-header row">
            <h3>Author: {{userName}}</h3>
            <div v-if="true">
                <!--Submit/cancel-->
                <div>
                    <input type="submit" class="m-1" value="submit" v-on:click="AddToDB"/>
                    <input type="submit" class="m-1" value="cancel" v-on:click="cancelSubmit"/>
                </div>
                <!--@here, add logic if(!pictureExists){Image is addPicture Btn - else Shows picture}-->
                <img src="https://firebasestorage.googleapis.com/v0/b/mealplanner-60292.appspot.com/o/8EBF5C5C-D186-42B8-BB24-5CE887B63B1A_1_105_c.jpeg?alt=media&token=e380d4eb-1717-4816-812b-0a84a8799380">
            </div>

            <form @submit.prevent="addImage">
                <label for="addImage" class="btn">Add Image</label>
                <input type="file" v-on:change="addImage($event)" id="addImage" class="mt-3 btn btn-primary">
            </form>

        </div>

        <label for="recipeName"  class="sr-only">Recipe Name: </label><br>
        <input type="text" class="form-control col-sm-6" v-model="newRecipe.recipeName" id="recipeName" placeholder="Recipe Name" required><br>
        <h4>Add Ingredient</h4>
        <hr class="col-sm-6">
<!--ingredients-->
        <div class="card col-sm-6">
            <div class="row" v-for="(item, i) in ingredients" :key="item.name">
                <p class="ml-5 mb-1 col-sm-1">{{item.amount}}</p>
                <p class="ml-1 mb-1 col-sm-1">{{item.type}}</p>
                <p class="ml-1 mb-1 col-sm-8">{{item.name}}</p>
                <input type="submit" value="Remove" class="ml-1 mb-1 col-sm-2" v-on:click="removeFromList(i)">
            </div>
        </div>
<!--new ingredient-->
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

<!--Directions-->
        <label for="recipeDirections"  class="sr-only">Directions: </label>
        <textarea type="text" class="form-control col col-sm-6 " v-model="newRecipe.recipeDirections" id="recipeDirections" placeholder="Directions"></textarea>
        <br>


        <br>

    </div>
</template>

<script>
    import { db } from "../main";
    import firebase from "firebase";

    export default {
        name: "AddNewRecipe",
        props:{
            userName: {},
            UserRole: {},
        },
        data(){
            return{
                newRecipe: {},
                ingredients: [],
                ingredient: {},
                databaseIngredients: [],
                recipes: [],
                ingredientList: {},
                image: {},

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
                //this section gets the highest recipe id in the database
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
                        this.newRecipe.recipeOwner = this.userName;

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
                    if(this.ingredient.name.toUpperCase() === this.databaseIngredients[i].name.toUpperCase()){
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
                    // alert("Ingredient does not exist. Please add it to the database");
                    this.ingredientList.name = this.ingredient.name.toUpperCase();
                    console.log("adding ingredient", this.ingredientList);
                    let highestId = 0;
                    db
                        .collection("ingredientList")
                        .get()
                        //gets new ID Number
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                const thisIngredient = doc.data();
                                if (thisIngredient.ingredientId >= highestId){
                                    highestId = thisIngredient.ingredientId + 1;
                                }
                            });
                        })
                        .then(()=>{
                            //adding items to object not included in model
                            this.ingredientList.ingredientId = highestId;
                            this.ingredientList.onHand = 5;
                            this.ingredientList.purchased = 5;
                            this.ingredientList.cost = 0;

                            db.collection("ingredientList")
                                .add(this.ingredientList)
                                .then(() => {
                                    let isTrue = false;
                                    for(let i=0; i<this.databaseIngredients.length; i++){
                                        if(this.ingredient.name.toUpperCase() === this.databaseIngredients[i].name.toUpperCase()){
                                            //create ingredient object
                                            isTrue = true;
                                            this.ingredient.ingredientId = this.databaseIngredients[i].ingredientId;
                                            this.ingredient.name = this.databaseIngredients[i].name;
                                        }
                                        if(isTrue){
                                            break;
                                        }
                                    }
                                })
                                .catch((error) => {
                                    console.log("got this error",error);
                                });
                        });
                    this.ingredients.push(this.ingredient);
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
            addImage(evt){
                evt.preventDefault();
                //add image to storage
                const file = evt.target.files[0];
                const storageRef = firebase.storage().ref();
                const imgRef = storageRef.child(file.name);
                // Upload the file to storage
                const task = imgRef.put(file);
                task
                    .then(() => {
                        imgRef.getDownloadURL()
                        //update image.imageURL
                        .then((url) => {
                            this.image.imageURL = url;
                            this.image.imageUser = this.userName;
                            this.newRecipe.image = this.image;
                            // console.log("added this file: ", file," at:", url);
                            alert("image added to storage!");
                            console.log("This Was Added to storage", this.image)
                        })
                    })
                    .catch(error => alert("Image did not upload: " + error))
            },
        },
        mounted(){
            this.userRole = this.$route.params.userRole; //this pulls the param that was sent by the router
            this.userName = this.$route.params.userName; //this pulls the param that was sent by the router
        }
    }
</script>

<style scoped>

</style>
