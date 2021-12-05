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
                        v-on:click="saveItems(userName,recipe)"
                        style="width: 200px"><!--First parameter of saveItems is planID.  needs to be dynamic later-->

            </div>
        <router-link :to="{name:'AddNewRecipe'}"><button class="btn btn-info m-5">Create New Recipe</button></router-link>
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
                userName: "",
            }
        },
        methods:{
            saveItems(planId, recipe){
                db.collection("MealPlans")
                    .get()
                    .then((querySnapshot) =>{
                        querySnapshot.forEach((doc) =>{
                            //this is for the default plan.  future will have to have dynamic planID num.
                            //need option for no planId
                            //dynamic plan needs to have params: userName passed in
                            //Need to pass it back to meal plan view on complete

                            if(doc.data().PlanId === planId){
                                let docId = doc.id;
                                console.log("added",doc.data()[this.day + this.period]);
                                //loads the current recipes for that mealperiod
                                this.newRecipes = doc.data()[this.day + this.period];
                                console.log("newRecipes", this.newRecipes, "recipes", this.recipes);
                                console.log("recipe id",recipe.recipeId);
                                this.newRecipes.push(recipe.recipeId);
                                this.update(docId);
                            }

                        })
                    })
                    .then(() =>{
                        this.$router.push("/WeeklyMealPlan");
                    })
            },
            update(docId){
                db.collection("MealPlans")
                    .doc(docId)
                    .update(
                        {
                            [this.day + this.period]: this.newRecipes
                        }
                    )
            },

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
                });
            this.userName = this.$store.state.userName;

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
