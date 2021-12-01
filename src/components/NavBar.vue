<template>
    <div id="nav">
        <nav class="navbar sticky-top navbar-expand-sm navbar-light ">
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
