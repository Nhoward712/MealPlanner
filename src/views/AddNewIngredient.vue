<template>
    <div>
        <h1>Add New Item</h1>
        <div>
            <label for="ingredientName"  class="sr-only">Ingredient Name: </label><br>
            <input type="email" class="form-control" v-model="ingredientList.name" id="ingredientName" placeholder="Ingredient Name"><br>

            <label for="ingredientCost"  class="sr-only">Cost: </label><br>
            <input type="email" class="form-control" v-model="ingredientList.cost" id="ingredientCost" placeholder="$1.99">
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
