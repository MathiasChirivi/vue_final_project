<script>

import { store } from '../../store';
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
            user: null,
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
        <div v-if="user">

        <div class="container pt-5">

            <!-- link "torna a musicisti." -->
            <div class="row">
                <div class="col-12">
                    <a class="text-decoration-none fs-4">
                        <router-link class="text-decoration-none textLink text-white" :to="{ name: 'Musicisti' }">
                            <font-awesome-icon icon="fa-solid fa-arrow-left" style="color: #2b1d6b;" />
                            Torna ai Musicisti
                        </router-link>
                    </a>
                </div>
            </div>

            <!-- nome da phone. -->
            <div class="row d-sm-none">
                <div class="col-12">
                    <p class="fs-2 text-white">{{ user.name }} {{ user.surname }}</p>
                </div>
            </div>

            <!-- immagine. -->
            <div class="row mt-3 ">
                <div class="col-12 d-md-flex">

                    <!-- immagine. -->
                    <div class="col-10 col-sm-5 col-md-4">
                        <img v-if="user.img" class="w-100" :src="store.storageUrl + user.img" />
                        <img v-else class="w-100"
                            src="https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4="
                            alt="">
                    </div>

                    

                    <div class="d-none d-sm-flex col-8">


                        <!-- generi. -->
                        <div class="col-4 d-md-flex flex-md-column align-items-md-center">
                            <h3 >Generi</h3>
                            <div class="col-6 d-flex fs-5 fw-normal badge btnCall me-3 mt-2" v-for="genre in user.genres">
                                {{ genre.name }}
                            </div>
                        </div>

                        <!-- regione. -->
                        <div class="col-4 d-md-flex flex-md-column align-items-md-center">
                            <h3>Regione</h3>
                            <div class="pt-2">
                                <font-awesome-icon class="fs-4" icon="fa-solid fa-location-dot" style="color: #001580;" />
                                <span class="ms-2 fs-5">{{ user.region }}</span>
                            </div>
                        </div>

                        <!-- chachet. -->
                        <div class="col-4 d-md-flex flex-md-column align-items-md-center">
                            <h3>Cachet</h3>
                            <div class="fs-4">
                                <p>€ {{ user.cachet }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- riga con nome/ stelline. -->
            <div class="row">
                <div class="col-4">
                    <!-- nome musicista. -->
                    <div class="col-12 pt-3 d-none d-sm-inline">
                        <p class="fs-2 cltitle">{{ user.name }} {{ user.surname }}</p>
                    </div>

                    <!-- stelline. -->
                    <div class="col-12">
                        <StarItems
                            :itemRate="(user.votes.length > 0 ? user.votes.reduce((total, vote) => total + vote.vote, 0) / user.votes.length : 0)" />
                    </div>
                </div>
            </div>

            <!-- riga informazioni sul musicista. -->
            <div class="row d-md-none">
                <!-- genere. -->
                <div class="col-12 pt-4 ">
                    <h3>Generi</h3>
                    <div class="fs-5 fw-normal badge btnCall me-3 mt-2" v-for="genre in user.genres">
                        {{ genre.name }}
                    </div>
                </div>

                <div class="col-12 pt-4">
                    <h3>Regione</h3>
                    <div class="pt-2">
                        <font-awesome-icon class="fs-4" icon="fa-solid fa-location-dot" style="color: #001580;" />
                        <span class="ms-2 fs-5">{{ user.region }}</span>
                    </div>
                </div>

                <div class="col-12 pt-4">
                    <h3>Cachet</h3>
                    <div class="fs-4">
                        <p>€ {{ user.cachet }}</p>
                    </div>
                </div>
            </div>





            <!-- descrizione. -->
            <!-- <div class="col-7 col-md-12 d-flex flex-column align-items-center">
                            
                            <div class="col-12 text-center">
                                <p class="fs-2 cltitle">Descrizione</p>
                            </div>
                            
                            <div class="col-10 col-sm-7 d-flex text-center fs-4 pt-4">
                                <p>{{ user.experience }} </p>
                            </div>
                        </div> -->

            <!-- <div class="row mt-5">
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
                </div> -->
                <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'recensioni'"
                            :class="{ 'selected': selectedSection === 'recensioni' }">
                            Recensioni
                        </a>



            <!-- <div class="row mt-5"> -->
            <!-- <div class="col-12">
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
                        </div> -->





            <!-- RECENSIONI -->
            <div v-if="selectedSection === 'recensioni'">
                            <div class="d-flex">
                                <div class="d-flex flex-column w-100">
                                    <AppReview />
                                </div>
                                <div class="w-100">
                                    <AppVote />
                                </div>
                            </div>
                        </div>

            <!-- MESSAGGI -->
            <!-- <div v-else-if="selectedSection === 'Messaggi'">
                            <div>
                                <AppMessage />
                            </div>
                        </div> -->
            <!-- </div>
                </div> -->
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
.btnCall {
    background-color: #14094e98;
}

.btnWhats {
    background-color: #70539e
}

.cltitle {
    color: rgb(15, 4, 54);
}
</style>