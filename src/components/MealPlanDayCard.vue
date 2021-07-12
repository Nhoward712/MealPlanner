<template>
    <div>
        <h3 class="bg-secondary">{{DayOfWeek}}</h3>
        <div v-for="per in period" :key="per.period">
            <h5 class="mt-3 ml-2">{{per}}:</h5>
            <div v-for="recipe in Recipes" :key="recipe.Recipes">
                <p v-if="DayOfWeek === recipe.day && recipe.mealPeriod === per" class="ml-4"> <button class="bg-warning">Remove</button> {{recipe.recipeName}}</p>
            </div>
            <button class="bg-success">Add Item</button>
        </div>

    </div>
</template>

<script>
    // import { db } from "../main";
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
            }
        },
    }
</script>

<style scoped>

</style>
