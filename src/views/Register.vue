<template>
    <div class="container d-flex justify-content-center">
        <div class="card mx-5 my-5">
            <div class="card-body py-2 px-2">
                <h2 class="card-heading py-3 px-5">Register New User</h2>
                <div class="row mx-3 my-3">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputEmail"  class="sr-only">Email</label>
                            <input type="email" class="form-control" v-model="email" id="inputEmail" placeholder="Email">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" class="form-control" id="inputPassword" v-model="password" placeholder="Password">
                        </div>
                    </div>
                </div>
                <div class="mx-5 my-2 ">
                    <div class="form-group">
                        <label for="userName" class="sr-only">User Name</label>
                        <input type="text" class="form-control" id="userName" v-model="userName" placeholder="What do we call you?">
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

    export default {
        name: "Register",
        data() {
            return {
                email: "",
                password: "",
                userName: "",
            };
        },
        methods: {
            emailSignUp() {
                console.log(this.email, this.password);
                if (this.email && this.password) {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(this.email, this.password)
                        .then((params) => {
                            console.log("SUCCESS", params);
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
        },
    };
</script>

<style scoped>

</style>
