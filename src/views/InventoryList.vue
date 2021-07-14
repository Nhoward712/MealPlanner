<template>
    <div>
        <h1>Inventory Pages</h1>
        <router-link :to="{name:'AddNewIngredient'}"><button>Add New Item</button></router-link>
        <ul >
            <div v-for="item in ingredients" :key="item.ingredients">
                <ingredient :ingredient="item"></ingredient>
<!--                <p>{{item.name}}</p>-->
            </div>

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
                        name: doc.data().name,
                        onHand: doc.data().onHand,
                        purchased: doc.data().purchased,
                        cost: doc.data().cost,
                        }
                    );
                })
            })
        },
        mounted(){
            // this.ingredients = db.ingredientList;
            console.log(db.ingredientList)

        }
    }

</script>

<style scoped>

</style>
