<template>
    <div >
        <div class=" border-primary mt-2">
            <div class="row">
                <p>
                    <button class="btn btn-primary col-sm-10" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + DayOfWeek" aria-expanded="false" :aria-controls="DayOfWeek">
                        {{DayOfWeek}}
<!--                        Look at scrollSpy for moving to the correct spot on the page whe button is pressed-->
                    </button>
                </p>
                <div class="collapse" :id="DayOfWeek">
                    <div class="card card-body">
                        <div v-for="per in period" :key="per.period" class="cardTitle border border-dark">
                            <div class="">
                                <h5 class="menuBase">{{per}}:</h5><hr>
                                <router-link class="" style="font-size: .5em" :to="{name:'AddToPlan', params: { day: DayOfWeek, period: per }}" >
                                    <button class="btn fa-border">
                                        <font-awesome-icon icon="plus-circle" />
                                    </button>
                                </router-link>
                            </div>

                            <div v-for="(recipe) in Recipes" :key="recipe.Recipes">
                                <p v-if="DayOfWeek === recipe.day && recipe.mealPeriod === per" class="menu">
                                    <button class="btn fa-border" style="font-size: .8em" v-on:click="remove(recipe,per,1)" >
                                        <font-awesome-icon icon="minus-circle" />
                                    </button><router-link class="mt-0 col-sm-5" :to="{name:'ViewRecipe', params: {recipe:recipe}}" > {{recipe.recipeName}}</router-link></p>
                            </div>
                        </div>
                    </div>
                </div>
<!--                <h4 class="day col-12" >{{DayOfWeek}}</h4>-->

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
                    });

            },
            update(tempId, per, recipe){
                for(let i=0; i<this.newRecipes.length; i++){
                        if(recipe.recipeId === this.newRecipes[i]){
                            this.newRecipes.splice(i,1);
                        }
                    }
                for(let i=0; i<this.Recipes.length; i++){
                    if(recipe.recipeId === this.Recipes[i].recipeId){
                        this.Recipes.splice(i,1);
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
.menu{
    background-color: #d1ecf1;
}

.menuBase{
    background-color: #fff3cd;
    /*text-align: center;*/
}
.day{
    background-color: #fc4a1a;
}
.cardTitle{
    background-color: #fff3cd;
}
</style>
