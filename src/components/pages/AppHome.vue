<script>
import axios from 'axios'
import { store } from '../../store'
import AppCarousel from '../AppCarousel.vue';

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
        AppCarousel
    },
    mounted() {
        this.getUser();
    },

}
</script>
<template>
    <!-- carousel. -->
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active height_carousel">
                    <img src="../../assets/img/sfondo_uno.png" class="d-block w-100 bg_size_cover" alt="...">
                </div>
            <div class="carousel-item height_carousel">
                <img src="../../assets/img/sfondo_2.png" class="d-block w-100 bg_size_cover" alt="...">
            </div>
            <div class="carousel-item height_carousel">
                <img  src="../../assets/img/sfondo_3.png" class="d-block w-100 bg_size_cover" alt="...">
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
        <div class="col-6 d-flex position-absolute justify-content-around rounded search  p-3">
            <div class="col-5 me-2">
                <input type="text" class="form-control" id="" placeholder="Genere">
            </div>
            <div class="col-5 me-2">
                <input type="text" class="form-control" id="" placeholder="Regione">
            </div>
            <div class="col-2 me-2">
                <input type="submit" class="form-control" id="">
            </div> 
        </div>
    </div>
    <div class="container mx-auto mtCarousel">
        <AppCarousel />
    </div>
</template>


<style scoped lang="scss">
.bgcolor_search {
    background-color: rgba(255, 255, 255, 0.493);

}

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
    background-color: rgba(17, 13, 13, 0.384);
    bottom: -30px;
    transform: translateX(50%);
    
}

.mtCarousel{
    margin-top: 10%;
}
</style>