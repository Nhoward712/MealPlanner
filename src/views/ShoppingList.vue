<template>

    <div class="container-fluid">
        <div class="bg-dark">
            <h1 class="ms-5 mt-3  text-primary">Shopping List </h1>
        </div>
        <div class="container row">
            <div class="border border-primary overflow-scroll scrollable m-1 col-sm-12 col-md-5">
                <div class="ml-auto row" v-for="(item) in activeIngredients" :key="item.activeIngredients">
                    <input class="h1 m-3 col-1" type="checkbox" value="" :id="item.name">
                    <label class="h1 pt-3 col-9" :for="item.name"> {{item.name}}</label>
                </div>
            </div>
            <div class="col-sm-12 col-md-5">
                <div class="border border-primary overflow-scroll scrollable m-1">
                    <h1 class="ms-5 mt-3 text-decoration-underline">Extra Items List </h1>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import { db } from "../main";
    import { il } from "../main";

    //get meal plan recipes
    //ret ingredients from recipes
    //remove duplicates
    //***** Change checkbox to a button and onClick move it to a new array of inCart items ********

    export default {
        name: "ShoppingList",
        components:{

        },
        props:{
            userName: {},
            UserRole: {}
        },
        data(){
            return {
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                mealPeriod: ["Breakfast", "Lunch", "Dinner"],
                activeRecipes: [],
                activeIngredients: [],
                activeMealPlan: {},
                allIngredients: [],
                allRecipes: [],
                il: []

            }
        },
        created(){
            this.userRole = this.$route.params.userRole; //this pulls the param that was sent by the router
            this.userName = this.$route.params.userName; //this pulls the param that was sent by the router
            this.il = il;
            db.collection("ingredientList")
                .onSnapshot((snapshotChange) => {
                    this.allIngredients = [];
                    snapshotChange.forEach((doc) => {
                        this.allIngredients.push({
                                ingredientId: doc.data().ingredientId,
                                name: doc.data().name,
                                onHand: doc.data().onHand,
                                purchased: doc.data().purchased,
                                cost: doc.data().cost,
                            }
                        );
                    });
                    // this.getIngredientObjectById();
                });
            db.collection("recipes")
                .onSnapshot((snapshotChange) => {
                    this.allRecipes = [];
                    snapshotChange.forEach((doc) => {
                        this.allRecipes.push({
                                recipeId: doc.data().recipeId,
                                recipeIngredients: doc.data().recipeIngredients,
                            }
                        );
                    });
                    // this.getIngredientObjectById();
                });

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
                .then(()=>{
                    this.getAllRecipes();
                    this.getAllIngredients();
                });




        },

        methods:{
            getAllRecipes(){
                for (let i=0; i<this.dayOfWeek.length; i++){
                    //this loops though meal periods
                    for(let k=0; k<this.mealPeriod.length; k++){
                        for(let j=0; j<this.activeMealPlan[this.dayOfWeek[i] + this.mealPeriod[k]].length; j++) {
                            // if (doc.data().recipeId === this.activeMealPlan[this.dayOfWeek[i] + this.mealPeriod[k]][j]) {
                            // console.log("console.log",this.activeMealPlan.FridayBreakfast);
                                this.activeRecipes.push(this.activeMealPlan[this.dayOfWeek[i] + this.mealPeriod[k]][j]);
                            // }
                        }
                    }
                    //this loops though the active meal plans

                }
                // console.log("Active Recipes", this.activeRecipes)

            },
            getAllIngredients(){
                // var tempRecipes = [];//array of recipe ingredient objects
                var tempIng = [];
                for(let i=0; i< this.activeRecipes.length; i++){
                    for(let j=0; j<this.allRecipes.length; j++){
                        if(this.activeRecipes[i] === this.allRecipes[j].recipeId){
                            for (let k=0; k<this.allRecipes[j].recipeIngredients.length; k++){
                                tempIng.push({name: this.allRecipes[j].recipeIngredients[k].name,
                                category: this.allRecipes[j].recipeIngredients[k].category})

                            }
                        }
                    }
                }
                this.activeIngredients = this.getArray(tempIng, 'name');
                this.activeIngredients.sort(function(a, b) {
                    var nameA = a.category; // ignore upper and lowercase
                    var nameB = b.category; // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });
                // this.activeIngredients = [... new Set(tempIng)];
                // this.activeIngredients.sort();
            },
            getArray(array, key) {
                var check = new Set();
                return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
            },
        },
        mounted(){

        }
    }
</script>

<style scoped>
    input[type="checkbox"] {
        transform:scale(2, 2);
    }
    .scrollable{
        height: 500px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-color: #EAE7DC;

    }
</style>
