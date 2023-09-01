<script>

import { store } from '../../store';
import axios from "axios";
import StarItems from '../StarItems.vue'


export default {
    name: "SingleMusicista",
    components: {
        StarItems,
    },
    data() {
        return {
            store,
            loading: false,
            loadingError: false,
            user: null,
            selectedSection: "dettagli",
            isPopupVisible: false,
            review: '',
            voto: 0,
            VoteStar:false
        }
    },
    methods: {
        getUser(id) {
            this.loading = true;
            axios.get(this.store.apiUrl + this.store.usersApi + id).then(response => {
                this.user = response.data.results;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'error', params: { code: 404 } })
            });
        },
        showPopup() {
            console.log("davide");
            this.isPopupVisible = true;
        },
        closePopup() {
            this.isPopupVisible = false;
        },
        submitReview() {
            // Qui puoi implementare la logica per inviare la recensione al tuo backend
            console.log('Recensione inviata:', this.review);
            this.closePopup();
        },
        functionStar(){
            this.VoteStar = !this.VoteStar;
        }
    },

    mounted() {
        this.getUser(this.$route.params.id);
    }

}

</script>

<template>
    <section>
        <div v-if="user" class="vh-100">
            <div class="container mt-5">
                <a class="text-decoration-none">
                    <router-link class="text-decoration-none textLink" :to="{ name: 'Musicisti' }">
                        <font-awesome-icon icon="fa-solid fa-arrow-left" style="color: #003ca3;" />
                        Torna ai Musicisti
                    </router-link>
                </a>
                <div class="row mt-3">
                    <div class="col-10 d-flex ">
                        <div class="d-flex me-3">
                            <img v-if="user.img" class="w-100" :src="store.storageUrl + user.img" />
                            <img v-else class="w-100"
                                src="https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4="
                                alt="">
                        </div>
                        <div class="col-4 d-flex flex-column justify-content-end">
                            <div class="d-flex flex-column justify-content-start ">
                                <h5 class="mb-0">Feedback</h5>
                                <StarItems
                                    :itemRate="(user.votes.length > 0 ? user.votes.reduce((total, vote) => total + vote.vote, 0) / user.votes.length : 0)" />
                                <h3 class="mt-4">{{ user.name }} {{ user.surname }}</h3>
                            </div>
                        </div>
                        <div class="col-4 d-flex align-items-end justify-content-end">
                            <a class="btn btn-primary" href=""><font-awesome-icon :icon="['fas', 'music']" class="me-2"
                                    style="color: #ffffff;" />Contatta l'artista</a>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-12 d-flex gap-4">
                        <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'dettagli'"
                            :class="{ 'selected': selectedSection === 'dettagli' }">
                            Dettagli
                        </a>
                        <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'recensioni'"
                            :class="{ 'selected': selectedSection === 'recensioni' }">
                            Recensioni
                        </a>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-12">
                        <div v-if="selectedSection === 'dettagli'">
                            <div class="text-decoration-none">
                                <h3>INFORMAZIONI</h3>
                                <div>
                                    <font-awesome-icon class="fs-4" icon="fa-solid fa-location-dot"
                                        style="color: #001580;" />
                                    <span class="ms-2 fs-5">{{ user.region }}</span>
                                </div>
                                <div class="mt-4">
                                    <a class="btn btnCall text-white me-3" href=""><font-awesome-icon
                                            icon="fa-solid fa-phone" class="me-2" style="color: #ffffff;" />Chiama</a>
                                    <a class="btn btnWhats text-white" href=""><font-awesome-icon
                                            :icon="['fab', 'whatsapp']" class="me-2" style="color: #ffffff;" />Whatsapp</a>
                                    <hr class="w-75 mt-5 mb-5">
                                    <div class="row">
                                        <div class="col-12">
                                            <h3>CACHET</h3>
                                            <div class="fs-6 fw-light">
                                                € {{ user.cachet }}
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="w-75 mt-5 mb-5">
                                    <div class="row">
                                        <div class="col-12">
                                            <h3>GENERI</h3>
                                            <div class="fs-5 fw-normal badge btnCall me-3 mt-3"
                                                v-for="genre in user.genres">
                                                {{ genre.name }}
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="w-75 mt-5 mb-5">
                                    <div class="row">
                                        <div class="col-12">
                                            <h3>DESCRIZIONE</h3>
                                            <div class="w-50">
                                                {{ user.experience }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="selectedSection === 'recensioni'">
                            <!-- <a class="btn">
                                <font-awesome-icon class="me-2" icon="fa-solid fa-plus" />
                                <span>Lascia una recensione</span>
                            </a> -->
                            <button @click="showPopup">Aggiungi una recensione</button>

                            <!-- Popup -->
                            <div v-bind:class="isPopupVisible === true ? 'd-block' : ''" id="reviewPopup" class="popup">
                                <div class="popup-content">
                                    <h2>Aggiungi una recensione</h2>
                                    <form class="review-form" @submit="handleSubmit">
                                        <label for="review">Nome:</label>
                                        <input class="w-50" type="text">
                                        <label for="review">Email:</label>
                                        <input class="w-50" type="email">
                                        <label for="review">Recensione:</label>
                                        <textarea id="review" name="review" rows="4"></textarea>

                                        <button type="button" @click="functionStar" class="mt-3">Dai un voto</button>
                                        <div v-if="VoteStar">
                                            <span class="fs-2" type="button" v-for="n in 5" :key="n" @click="voto = n"
                                                :class="{ 'selectedStar': n <= voto }">&#9733;</span>
                                        </div>
                                        
                                        <button class="w-25 m-3 btn btn-info" type="submit">Invia recensione</button>
                                    </form>
                                    <button class="btn btn-info" @click="closePopup">Chiudi</button>
                                </div>
                            </div>

                            <div v-for="review in user.reviews" :key="review.id">
                                <h5 class="m-0">{{ review.name }}</h5>
                                <div class="fw-light">{{ review.date }}</div>
                                <div class="fw-lighter mt-2">{{ review.comment }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 v-if="loading">
                <div class="spinner vh-100">Caricameto dati</div>
            </h3>
            <h3 v-else="loadingError"> {{ loadingError }} </h3>
        </div>
    </section>
</template>
<style lang="scss" scoped>

.selectedStar {
    color: gold; /* Puoi personalizzare il colore qui */
  }
.btnCall {
    background-color: #001580;
}

.btnWhats {
    background-color: #0d8000
}

.popup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
}

.popup-content {
    width: 50%;
    min-height: 50%;
    background: #9496ff;
    background: -webkit-linear-gradient(173deg, #9496ff 0%, #ffffff 100%);
    background: linear-gradient(173deg, #9496ff 0%, #ffffff 100%);
    background-repeat: no-repeat;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    margin-left: auto;
    margin-right: auto;
    transform: translateY(30%);

}

/* Stili per il form */
.review-form {
    display: flex;
    flex-direction: column;
}
</style>