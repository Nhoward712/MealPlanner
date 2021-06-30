<template>
    <div class="row justify-content-center mb-0">
        <p class="ml-5 mb-0 mt-0">{{ingredient.name}} - </p>
<!--        <button type="button" class="btn btn-primary ml-2">Delete</button>-->
<!--        <button type="button" class="btn btn-primary ml-2">Edit</button>-->
    </div>
</template>

<script>
    export default {
        name: "ingredient",
        props:{
            ingredient: {
                type: Object,
                default: NaN
            }
        }
    }
</script>

<style scoped>




</style>
