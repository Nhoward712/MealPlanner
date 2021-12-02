<template>
    <div id="nav">
        <nav class="navbar navbar-expand-sm navbar-light ">
            <a class="navbar-brand" href="#">LOGO</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse " id="navbarSupportedContent" data-toggle="collapse" data-target="#navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item ">
                        <router-link class="nav-item nav-link " to="/"><h4>Home</h4></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-item nav-link " :to="{name:'ShoppingList'}"><h4>Shopping List</h4></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-item nav-link " :to="{name:'WeeklyMealPlan'}"><h4>Weekly Planner</h4></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-item nav-link " :to="{name:'InventoryList'}"><h4>Inventory</h4></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-item nav-link " :to="{name:'Recipes'}"><h4>Recipes</h4></router-link>
                    </li>
                </ul>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Sign In
                </button>

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
                                    <router-link to="/register" class="btn btn-primary col-sm-4">Registration</router-link>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                <button type="button" class="btn btn-primary" @click="login" >log In</button>

                            </div>
                        </div>
                    </div>
                </div>
<!--                <p>-->
<!--                    <button class="btn btn-primary ml-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">-->
<!--                        Sign in-->
<!--                    </button>-->
<!--                </p>-->
<!--                <div class="collapse" id="collapseExample">-->
<!--                    <div class="card card-body">-->
<!--                        <div class="container d-flex justify-content-center">-->
<!--                            <div class="card mx-5 my-5">-->
<!--                                <div class="card-body py-2 px-2">-->
<!--                                    <h2 class="card-heading py-3 px-5">Log In</h2>-->
<!--                                    <div class="row one mx-3 my-3">-->
<!--                                        <div class="col-md-6">-->
<!--                                            <div class="form-group">-->
<!--                                                <label for="inputEmail"  class="sr-only">Email</label>-->
<!--                                                <input type="email" class="form-control" v-model="email" id="inputEmail1" placeholder="Email or Phone">-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="col-md-6">-->
<!--                                            <div class="form-group">-->
<!--                                                <label for="inputPassword" class="sr-only">Password</label>-->
<!--                                                <input type="password" class="form-control" id="inputPassword1" v-model="password" placeholder="Password">-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="row two mx-3">-->
<!--                                        <div class="col-md-6">-->
<!--                                            <div class="form-group">-->
<!--                                                <button type="submit" class="btn btn-primary mb-2" @click="login" >log In</button>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="col-md-6">-->
<!--                                            <div class="form-group">-->
<!--                                                <a href="#" class="forgot">Forgot your Password?</a>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="row text-center">-->
<!--                                        <p class="ml-5">Not a member yet?</p>-->
<!--                                        <router-link to="/register" class="btn btn-primary m-2">Registration</router-link>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </nav>

    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
nav{
    background-color: #9fcdff;
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
