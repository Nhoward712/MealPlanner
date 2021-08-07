<template>
    <div>

        <h3>{{day}} - {{period}}</h3><br>
<!--            <input type="button"-->
            <div v-for="recipe in recipes" :key="recipe.recipes" class="row ml-5">
                <input
                        type="submit"
                        id=recipe.recipeId
                        :name=recipe.recipeId
                        :value=recipe.recipeName
                        class="mt-1 text-wrap"
                        v-on:click="saveItems(1,recipe)"
                        style="width: 200px">

            </div>
    </div>
</template>

<script>
    import { db } from "../main";

    //Display list of recipes
    //have user checkmark items to be added
    //Add items to meal Plan
    //return to meal plan page
    export default {
        name: "AddToPlan",
        props:{
            day:{
                type: String
            },
            period:{
                type: String
            }
        },
        data(){
            return{
                recipes: [],
                newRecipes: [],
            }
        },
        methods:{
            saveItems(planId, recipe){
                console.log("here", planId, recipe);
                db.collection("MealPlans")
                    .get()
                    .then((querySnapshot) =>{
                        querySnapshot.forEach((doc) =>{
                            //this is for the default plan.  future will have to have dynamic planID num.
                            if(doc.data().PlanId === planId ){
                                let docId = doc.id;
                                this.newRecipes = doc.data()[this.day + this.period];
                                this.newRecipes.push(recipe.recipeId);
                                this.update(docId);
                                console.log(this.newRecipes);
                            }
                        })
                    })
                    .then(() =>{
                        this.$router.push("/WeeklyMealPlan");
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
            }
        },
        created() {
            db.collection("recipes")
                .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach((doc) =>{
                        this.recipes.push(
                            {
                                recipeId: doc.data().recipeId,
                                recipeName: doc.data().recipeName,
                                recipeDirections: doc.data().recipeDirections,
                                recipeIngredients: doc.data().recipeIngredients,
                            }
                        )
                    })
                })
        }
    }
</script>

<style scoped>
input {
    border-radius: 15px;
}
input:hover{
    background-color: #7abaff;
}
</style>
