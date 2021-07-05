<template>
    <div class="row mb-0">
        <input v-if="show" type="button" class="btn btn-primary ml-2" value="Edit">
        <p v-if="ingredient.amount" class="ml-0 col-sm-1">{{ingredient.amount}}</p>
        <p v-if="ingredient.type" class="ml-1 col-sm-3">{{ingredient.type}}</p>
        <p class="ml-0 col-sm-7">{{ingredient.name}} </p>
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
            },
            show: {
                type: Boolean,
                default: true,
            }
        }
    }
</script>

<style scoped>




</style>
