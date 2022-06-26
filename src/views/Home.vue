<template>
        <div class="bg-light ms-auto me-auto text-center container-fluid row">
<!--main header-->
            <div class="bg col-sm-12 col-md-4 pt-5 mb-5">
                <div class="text-center" >
                    <div class="m-auto border border-dark rounded text-center" style="width: 60%; height:60%; opacity: 100%; background-color: #FFFFFF">
                        <h1 class="text-sm-center">Meal Planner 3000</h1>
                        <h2 class="text-sm-center">Welcome {{userName}}</h2>
                    </div>
                </div>

            </div>

            <div class="mt-5 col-sm-12 col-md-4 ">
                <p>Meal Planner 3000 is a tool to help organize your recipes, plan your weekly meals, and create a shopping list based off of those meals</p>
                <p>This is a developer version.  All recipes and plans are for display purposes only and may not be accurate</p>
            </div>
            <div class="bg col-sm-12 col-md-4 pt-5 mb-5">
                <p class="">Need to put a Carousel here.  Randomize recipes with pictures.  Rotate through 5. resets to new recipes each load</p>
            </div>

<!--message box-->
            <div class="border border-dark col-sm-12 col-md-6 mb-5 p-3">
<!-- Post Message-->
                <div class="mb-4">
                    <label v-if="userName" for="message">{{userName}}'s Feed</label><br>
                    <div v-if="userName">
                        <input type="text" id="message" size="70" v-model="message" placeholder="Leave a Message or Suggestion">
                        <input type="submit" value="Submit" v-on:click="newMessage(userName, message)">
                    </div>
                    <div v-else>
                        <button>Sign In to Leave comments</button>
                    </div>

                </div>
<!-- messages -->
                <div class="overflow-scroll">
                    <div class="col-12 container-fluid" v-for="message in listOfMessages" :key="message.listOfMessages">
                        <div>
                            <Message :message=message></Message>
                        </div>
                    </div>
                </div>


            </div>

        </div>

<!--        <img src="../assets/IMG_0789.jpeg" class="img-fluid img-thumbnail">-->


</template>

<script>
    import { db } from "../main";
    import Message from "@/components/Message";

    export default {
        name: "Home",
        components: {Message},
        data() {
            return {
                userName: "",
                message: "",
                messageObject: {},
                listOfMessages: [],
                importmessages: [],
            }
        },
        created(){

            db.collection("messages")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        this.importmessages.push(
                            {
                                date: doc.data().date,
                                message: doc.data().message,
                                user: doc.data().user,
                            }
                        )
                    })
                }).then(()=>{
                this.listOfMessages = this.importmessages;
                this.listOfMessages.sort(function(a,b) {
                    return (a.date.seconds < b.date.seconds) ? 1 : ((b.date.seconds < a.date.seconds) ? -1 : 0);
                });
            });

        },
        methods:{
            newMessage(userName,message){
                console.log(userName, message);
                let currentDate = new Date();
                this.messageObject = {
                    date: currentDate,
                    message: message,
                    user: userName,
                };
                db.collection("messages")
                    .add(this.messageObject)
                    .then(() =>{
                        this.listOfMessages.push(this.messageObject);
                        this.$router.push("/Home");
                    })
            },
            sortMessageList(array,key){
                return array.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });            }
        },
        mounted(){
            this.userName = this.$store.state.userName;
        }
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
