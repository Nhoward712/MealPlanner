<template>
    <div id="nav">
        <nav class="navbar navbar-expand-lg navbar-light  ">
            <router-link class="nav-item nav-link text-warning" to="/">Home</router-link> ||
            <router-link class="nav-item nav-link text-warning" :to="{name:'WeeklyMealPlan'}">Weekly Planner</router-link> ||
<!--            <router-link class="nav-item nav-link text-warning" :to="{name:'InventoryList'}">Inventory</router-link> ||-->
            <router-link class="nav-item nav-link text-warning" :to="{name:'Recipes'}">Recipes</router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
nav{
    background-color: #17a2b8;
}
</style>
