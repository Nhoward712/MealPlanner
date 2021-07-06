<template>
    <div>
        <p>{{DayOfWeek}}</p>
        <p>{{breakfast}}</p>
    </div>
</template>

<script>
    export default {
        name: "MealPlanDayCard",
        props: {
            DayOfWeek:{
                type: String,
                default: null
            },
            MealPlan:{
                type: Object,
                default: NaN
            }
        },
        data(){
            return{
                LocalMealPlan: this.MealPlan,
                breakfast: this.MealPlan[0][this.DayOfWeek + 'Breakfast']
            }
        },
        created() {
            if (this.MealPlan) {
                this.LocalMealPlan = this.MealPlan;
                // let day = this.DayOfWeek + 'Breakfast';
                this.breakfast =  this.MealPlan[0][this.DayOfWeek + 'Breakfast']
            }
        }
    }
</script>

<style scoped>

</style>
