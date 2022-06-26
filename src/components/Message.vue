<template>
    <div class="border border-dark col-12 row">

        <div class="col-sm-4">
            <b class="justify-content-sm-start">{{message.user}}</b> said:
        </div>
        <div class="border col-sm-8">
            <p>"{{message.message}}"</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Message",
        props:{
            message:{
                type: Object,
                default: NaN
            }
        }
    }
</script>

<style scoped>

</style>
