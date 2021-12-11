<template>
    <div >
        <div class=" border-primary ">
            <div class="row">
                <div class=" col-sm-12" :id="DayOfWeek">
                    <div class="card card-body">
                        <div v-for="per in period" :key="per.period" class="cardTitle border border-dark">
                            <div class="">
                                <h5 class="menuBase">{{per}}:

<!--                                        <router-link class="m-0" style="font-size: .5em" :to="{name:'AddToPlan', params: { day: DayOfWeek, period: per }}" >-->
                                            <button class="btn fa-border">
                                                <font-awesome-icon icon="plus-circle" v-on:click="emitPer(per)" /><span class="textSize m-1">Add Recipe</span>
                                            </button>
<!--                                        </router-link>-->

                                </h5>
                                <hr>

                            </div>

                            <div v-for="(recipe) in Recipes" :key="recipe.Recipes">
                                <p v-if="DayOfWeek === recipe.day && recipe.mealPeriod === per" class="menu">
                                    <button class="btn fa-border " style="font-size: .8em" v-on:click="remove(recipe,per,userName)" >
                                        <font-awesome-icon icon="minus-circle" />
                                    </button><router-link class="mt-0 col-sm-5 day" :to="{name:'ViewRecipe', params: {recipe:recipe}}" > {{recipe.recipeName}}</router-link></p>
                            </div>

                            <hr>
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
            },
            userName: {
                type: String,
                default: ""
            },
        },
        data(){
            return{
                period: ["Breakfast","Lunch","Dinner"],
                newRecipes: [],
            }
        },

        methods:{
            emitPer(event){
                this.$emit('receivePeriod', {period:event, day:this.DayOfWeek});
            },
            remove(recipe, per, planId){
                console.log("Here:",recipe,per,planId);
                db.collection("MealPlans")
                    .onSnapshot((querySnapshot) =>{
                        querySnapshot.forEach((doc) =>{
                            if(doc.data().PlanId === planId ){
                                this.newRecipes = [];
                                let docId = doc.id;
                                this.newRecipes = doc.data()[this.DayOfWeek + per];
                                this.update(docId, per, recipe);
                            }
                        })
                    });
                this.$emit('receivePeriod', {});


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

        },
        mounted(){
            this.userName = this.$store.state.userName;
        }
    }
</script>

<style scoped>
.menu{
    background-color: #EAE7DC;
}
.textSize{
    font-size: small;
}
.menuBase{
    background-color: #8fc1e3;
    /*text-align: center;*/
}
.day{
    background-color: #EAE7DC;
    color: #000;
}
.cardTitle{
    background-color: #EAE7DC;
}
</style>
