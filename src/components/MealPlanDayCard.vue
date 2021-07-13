<template>
    <div>
        <h3 class="bg-secondary">{{DayOfWeek}}</h3>
        <div v-for="per in period" :key="per.period">
            <h5 class="mt-3 ml-2">{{per}}:</h5>
            <div v-for="recipe in Recipes" :key="recipe.Recipes">
                <p v-if="DayOfWeek === recipe.day && recipe.mealPeriod === per" class="ml-4"> <button class="bg-warning">Remove</button> {{recipe.recipeName}}</p>
            </div>
            <router-link class="mt-0 col-sm-5" :to="{name:'AddToPlan', params: { day: DayOfWeek, period: per }}" ><button>Add Recipe</button></router-link>


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
        methods:{
            addToPlan(Day,Period){
                this.$router.push({name: '/AddToPlan', params: { day: Day, period: Period }})
            }
        }
    }
</script>

<style scoped>

</style>
