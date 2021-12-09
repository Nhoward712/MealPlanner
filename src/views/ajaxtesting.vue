<template>
    <div>
        <div>

        </div>
        placeholder<br>
<!--        <div v-for="post in random" :key="post.random">-->
<!--            <p>{{post.title}}</p>-->
<!--        </div>-->
<!--        {{random[0].title}}-->





    </div>
</template>

<script>
    export default {
        name: "ajaxtesting",
        data(){
            return {
                random: {},
            }
        },
        mounted(){

        },
        methods:{
            async getData(){
                try{
                    const config ={
                        method:'get',
                        url: 'http://us.openfoodfact.org',
                        headers:{
                        }
                    };
                    let response = await this.$http(config);
                    this.random = response.data;
                    console.log("response",response.request._header);
                    // console.log("here", this.random[0].title)
                }catch(error){
                    console.log(error)
                }
            }
        },
        created(){
            this.getData();
        }

    }
</script>

<style scoped>

</style>
