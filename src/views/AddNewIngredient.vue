<template>
    <div>
        <h1>Add New Item</h1>
        <div>
            <label for="ingredientName"  class="sr-only">Ingredient Name: </label><br>
            <input type="text" class="form-control" v-model="ingredientList.name" id="ingredientName" placeholder="Ingredient Name"><br>

            <div class="col-sm-6">
                <label for="categories">Choose a Category:</label>

                <select name="categories" id="categories" v-model="selected">
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

                </select>
            </div>
            <div>
                <input type="submit" class="mt-3" value="submit" v-on:click="AddToJSON"/>
                <input type="submit" class="mt-3" value="cancel" v-on:click="cancelSubmit">
            </div>
        </div>


    </div>
</template>

<script>
    // import data from "../ingredients.json"
    import {db} from "../main";

    export default {

        name: "AddNewIngredient",
        data(){
            return{
                ingredientList: {},
                selected: ''

            };
        },

        methods:{
            AddToJSON(){
                // e.preventDefault();
                let highestId = 0;

                db
                    .collection("ingredientList")
                    .get()
                    //gets new ID Number
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            const thisIngredient = doc.data();
                            console.log("before",highestId,thisIngredient.ingredientId);
                            if (thisIngredient.ingredientId >= highestId){
                                highestId = thisIngredient.ingredientId + 1;
                            }
                            console.log("after",highestId,thisIngredient.ingredientId);
                        });
                    })
                    .then(()=>{
                        //adding items to object not included in model
                        this.ingredientList.name = this.ingredientList.name.toUpperCase();
                        this.ingredientList.category = this.selected;
                        this.ingredientList.ingredientId = highestId;
                        this.ingredientList.onHand = 5;
                        this.ingredientList.purchased = 5;

                        db.collection("ingredientList")
                            .add(this.ingredientList)
                            .then(() => {
                                this.$router.push("/inventory");
                            })
                            .catch((error) => {
                                console.log("got this error",error);
                            });
                    })
                    .catch();
            },
            cancelSubmit(){
                this.$router.push("/inventory");
            }
        }
    }
</script>

<style scoped>

</style>
