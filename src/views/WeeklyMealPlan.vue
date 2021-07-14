<template>
    <div>
        <div class="row">
            <div class="row m-3" v-for="day in dayOfWeek" :key="day.dayOfWeek">
                <MealPlanDayCard :DayOfWeek="day" :Recipes="recipes"></MealPlanDayCard>
            </div>
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
        data(){
            return {
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                mealPeriod: ["Breakfast", "Lunch", "Dinner"],
                activeMealPlan: {},
                recipes: [],

            };
        },
        mounted(){
            db.collection("MealPlans")
                .get()
                .then((querySnapshot)=>{
                    this.activeMealPlan = {};
                    querySnapshot.forEach((doc) => {
                        if(doc.data().PlanId === 1){
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
                                        }
                                    }
                                }
                                //this loops though the active meal plans

                            }
                        });
                    });
                });


        }
    }
</script>

<style scoped>

</style>
