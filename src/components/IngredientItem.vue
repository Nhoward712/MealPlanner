<template>
    <div class="row mb-0">
        <input v-if="show" type="button" class="btn btn-primary ml-2" value="Edit">
        <p class="list-group-item m-0">{{ingredient.name}} </p>
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
