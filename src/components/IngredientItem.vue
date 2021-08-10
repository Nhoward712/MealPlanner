<template>
    <div class="row mb-0 border border-bottom col-sm-4">
<!--        <button v-if="show" type="button" class="btn  mt-0 ml-0" value="Delete" @click="deleteItem(ingredient.ingredientId)">-->
<!--            <font-awesome-icon icon="minus-circle" />-->
<!--        </button>-->
        <p v-if="ingredient.amount" class="ml-0 col-sm-1">{{ingredient.amount}}</p>
        <p v-if="ingredient.type" class="ml-1 col-sm-3">{{ingredient.type}}</p>
        <p class="ml-0 mt-2 col-sm-6">{{ingredient.name}} </p>
        <div class="col-sm-6">
            <label for="categories">Choose a Category:</label>

            <select name="categories" id="categories" v-model="ingredient.category" v-on:change="saveIngredient(ingredient.ingredientId)">
                <option v-if="ingredient.category" :value="ingredient.category">{{ingredient.category}}</option>
                <option value="Meats/Seafood">Meats/Seafood</option>
                <option value="Produce">Produce</option>
                <option value="Dairy">Dairy</option>
                <option value="Oils/Condiments">Oils/Condiments</option>
                <option value="Spices">Spices</option>
                <option value="Baking">Baking</option>
                <option value="Bakery">Bakery</option>
                <option value="BreakfastNCereal">Breakfast & Cereal</option>
                <option value="Deli">Deli</option>
                <option value="Cheese">Cheese</option>
                <option value="Frozen">Frozen</option>
                <option value="PastaNGrains">Pasta & Grains</option>
                <option value="Canned">Canned</option>
                <option value="Other">Other</option>

            </select>
        </div>

    </div>
</template>

<script>
    import { db } from "../main";

    export default {
        name: "ingredient",
        props:{
            ingredient: {
                type: Object,
                default: NaN
            },
            show: {
                type: Boolean,
                default: true,
            }
        },
        data(){
            return{
                selected:''
            }
        },
        methods:{
            deleteItem(tempId){
                // var tempId = prompt ("What is the id of the image you want to delete");
                let fullId ="";
                db.collection("ingredientList")
                    .get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach(doc =>{
                            const id = doc.data();
                            if(tempId === id.ingredientId){
                                fullId = doc.id;

                            }
                        })
                    })
                    .then(() =>{
                        db.collection("ingredientList")
                            .doc(fullId)
                            .delete()
                            .catch(error => console.log(error))
                    })

            },
            saveIngredient(){
                // this.newRecipe.recipeIngredients = this.convertToIngredientId(this.thisRecipesIngredients);
                //bring in all recipes, find its doc.id, match it with current recipe
                db.collection("ingredientList")
                    .onSnapshot(snapshot => {
                        // this.ingredients = [];
                        snapshot.forEach((doc) => {
                            let tempId = doc.data().ingredientId;
                            let docId = doc.id;
                            if(tempId === this.ingredient.ingredientId){
                                this.update(docId);
                            }
                        })
                    });
            },
            update(docId){
                console.log("inside method", this.ingredient.category);
                db.collection("ingredientList")
                    .doc(docId)
                    .update({
                        category: this.ingredient.category
                    });
            },


        }
    }

</script>

<style scoped>




</style>
