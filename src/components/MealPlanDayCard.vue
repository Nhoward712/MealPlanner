<template>
    <div>
        <div class="card border-primary m-1 "  style="width: 12rem;">
            <h3 class="bg-secondary card-body">{{DayOfWeek}}</h3>
            <div v-for="per in period" :key="per.period">
                <div class="row">
                    <h5 class="mt-3 ml-3">{{per}}:</h5>
                    <router-link class="mt-2 col-sm-5 " style="font-size: .5em" :to="{name:'AddToPlan', params: { day: DayOfWeek, period: per }}" >
                        <button class="btn fa-border">
                            <font-awesome-icon icon="plus-circle" />

                        </button>
                    </router-link>
                </div>
                <div v-for="(recipe) in Recipes" :key="recipe.Recipes">
                    <p v-if="DayOfWeek === recipe.day && recipe.mealPeriod === per" class="ml-4">
                        <button class="btn fa-border" style="font-size: .8em" v-on:click="remove(recipe,per,1)" >
                            <font-awesome-icon icon="minus-circle" />
                        </button> {{recipe.recipeName}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { db } from "../main";
    export default {
        name: "MealPlanDayCard",
        props: {
            DayOfWeek:{
                type: String,
                default: null
            },

            Recipes:{
                type: Array,
                default: null

            }
        },
        data(){
            return{
                period: ["Breakfast","Lunch","Dinner"],
                newRecipes: [],
            }
        },
        methods:{
            remove(recipe, per, planId){
                db.collection("MealPlans")
                    .onSnapshot((querySnapshot) =>{
                        querySnapshot.forEach((doc) =>{
                            //this is for the default plan.  future will have to have dynamic planID num.
                            if(doc.data().PlanId === planId ){
                                this.newRecipes = [];
                                let docId = doc.id;
                                this.newRecipes = doc.data()[this.DayOfWeek + per];
                                this.update(docId, per, recipe);
                            }
                        })
                    })
            },
            update(tempId, per, recipe){
                console.log("here", this.newRecipes);

                for(let i=0; i<this.newRecipes.length; i++){
                    console.log("compare", recipe.recipeId,this.newRecipes[i]);
                        if(recipe.recipeId === this.newRecipes[i]){

                            this.newRecipes.splice(i,1);
                            console.log("after", this.newRecipes)

                        }
                    }
                db.collection("MealPlans")
                    .doc(tempId)
                    .update(
                        {
                            [this.DayOfWeek + per]: this.newRecipes
                        }
                    )
            }

        }
    }
</script>

<style scoped>

</style>
