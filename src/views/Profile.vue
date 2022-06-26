<template>
    <div class="ms-5">
        <h1>{{userName}} - Under construction</h1>
<!--        <h2>Avatar image</h2>-->
<!--        <ul>-->
<!--            <h3>Ranks  <h5><u>Based on a percentage of total points</u></h5></h3>-->
<!--            <li>Executive Chef</li>-->
<!--            <li>Chef de Cusine</li>-->
<!--            <li>Sous Chef</li>-->
<!--            <li>Chef de Partie</li>-->
<!--            <li>Chef de Garde</li>-->
<!--            <li>Aboyeur</li>-->
<!--            <li>Communard</li>-->
<!--            <li>Apprentice</li>-->
<!--            <li>Plongeur</li>-->
<!--        </ul>-->

<!--        <p>User image</p>-->
<!--        <p>User about info</p>-->
<!--        <p>ranking/ awards/ points???</p>-->
<!--        <ul>-->
<!--            <li>Gets points for adding a new recipe</li>-->
<!--            <li>Created recipies get rated</li>-->
<!--            <li>gets points based on ratings of recipes</li>-->
<!--            <li>Gets points if people add users recipes to their own</li>-->
<!--            <li></li>-->
<!--            <li></li>-->
<!--            <li></li>-->
<!--        </ul>-->
<!--        <p>skill level</p>-->
<!--        <p>created recipes</p>-->
<!--        <p>followers</p>-->
<!--        <p>following</p>-->
<!--        <p>About Me:</p>-->
<!--        <p></p>-->
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                userName: "",
                message: "",
                messageObject: {},
                listOfMessages: [],
                importMessages: [],
            }
        },
        mounted(){
            this.userName = this.$store.state.userName;
        }
    }
</script>

<style scoped>

</style>
