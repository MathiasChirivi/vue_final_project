<script>
import axios from 'axios'
import { store } from '../../store'
import AppEventi from '../AppEventi.vue';
import AppCarousel from '../AppCarousel.vue';
import AppStep from '../AppStep.vue'

export default {
    name: "AppHome",
    data() {
        return {
            store,
        }
    },
    methods: {
        getUser() {
            axios.get(this.store.apiUrl + this.store.usersApi).then(response => {
                this.users = response.data.results.data;
                console.log(this.users)
            })
        }
    },
    components: {
        AppEventi,
        AppCarousel,
        AppStep,
    },
    mounted() {
        this.getUser();
    },

}
</script>
<template>
    <!-- carousel. -->
    <div id="carouselExampleControls" class="carousel slide col-12" data-bs-ride="carousel">
        <div class="carousel-inner">
                <div class="carousel-item active height_carousel ">
                    <img src="../../assets/img/jumbo_uno.png" class="d-block w-100 bg_size_cover" alt="...">
                </div>
            <div class="carousel-item height_carousel">
                <img src="../../assets/img/jumbo_due.png" class="d-block w-100 bg_size_cover" alt="...">
            </div>
            <div class="carousel-item height_carousel">
                <img  src="../../assets/img/jumbo_tre.png" class="d-block w-100 bg_size_cover" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>

        <!-- searche musicista. -->
        <!-- <div class="col-3 d-flex position-absolute justify-content-around rounded search  p-3">
            <div class="col-4 me-2">
                <input type="text" class="input" id="" placeholder="Genere">
            </div> -->
            <!-- <div class="col-4 me-2">
                <input type="text" class="input" id="" placeholder="Regione">
            </div> -->
            <!-- <div class="col-3 me-2 pe-2 pr-2">
                <input type="submit" class="input" id="">
            </div> 
        </div> -->
    </div>
    <div class="bg_img">
        <AppEventi />
    </div>
    <div class="container mx-auto mt-5">
        <AppCarousel />
    </div>
    <div class=" bg_img">
        <AppStep />
    </div>
</template>


<style scoped lang="scss">

#carouselExampleControls{
    margin-top: -100px;
    height: 70%;
}
.height_carousel{
    height: 700px;
}

.bg_size_cover{
    background-size: cover;
}

.search{
    background-color: #4b5b8b;;
    bottom: -30px;
    left: 709px;
}

.input{
    color: #fff;
    background-color: rgba(28, 28, 30, 0.849);
    font-weight: 500;
    font-size: .8vw;
    border-radius: 0.4vw;
    border: none;
    outline: none;
    padding: 0.4vw;
    max-width: 190px;
    
}

.mtCarousel{
    margin-top: 10%;
}

.bg_img{
    background-image: url(../../assets/img/sfondo_macchiato.png);
    min-width: 600px;
}
</style>