<template>

        <div class="bg text-center">
            <div class="text-center  pt-5" style="height: 90%">
                <div class="m-auto border border-dark rounded text-center" style="width: 60%; height:60%; opacity: 100%; background-color: #FFFFFF">
                    <h1 class="text-sm-center">Meal Planner 3000</h1>
                    <h2 class="text-sm-center">Welcome {{userName}}</h2>
                </div>
            </div>

            <div class="mt-5">
                <p>Meal Planner 3000 is a tool to help organize your recipes, plan your weekly meals, and create a shopping list based off of those meals</p>
                <p>This is a developer version.  All recipes and plans are for display purposes only and may not be accurate</p>
            </div>

            <div class="border border-dark col-sm-8 mb-2 p-3">

                <div class="mb-4">
                    <label for="message">Leave a Message or Suggestion:</label><br>
                    <div v-if="userName">
                        <input type="text" id="message" size="70" v-model="message" placeholder="Leave a Message or Suggestion">
                        <input type="submit" value="Submit" v-on:click="newMessage(userName, message)">
                    </div>
                    <div v-else>
                        <button>Sign In to Leave comments</button>
                    </div>

                </div>

                <div class="col-sm-12" v-for="message in listOfMessages" :key="message.listOfMessages">
                    <div>
                    <div class="border border-dark col-sm-6 text-left row">
                        <div class="col-sm-4">
                            <b class="justify-content-sm-start">{{message.user}}</b> said:
                        </div>
                        <div class="border col-sm-8">
                            <p>"{{message.message}}"</p>
                        </div>
                    </div>
                    </div>
                </div>

            </div>

        </div>

<!--        <img src="../assets/IMG_0789.jpeg" class="img-fluid img-thumbnail">-->


</template>

<script>
    import { db } from "../main";
    export default {
        name: "Home",
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



            console.log("list of Messages",this.listOfMessages)

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
