import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import InventoryList from "./views/InventoryList";
import Recipes from "./views/Recipes";
import AddNewIngredient from "@/views/AddNewIngredient";

Vue.use(VueRouter);

const routes = [
    { path: "/", component: Home, name: "home" },
    { path: "/inventory", component: InventoryList, name: "InventoryList"},
    { path: "/recipes", component: Recipes, name: "Recipes"},
    { path: "/additem", component: AddNewIngredient, name: "AddNewIngredient"}
    ];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;

