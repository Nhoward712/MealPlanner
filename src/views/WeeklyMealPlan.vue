<template>
    <div class=" bg-light m-2 row align-items-start mt-3">
<!--Day of week buttons-->
        <div class="col-sm-2 border border-3 meal-plan-box container-fluid ms-1 m-0">
            <div class="mt-0" v-for="day in dayOfWeek" :key="day.dayOfWeek">
                <button class="btn btn-info col-sm-10 mt-4" type="button" v-on:click="currentDay(day)" >{{day}}</button>
<!--                <MealPlanDayCard :DayOfWeek="day" :Recipes="recipes"></MealPlanDayCard>-->
            </div>
        </div>
<!--meal plan -->
        <div class="col-sm-5 meal-plan-box border border-3 ms-0">
            <br>
            <h3 class="ms-5">Meal Plan for: <b class="text-bold">{{userName}}</b> - {{activeDay}}</h3>

            <div class="mealPlanCard overflow-scroll border">
                <MealPlanDayCard v-on:receivePeriod="emitPer($event)" :DayOfWeek="activeDay" :Recipes="recipes"></MealPlanDayCard>
            </div>
        </div>
<!--recipe Search-->
        <div class="col-sm-4 recipe-search-box border border-3 ms-sm-1">
            <div class="m-3">
                <label for="recipeSearch" id="recipeSearchbar" ></label>
                <input class="mb-2"  type="search" id="recipeSearch" v-model="searchTerm" style="height: 1.5em" v-on:keyup="searchRecipes(searchTerm)" placeholder="Search Recipes">
            </div>

            <div class="col-12 recipeSearchResults border me-2 overflow-scroll">
                <div v-for="item in filteredRecipes" :key="item.filteredRecipes">
                    <recipeCard  v-on:btnClicked="onClickChild($event)" :recipe="item"></recipeCard>
                </div>
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
    import recipeCard from "@/components/RecipeCardItem";

    import { db } from "../main";

    export default {
        name: "WeeklyMealPlan",
        components: {
            MealPlanDayCard,
            recipeCard
        },
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
                allRecipes: [],
                filteredRecipes: [],
                searchTerm: "",
                day: "",
                per: "",
                newRecipes: [],
            };
        },
        mounted(){
            this.userRole = this.$route.params.userRole; //this pulls the param that was sent by the router
            this.userName = this.$store.state.userName;
            this.loadData();
        },
        methods: {
            loadData(){
                console.log("loadData");
                db.collection("MealPlans")
                    .get()
                    .then((querySnapshot)=>{
                        this.activeMealPlan = {};
                        this.recipes = [];
                        querySnapshot.forEach((doc) => {
                            if(doc.data().PlanId === this.userName){
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
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    this.allRecipes.push(
                                        {
                                            recipeId: doc.data().recipeId,
                                            recipeName: doc.data().recipeName,
                                            recipeDirections: doc.data().recipeDirections,
                                            recipeIngredients: doc.data().recipeIngredients,
                                            recipeOwner: doc.data().recipeOwner,
                                            image: doc.data().image
                                        }
                                    );
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
                                                            image: doc.data().image
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
                this.filteredRecipes = this.allRecipes;
            },
            currentDay(day){
                this.activeDay = day;
            },
            searchRecipes(searchStr){
                //on keyup, search array for name and ingredients after 2 chars have been entered
                //count number of chars in search,
                console.log("searching...");

                if(searchStr.length > 1){
                    console.log("searching...");
                    const regexp = new RegExp(searchStr, 'i');
                    this.filteredRecipes = this.allRecipes.filter(x => regexp.test(x.recipeName));
                    console.log(searchStr);
                    console.log(this.filteredRecipes);
                }else{
                    this.filteredRecipes = this.allRecipes;
                }


            },
            onClickChild(value){
                //when user clicks the recipe item, it should filter the recipes to just that item.
                //adds that item to a temp item that will be used when user clicks add button on the meal plan
                this.filteredRecipes = [];
                this.filteredRecipes.push(value);
            },
            emitPer(per){
                //if filtered array.length = 1 add filtered recipe to meal period/day
                //tooltip to explain why they cant click add button
                if(this.filteredRecipes.length === 1){
                    db.collection("MealPlans")
                        .get()
                        .then((querySnapshot) =>{
                            querySnapshot.forEach((doc) =>{
                                //dynamic plan needs to have params: userName passed in
                                //Need to pass it back to meal plan view on complete

                                if(doc.data().PlanId === this.userName){
                                    let docId = doc.id;
                                    this.day = per.day;
                                    this.period = per.period;
                                    console.log("added",doc.data()[per.day + per.period]);
                                    //loads the current recipes for that mealPeriod
                                    this.newRecipes = doc.data()[per.day + per.period];
                                    console.log("newRecipes", this.newRecipes, "recipes", this.recipes);
                                    console.log("recipe id",this.filteredRecipes[0].recipeId);
                                    //Adds new recipe to current mealPeriod
                                    this.newRecipes.push(this.filteredRecipes[0].recipeId);
                                    this.update(docId);
                                }

                            })
                        })
                        .then(() =>{
                            this.loadData()
                        })
                }else{
                    setTimeout(() => { console.log("World!"); }, 500);
                    this.loadData();
                }
                console.log("after emit");


            },
            update(docId){
                db.collection("MealPlans")
                    .doc(docId)
                    .update(
                        {
                            [this.day + this.period]: this.newRecipes
                        }
                    );
                this.filteredRecipes = [];

            },
        }
    }
</script>

<style scoped>
.text-bold{
    text-emphasis: #0b2e13;
}
.mealPlanCard {
    height: 400px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.meal-plan-box{
    height: 500px;
}
.recipeSearchResults{
    background-color: #EAE7DC;
    height: 400px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.recipe-search-box{
    height: 500px;
}
button{
    background-color: #D8C3A5;
    color: #E85A4F;
    font-weight: bold;
    font-size: 1.2em;
    box-shadow: 4px 4px 4px 2px grey;
}


</style>
