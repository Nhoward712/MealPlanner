<template>
    <div id="nav">
        <router-link to="/">Home</router-link> ||
        <router-link :to="{name:'InventoryList'}">Inventory</router-link> ||
        <router-link :to="{name:'Recipes'}">Recipes</router-link>

    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>

</style>