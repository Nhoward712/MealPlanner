import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import InventoryList from "./views/InventoryList";
import Recipes from "./views/Recipes";
import AddNewIngredient from "@/views/AddNewIngredient";
import AddNewRecipe from "@/views/AddNewRecipe";
import EditRecipe from "@/views/EditRecipe";
import WeeklyMealPlan from "@/views/WeeklyMealPlan";
import AddToPlan from "@/views/AddToPlan";

Vue.use(VueRouter);

const routes = [
    { path: "/", component: Home, name: "home" },
    { path: "/inventory", component: InventoryList, name: "InventoryList"},
    { path: "/recipes", component: Recipes, name: "Recipes"},
    { path: "/additem", component: AddNewIngredient, name: "AddNewIngredient"},
    { path: "/addRecipe", component: AddNewRecipe, name: "AddNewRecipe"},
    { path: "/editRecipe", component: EditRecipe, name: "EditRecipe", props: true},
    { path: "/WeeklyMealPlan", component: WeeklyMealPlan, name: "WeeklyMealPlan", props: true},
    { path: "/AddToPlan", component: AddToPlan, name: "AddToPlan", props: true},


    ];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;

