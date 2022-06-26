<template>
    <div id="nav">
        <nav class="navbar navbar-expand-sm navbar-light ">
            <a class="navbar-brand" href="#"><img src="../assets/LogoIcon.png" class="img-fluid" style="height: 60px"> </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse " id="navbarSupportedContent" data-toggle="collapse" data-target="#navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item ">
                        <router-link class="nav-item nav-link " to="/"><h4>Home</h4></router-link>
                    </li>
                    <li class="nav-item" v-if="currentUser">
                        <router-link class="nav-item nav-link " :to="{name:'ShoppingList', params:{userRole, userName}}"><h4>Shopping List</h4></router-link>
                    </li>
                    <li class="nav-item" v-else>
                        <h4 type="button" class="nav-item nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">Shopping List</h4>
                    </li>
                    <li class="nav-item" v-if="currentUser">
                        <router-link class="nav-item nav-link " :to="{name:'WeeklyMealPlan', params:{userRole, userName}}"><h4>Weekly Planner</h4></router-link>
                    </li>
                    <li class="nav-item" v-else>
                        <h4 type="button" class="nav-item nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">Weekly Planner</h4>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-item nav-link " :to="{name:'Recipes',params:{userRole, userName}}"><h4>Recipes</h4></router-link>
                    </li>
                    <li class=" " v-if="currentUser" >
                        <div class="dropdown m-2">
                            <a href="#" class="dropdown-toggle "  data-bs-toggle="dropdown">User: <b>{{ userName }}</b></a>
                            <div class="dropdown-menu">
                                <router-link to="/Profile" data-bs-dismiss="modal" class="dropdown-item">Profile</router-link>
                                <a href="#" class="dropdown-item" @click.prevent="logout">Log out</a>
                                <div class="" v-if="userRole ==='admin' ">
                                    <router-link class="dropdown-item" :to="{name:'InventoryList',params:{userRole, userName}}">Inventory</router-link>
                                </div>
                                <div class="" v-if="userRole ==='admin' ">
                                    <router-link class="dropdown-item" :to="{name:'ajaxtesting', params:{userRole, userName}}">API Testing</router-link>
                                </div>
                            </div>


                        </div>
                    </li>
                    <li class="nav-item text-right col-sm-2" v-else>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Sign In
                        </button>

                    </li>
                    <li class="nav-item text-center col-sm-4 row" v-if="!currentUser">
                        <h5 class="col-sm-7">Not a member yet?</h5>
                        <router-link to="/register" style="height: 40px" data-bs-dismiss="modal" class="btn btn-primary col-sm-5">Registration</router-link>
                    </li>
<!--                    <li class="float-sm-right border">-->
<!--                        <span v-if="currentUser" class="">-->

<!--&lt;!&ndash;                            <p class="ps-2 pe-2 mt-2">Logged in as: <b>{{ userName }}</b></p>&ndash;&gt;-->
<!--                        </span>-->
<!--                    </li>-->

                </ul>
                <!-- Button trigger modal -->
<!--                <div class="d-grid gap-2 d-md-flex justify-content-md-center">-->
<!--                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">-->
<!--                        Sign In-->
<!--                    </button>-->
<!--                </div>-->
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title" id="exampleModalLabel">Log In</h2>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row one mx-3 my-3">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="inputEmail"  class="sr-only">Email</label>
                                            <input type="email" class="form-control" v-model="email" id="inputEmail" placeholder="Email or Phone">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="inputPassword" class="sr-only">Password</label>
                                            <input type="password" class="form-control" id="inputPassword" v-model="password" placeholder="Password">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="">
