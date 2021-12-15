<template>
    <div class="container d-flex justify-content-center">
        <div class="card mx-5 my-5">
            <div class="card-body py-2 px-2">
                <h2 class="card-heading py-3 px-5">Register New User</h2>
                <div class="row mx-3 my-3">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputEmail"  class="sr-only">Email</label>
                            <input type="email" class="form-control" v-model="email" id="inputEmail" placeholder="Email" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" class="form-control" id="inputPassword" v-model="password" placeholder="Password" required>
                        </div>
                    </div>
                </div>
                <div class="mx-5 my-2 ">
                    <div class="form-group">
                        <label for="userName" class="sr-only">User Name</label>
                        <input type="text" class="form-control" id="userName" v-model="userName" placeholder="What do we call you?" required>
                    </div>
                </div>
                <div class="row two mx-3 ">
                    <div class="">
                        <div class="form-group d-grid gap-2 d-md-flex justify-content-md-center">
                            <button type="submit" class="btn btn-primary mb-2" @click="emailSignUp">Register</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase";
    import { db } from "../main";

    export default {
        name: "Register",
        data() {
            return {
                email: "",
                password: "",
                userName: "",
                activeMealPlan: {},
            };
        },
        methods: {
            emailSignUp() {
                if (this.email && this.password && this.validateUserName(this.userName)) {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(this.email, this.password)
                        .then((params) => {
                            console.log("SUCCESS", params);
                            this.createUserDocument();
                        })
                        .then(() => {
                            this.createMealPlan(this.userName);
                        })
                        .catch((error) => {
                            console.log("SIGN UP ERROR:", error.message);
                            // The account could aleady exist,
                            // or the password may not be strong enough
                        });
                } else {
                    console.log("Inavalid user input - Make sure you add validation code!");
                }
            },
            createUserDocument() {
                const user = firebase.auth().currentUser;
                if (user) {
                    // Note, may want to store more info in the users collection
                    const db = firebase.app().firestore();
                    this.userRole = "user"; // when a new user is created they default to the 'user' role
                    db.collection("users")
                        .doc(user.uid)
                        .set({ email: user.email, role: this.userRole, userName: this.userName }, { merge: true })
                        .then(() => console.log("USER DOCUMENT CREATED"))
                        .catch((e) => console.log(e));
                } else {
                    console.log("cannot create user doc!");
                }
            },
            createMealPlan(planId){
                this.activeMealPlan ={
                    PlanId: planId,
                    FridayBreakfast: [],
                    FridayDinner: [],
                    FridayLunch: [],
                    MondayBreakfast: [],
                    MondayDinner: [],
                    MondayLunch: [],
                    SaturdayBreakfast: [],
                    SaturdayDinner: [],
                    SaturdayLunch: [],
                    StartDate: [],
                    SundayBreakfast: [],
                    SundayDinner: [],
                    SundayLunch: [],
                    ThursdayBreakfast: [],
                    ThursdayDinner: [],
                    ThursdayLunch: [],
                    TuesdayBreakfast: [],
                    TuesdayDinner: [],
                    TuesdayLunch: [],
                    WednesdayBreakfast: [],
                    WednesdayDinner: [],
                    WednesdayLunch:[],
                };
                db.collection("MealPlans")
                    .add(this.activeMealPlan)

            },
            validateUserName(username){
                db.collection("users")
                    .get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach((doc)=>{
                            if(username === doc.data().userName){

                                return false;
                            }else{
                                return true;
                            }
                        })
                    })
            }

        },
    };
</script>

<style scoped>

</style>
