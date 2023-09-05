<script>

import {store}  from '../../store';
import axios from "axios";
import StarItems from '../StarItems.vue'
import AppReview from '../AppReview.vue'
import AppVote from '../AppVote.vue'
import AppMessage from '../AppMessage.vue'


export default {
    name: "SingleMusicista",
    components: {
        StarItems,
        AppReview,
        AppVote,
        AppMessage
    },
    data() {
        return {
            store,
            loading: false,
            loadingError: false,
            selectedSection: "dettagli",
            isPopupVisible: false,
            user:null,
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
        selectStar(n) {
            this.vote = n;
        },
        deselectStar() {
            this.vote = 0; // Imposta il voto a 0 per deselezionare tutte le stelle
        },
    },
    mounted() {
        this.getUser(this.$route.params.id);
    }
}

</script>

<template>
    <section class="bg_gradient">
        <div v-if="user" class="p-5">
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
                        <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'Messaggi'"
                            :class="{ 'selected': selectedSection === 'Messaggi' }">
                            Messaggi
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

                        <!-- RECENSIONI -->
                        <div v-else-if="selectedSection === 'recensioni'">
                            <div class="d-flex">
                                <div class="d-flex flex-column w-100" >
                                    <AppReview />
                                </div>
                                <div class="w-100">
                                    <AppVote />
                                </div>
                            </div>
                        </div>

                        <!-- MESSAGGI -->
                        <div v-else-if="selectedSection === 'Messaggi'">
                            <div>
                                <AppMessage />
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
            <h3> {{ loadingError }} </h3>
        </div>
    </section>
</template>
<style lang="scss" scoped>

section{
    background-color: violet;
}
.btnCall {
    background-color: #001580;
}

.btnWhats {
    background-color: #0d8000
}

</style>