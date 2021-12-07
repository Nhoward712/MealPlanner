<template>
    <div class="border bg-light m-2 row align-items-start mt-3">

        <div class="col-sm-2">
            <div class="mt-2" v-for="day in dayOfWeek" :key="day.dayOfWeek">
                <button class="btn btn-primary col-sm-10 mt-4" type="button" v-on:click="currentDay(day)" >{{day}}</button>
<!--                <MealPlanDayCard :DayOfWeek="day" :Recipes="recipes"></MealPlanDayCard>-->
            </div>
        </div>

        <div class="col-sm-5 border border-primary">
            <h3 class="">Meal Plan for: <b class="text-bold">{{userName}}</b> - {{activeDay}}</h3>
            <br>
            <MealPlanDayCard :DayOfWeek="activeDay" :Recipes="recipes"></MealPlanDayCard>
<!--            <div class="card card-body">-->
<!--                <div v-for="per in mealPeriod" :key="per.mealPeriod" class="cardTitle border border-dark">-->
<!--                    <div class="">-->
<!--                        <h5 class="menuBase">{{per}}:-->
<!--                            <router-link class="m-0" style="font-size: .5em" :to="{name:'AddToPlan', params: { day: dayOfWeek, period: per }}" >-->
<!--                                <button class="btn fa-border">-->
<!--                                    <font-awesome-icon icon="plus-circle" /><span class="textSize m-1">Add recipe</span>-->
<!--                                </button>-->
<!--                            </router-link>-->
<!--                        </h5><hr>-->

<!--                    </div>-->

<!--                    <div v-for="(recipe) in recipes" :key="recipe.recipes">-->
<!--                        <p v-if="activeDay === recipe.day && recipe.mealPeriod === per" class="menu">-->
<!--                            <button class="btn fa-border" style="font-size: .8em" v-on:click="remove(recipe,per,userName)" >-->
<!--                                <font-awesome-icon icon="minus-circle" />-->
<!--                            </button><router-link class="mt-0 col-sm-5" :to="{name:'ViewRecipe', params: {recipe:recipe}}" > {{recipe.recipeName}}</router-link></p>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
        </div>
        <div class="col-sm-4 border ms-sm-1">
            <p>Recipe search area</p>
        </div>

    </div>

</template>

<script>
    //bring in MealPlan object with specific ID
    //create array DayOfWeek with Monday-Sunday in it
    //Create component that accepts DayOfWeek and current mealPlan recipes object as a prop
    //v-for component looping through DayOfWeek
    //component loops through meal periods displaying recipes Names
    //********** planId under Created() needs to be a passed in prop.*************

    import MealPlanDayCard from "@/components/MealPlanDayCard";
    import { db } from "../main";

    export default {
        name: "WeeklyMealPlan",
        components: {MealPlanDayCard},
        props:{
            userName: {},
            UserRole: {},
        },
        data(){
            return {
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                mealPeriod: ["Breakfast", "Lunch", "Dinner"],
                activeMealPlan: {},
                recipes: [],
                activeDay: "Monday",

            };
        },
        mounted(){
            this.userRole = this.$route.params.userRole; //this pulls the param that was sent by the router
            this.userName = this.$store.state.userName;
            db.collection("MealPlans")
                .get()
                .then((querySnapshot)=>{
                    this.activeMealPlan = {};
                    querySnapshot.forEach((doc) => {
                        if(doc.data().PlanId == this.userName){
                            this.activeMealPlan ={
                                PlanId: doc.data().PlanId,
                                FridayBreakfast: doc.data().FridayBreakfast,
                                FridayDinner: doc.data().FridayDinner,
                                FridayLunch: doc.data().FridayLunch,
                                MondayBreakfast: doc.data().MondayBreakfast,
                                MondayDinner: doc.data().MondayDinner,
                                MondayLunch: doc.data().MondayLunch,
                                SaturdayBreakfast: doc.data().SaturdayBreakfast,
                                SaturdayDinner: doc.data().SaturdayDinner,
                                SaturdayLunch: doc.data().SaturdayLunch,
                                StartDate: doc.data().StartDate,
                                SundayBreakfast: doc.data().SundayBreakfast,
                                SundayDinner: doc.data().SundayDinner,
                                SundayLunch: doc.data().SundayLunch,
                                ThursdayBreakfast: doc.data().ThursdayBreakfast,
                                ThursdayDinner: doc.data().ThursdayDinner,
                                ThursdayLunch: doc.data().ThursdayLunch,
                                TuesdayBreakfast: doc.data().TuesdayBreakfast,
                                TuesdayDinner: doc.data().TuesdayDinner,
                                TuesdayLunch: doc.data().TuesdayLunch,
                                WednesdayBreakfast: doc.data().WednesdayBreakfast,
                                WednesdayDinner: doc.data().WednesdayDinner,
                                WednesdayLunch: doc.data().WednesdayLunch
                            }
                        }
                    })
                })
                .then(() => {
                db.collection("recipes")
                    .onSnapshot((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            //this loops though the days of the week
                            for (let i=0; i<this.dayOfWeek.length; i++){
                                //this loops though meal periods
                                for(let k=0; k<this.mealPeriod.length; k++){
                                    for(let j=0; j<this.activeMealPlan[this.dayOfWeek[i] + this.mealPeriod[k]].length; j++) {
                                        if (doc.data().recipeId === this.activeMealPlan[this.dayOfWeek[i] + this.mealPeriod[k]][j]) {

                                            this.recipes.push(
                                                {
                                                    day: this.dayOfWeek[i],
                                                    mealPeriod: this.mealPeriod[k],
                                                    recipeId: doc.data().recipeId,
                                                    recipeName: doc.data().recipeName,
                                                    recipeDirections: doc.data().recipeDirections,
                                                    recipeIngredients: doc.data().recipeIngredients,
                                                }
                                            );
                                            console.log("recipe",this.recipes)
                                        }
                                    }
                                }
                                //this loops though the active meal plans

                            }
                        });
                    });
                });

        },
        methods: {
            currentDay(day){
                this.activeDay = day;
            },
        }
    }
</script>

<style scoped>
.text-bold{
    text-emphasis: #0b2e13;
}
    .textSize{
        font-size: small;
    }

</style>
