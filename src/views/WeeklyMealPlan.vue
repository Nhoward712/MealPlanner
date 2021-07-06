<template>
    <div>
        <div v-for="day in dayOfWeek" :key="day.dayOfWeek">
            <MealPlanDayCard :DayOfWeek="day" :MealPlan="activeMealPlan"></MealPlanDayCard>
        </div>
    </div>

</template>

<script>
    //bring in MealPlan object with specific ID
    //create array DayOfWeek with Monday-Sunday in it
    //Create component that accepts DayOfWeek and current mealPlan object as a prop
    //v-for component looping through DayOfWeek
    //component loops through meal periods displaying recipes Names

    import MealPlanDayCard from "@/components/MealPlanDayCard";
    import { db } from "../main";
    export default {
        name: "WeeklyMealPlan",
        components: {MealPlanDayCard},
        data(){
            return {
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                activeMealPlan: [],

            };
        },
        created(){
            db.collection("MealPlans")
                .onSnapshot((snapshotChange) => {
                this.activeMealPlan = [];
                snapshotChange.forEach((doc) => {
                    if(doc.data().PlanId ===1){
                        this.activeMealPlan.push({
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
                        );
                    }

                });
            });


        }
    }
</script>

<style scoped>

</style>
