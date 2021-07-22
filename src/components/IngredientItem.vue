<template>
    <div class="row mb-0 border border-bottom col-sm-4">
        <button v-if="show" type="button" class="btn  mt-0 ml-0" value="Delete" @click="deleteItem(ingredient.ingredientId)">
            <font-awesome-icon icon="minus-circle" />
        </button>
        <p v-if="ingredient.amount" class="ml-0 col-sm-1">{{ingredient.amount}}</p>
        <p v-if="ingredient.type" class="ml-1 col-sm-3">{{ingredient.type}}</p>
        <td class="ml-0 mt-2 col-sm-7">{{ingredient.name}} </td>
    </div>
</template>

<script>
    import { db } from "../main";

    export default {
        name: "ingredient",
        props:{
            ingredient: {
                type: Object,
                default: NaN
            },
            show: {
                type: Boolean,
                default: true,
            }
        },
        methods:{
            deleteItem(tempId){
                // var tempId = prompt ("What is the id of the image you want to delete");
                let fullId ="";
                db.collection("ingredientList")
                    .get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach(doc =>{
                            const id = doc.data();
                            if(tempId === id.ingredientId){
                                fullId = doc.id;

                            }
                        })
                    })
                    .then(() =>{
                        db.collection("ingredientList")
                            .doc(fullId)
                            .delete()
                            .catch(error => console.log(error))
                    })

            }

        }
    }

</script>

<style scoped>




</style>
