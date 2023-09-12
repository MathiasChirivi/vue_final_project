<script>
import axios from 'axios'
import { store } from '../../store'
import AppEventi from '../AppEventi.vue';
import AppCarousel from '../AppCarousel.vue';
import AppStep from '../AppStep.vue'
import AppNuovoProfilo from '../AppNuovoProfilo.vue';
import AppFooter from '../AppFooter.vue'

export default {
    name: "AppHome",
    data() {
        return {
            store,
            genres: [],
            selectedGenre: "",

        }
    },
    methods: {
        getUser() {
            axios.get(this.store.apiUrl + this.store.usersApi).then(response => {
                this.users = response.data.results.data;
            })
        },
        getGenresArray() {
            this.loading = true;
            axios.get(this.store.apiUrl + this.store.genresApi).then(response => {
                this.genres = response.data.results
                // this.users = response.data.results;

                this.loading = false;

            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'error', params: { code: 404 } })
            })
        },
        redirectToMusicistiPage() {
            if (this.selectedGenre) {
    // Effettua il reindirizzamento alla pagina dei musicisti con il genere come parte del percorso URL
    this.$router.push({ name: 'Musicisti', params: { genre: this.selectedGenre } });
  } else {
    // In questo caso, potresti gestire una ricerca generale senza specificare il genere
    // this.$router.push('/Musicisti'); // Reindirizzamento senza genere
    console.log("bubu")
  }
        },
    },
    components: {
        AppEventi,
        AppCarousel,
        AppStep,
        AppNuovoProfilo,
        AppFooter,
    },
    mounted() {
        this.getUser();
        this.getGenresArray();
    },

}
</script>
<template>

    <!-- carousel. -->
    <div id="carouselExampleControls" class="carousel slide col-12 " data-bs-ride="carousel">
        <div class="carousel-inner height_carousel">
            <div class="carousel-item active ">
                <img src="../../assets/img/jumbo_uno.png" class="d-block w-100 bg_size_cover" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../assets/img/jumbo_Due.png" class="d-block w-100 bg_size_cover" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../assets/img/jumbo_tre.png" class="d-block w-100 bg_size_cover" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev d-none d-xl-block" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next d-none d-xl-block" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    
    <!-- searche musicista. -->
    <div class="col-12 d-flex">
        <div class="col-3"></div>
        <div class="col-6 d-flex justify-content-center">
            <div class="d-flex align-items-center flex-column  bgSelect rounded p-3">
                <div class="me-2 pe-2 pr-2 d-flex align-items-center flex-wrap">
                    <label class="text-white mb-3" for="genre">Scegli il tuo Musicista in base al genere</label>
                    <select v-model="selectedGenre" class="form-select" >
                        <option v-for="genre in genres" :value="genre.name" >{{ genre.name }}</option>
                    </select>
                </div>
                <div class="me-2 pe-2 pr-2">
                    <button class="input fs-4 px-3 my-2" @click="redirectToMusicistiPage">cerca</button>
                </div>
            </div>
        </div>
        <div class="col-3"></div>
    </div>

    <div class="bg_img">
        <AppEventi />
    </div>
    <div class="d-none d-md-block container mx-auto mt-5">
        <AppCarousel />
    </div>
    <div class="bg_img">
        <AppStep />
    </div>
    <div>
        <AppNuovoProfilo />
    </div>
    <div class="bg_color">
        <AppFooter />
    </div>
</template>


<style scoped lang="scss">

#carouselExampleControls {
    margin-top: -100px;
    height: 70%;
}

.bg_size_cover {
    background-size: cover;
}

.input {
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

.bg_img {
    background-image: url(../../assets/img/sfondo_macchiato.png);
}

.bg_color {
    background-color: #4B5B8B;
}

.bgSelect {
    background-color: #4B5B8B;
    transform: translateY(-50%);
}
</style>