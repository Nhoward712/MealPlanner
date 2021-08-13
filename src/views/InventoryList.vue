<template>
    <div>
        <h1>Inventory Pages</h1>
        <router-link :to="{name:'AddNewIngredient'}" class="m-4"><button><font-awesome-icon icon="plus-circle" /> Add New Item </button></router-link>
        <ul >
            <table v-for="item in ingredients" :key="item.ingredients" class="table table-bordered table-hover table-striped">
                <ingredient :ingredient="item" class="border border-bottom-0"></ingredient>
<!--                <p>{{item.name}}</p>-->
            </table>

<!--            <InventoryListItem v-for="item in posts" :item="post" :key="item.id"></InventoryListItem>-->
        </ul>
    </div>
</template>



<script>
    import ingredient from "../components/IngredientItem";
    import { db } from "../main";
    export default {
        components: {ingredient},
        name: "InventoryList",
        data(){
            return{
                ingredients: []
            }
        },
        created() {

            db.collection("ingredientList")
                .onSnapshot((snapshotChange) => {
                this.ingredients = [];
                snapshotChange.forEach((doc) => {
                    this.ingredients.push({
                        ingredientId: doc.data().ingredientId,
                        category: doc.data().category,
                        name: doc.data().name,
                        onHand: doc.data().onHand,
                        purchased: doc.data().purchased,
                        cost: doc.data().cost,
                        }
                    );
                });
                    this.ingredients.sort(function(a, b) {
                        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
                        let nameB = b.name.toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        // names must be equal
                        return 0;
                    });
            });

        },
        mounted(){

        }
    }

</script>

<style scoped>
    ingredient {background-color: #0b2e13;}
    ingredient:nth-child(odd) { background: red; }
</style>
