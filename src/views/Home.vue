<template>

        <div class="bg text-center">
            <div class="text-center  pt-5" style="height: 90%">
                <div class="m-auto border border-dark rounded" style="width: 60%; height:60%; opacity: 100%; background-color: #FFFFFF">
                    <h1 class="pt-3">Meal Planner 3000</h1>
                </div>



            </div>
            <div class="mt-5">
                <p>Meal Planner 3000 is a tool to help organize your recipes, plan your weekly meals, and create a shopping list based off of those meals</p>
            </div>
        </div>

<!--        <img src="../assets/IMG_0789.jpeg" class="img-fluid img-thumbnail">-->


</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    body, html {
        height: 100%;
    }

    .bg {
        /* The image used */
        background-image: url("../assets/IMG_0789.jpeg");
        /* Half height */
        height: 300px;
        text-align: center;
        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
