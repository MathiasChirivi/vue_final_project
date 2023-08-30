<script>
    import { store } from '../../store';
    export default{
        name: "Appstatistiche",
        data (){
            return{
                store,
            }
        }
    }
</script>



<template>
        <div class="d-flex justify-content-center container pt-5 pb-5">
        
        <div v-for="statistica in store.statistiche" class=" d-flex flex-column align-items-center pr-5 ps-5 " >
            <!-- <img src="../assets/background-pattern-grid-line-06.png" alt=""> -->
            <span class="colorPrimary fs-3">{{ statistica.dato }}</span>
            <p class="fs-2">{{ statistica.testo }}</p>
        </div>
    </div>
 
</template>



<style scoped>

</style>