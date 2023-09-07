<script>
    import { store } from '../store'

    export default{
        name:"AppEventi",

        data(){
            return{
                store,
            }
        },
    }
</script>

<template>
    <div class="container pb-5">
        <div class="row justify-content-center py-5">
            <!-- titolo. -->
            <div class="col-12 pt-4 pb-4">
                <h2 class="text-center">La Giusta Musica Per I Tuoi Eventi</h2>
            </div>

            <!-- card. -->
            <div class="col-12 d-sm-flex justify-content-center pt-4">
                <div v-for="event in store.events" class="w-75 card pt-4 p-3 me-sm-3 mb-3 mx-auto">
                    <!-- titolo. -->
                    <h5 class="col-12 text-center">{{ event.title }}</h5>
                    
                    <!-- testo. -->
                    <p class="col-12 text-center">{{ event.text }}</p>  
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    background-color: #4B5B8B;
    transition: all 0.5s;

    box-shadow: 12px 17px 51px rgba(61, 61, 61, 0.603);
    backdrop-filter: blur(6px);
    background: #4b5b8bb9;
}

.card:hover {
    border: 1px solid black;
    transform: scale(1.05);
}

.card:active {
    transform: scale(0.95) rotateZ(1.7deg);
}
</style>