<!--                                <div class="col-sm-5">-->
<!--                                    <div class="form-group text-right">-->
<!--                                        <a href="#" class="">Forgot your Password?</a>-->
<!--                                    </div>-->
<!--                                </div>-->
                                <div class="row text-center col-sm-8 m-auto">
                                    <h5 class="col-sm-8">Not a member yet?</h5>
                                    <router-link to="/register" data-bs-dismiss="modal" class="btn btn-primary col-sm-4">Registration</router-link>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="login" >log In</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: "NavBar",
        data() {
            return {
                email: "",
                password: "",
                loginErrorMessage: "",
                currentUser: null,
                userRole: null,
                userName: null,
            };
        },
        mounted(){
            firebase.auth()
                .onAuthStateChanged((user) => {
                    if (user) {
                        this.currentUser = user;
                        // a user has just logged in, so we need to get his/her document
                        // from our users collection
                        this.getUserDocument(user.uid);
                        this.$router.push("/Home").catch(() => {});
                    } else {
                        this.currentUser = null;
                        this.userRole = null;
                        this.$store.commit("setUserName", null);
                    }
                });
            this.userName = this.$store.state.userName
        },

        methods: {
            login() {
                this.loginErrorMessage = "";
                if (this.email && this.password) {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(this.email, this.password)
                        .then((userCredential) => {
                            console.log(
                                "SIGNED IN WITH EMAIL AND PASSWORD",
                                userCredential.user
                            );
                            this.$router.push("/Home");

                            // if you don't use a param then it won't compile!!!!
                        })
                        .catch((error) => {
                            this.loginErrorMessage = error.message;
                        });
                } else {
                    if (!this.email && !this.password) {
                        this.loginErrorMessage = "You must enter an email and password";
                    } else if (!this.email) {
                        this.loginErrorMessage = "You must enter an email";
                    } else if (!this.password) {
                        this.loginErrorMessage = "You must enter a password";
                    }
                }
            },
            getUserDocument(userId) {
                const db = firebase.app().firestore();
                db.collection("users")
                    .doc(userId)
                    .get()
                    .then((doc) => {
                        if (doc.exists == false) {
                            console.log("THE USER DOCUMENT DOES NOT EXIST...");
                            this.createUserDocument();
                        } else {
                            this.userRole = doc.data().role;
                            this.userName = doc.data().userName;
                            this.$emit("test",this.userRole);
                            this.$store.commit("setUserName",this.userName);
                        }
                    })
                    .catch((error) => console.log(error));
            },
            createUserDocument() {
                const user = firebase.auth().currentUser;
                if (user) {
                    // Note, you may want to store more info in the users collection
                    // (I am just adding email and role, but your app may call for more fields)
                    const db = firebase.app().firestore();
                    this.userRole = "user"; // when a new user is created they default to the 'user' role
                    this.userName = "Guest1";
                    db.collection("users")
                        .doc(user.uid)
                        .set({ email: user.email, role: this.userRole, userName: this.userName }, { merge: true })
                        .then(() => console.log("USER DOCUMENT CREATED"))
                        .catch((e) => console.log(e));
                } else {
                    console.log("cannot create user doc!");
                }
            },
            logout() {
                firebase
                    .auth()
                    .signOut()
                    .then(
                        () => {
                            this.userRole = null;
                            this.$router.push("login").catch(() => {});
                            // when a user logs out, redirect to the login view
                            // note that if you don't put the catch(), then
                            // you may get a warning saying you should avoid redundant navigation
                            console.log("Logged Out");
                            this.$router.push("/Home");

                        },
                        (error) => {
                            console.log("error logging out", error);
                        }
                    );
            },
            googleLogin() {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then((userCredential) => {
                        console.log("LOGGED IN W GMAIL:", userCredential.user);
                    })
                    .catch((error) => console.log(error));
            },
        },

    }

</script>

<style scoped>
nav{
    background-color: #EAE7DC;
    /*position:fixed; !* fixing the position takes it out of html flow - knows*/
    /*               nothing about where to locate itself except by browser*/
    /*               coordinates *!*/
/*    left:0;           !* top left corner should start at leftmost spot *!*/
/*    top:0;            !* top left corner should start at topmost spot *!!**/
/*    width:100vw;      !* take up the full browser width *!*/
/*z-index:500;  !* high z index so other content scrolls underneath *!*/
/*height:50px*!*/
}

</style>
