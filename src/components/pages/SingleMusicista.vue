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
                <div class="row pb-4">
                    <div class="col-12">
                        <a class="text-decoration-none fs-4">
                            <router-link class="text-decoration-none textLink text-white" :to="{ name: 'Musicisti' }">
                                <font-awesome-icon icon="fa-solid fa-arrow-left" style="color: #8273c9;" />
                                <!-- Torna ai Musicisti -->
                            </router-link>
                        </a>
                    </div>
                </div>

                <!-- nome da phone. -->
                <div class="row d-sm-none pt-3 pt-sm-0">
                    <div class="col-12">
                        <p class="fs-2 text-white ps-1">{{ user.name }} {{ user.surname }}</p>
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


                        <!-- INFORMAZIONE DA PC. -->
                        <div class="d-none d-lg-flex col-8 flexWrap">

                            <!-- informazioni. -->
                            <div class="col-12 col-12 d-flex justify-content-center">
                                <h3 class="text-white borderBottom fs-2">INFORMAZIONI</h3>
                            </div>
                            <!-- generi. -->
                            <div class="col-4 d-md-flex flex-md-column align-items-md-center pt-4">
                                <h3 class="text-white">Generi</h3>
                                <div class="col-6 d-flex fs-5 fw-normal badge btnCall me-3 mt-2"
                                    v-for="genre in user.genres">
                                    {{ genre.name }}
                                </div>
                            </div>

                            <!-- regione. -->
                            <div class="col-4 d-md-flex flex-md-column align-items-md-center pt-4">
                                <h3 class="text-white">Regione</h3>
                                <div class="pt-2 text-white">
                                    <font-awesome-icon class="fs-4" icon="fa-solid fa-location-dot"
                                        style="color: #959dc4;" />
                                    <span class="ms-2 fs-5">{{ user.region }}</span>
                                </div>
                            </div>

                            <!-- chachet. -->
                            <div class="col-4 d-md-flex flex-md-column align-items-md-center pt-4">
                                <h3 class="text-white">Cachet</h3>
                                <div class="fs-4 text-white">
                                    <p>€ {{ user.cachet }}</p>
                                </div>
                            </div>

                            <!-- descrisìzione. -->
                            <div class="col-12 d-flex justify-content-center pt-5">
                                <h3 class="text-white borderBottom fs-2">DESCRIZIONE</h3>
                            </div>

                            <!-- testo descrizione. -->
                            <div class="col-12 pt-4 ps-4">
                                <p class="text-center text-white ps-5">{{ user.experience }}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- riga con nome/ stelline. -->
                <div class="row">

                    <div class="col-4">
                        <!-- nome musicista. -->
                        <div class="col-12 pt-3 d-none d-sm-inline">
                            <p class="fs-2 cltitle text-white">{{ user.name }} {{ user.surname }}</p>
                        </div>

                        <!-- stelline. -->
                        <div class="col-12 pt-2">
                            <StarItems
                                :itemRate="(user.votes.length > 0 ? user.votes.reduce((total, vote) => total + vote.vote, 0) / user.votes.length : 0)" />
                        </div>
                    </div>

                    <!-- COLONNA DETTAGLI-RECENSIONE-VOTO DA PC. -->
                    <div class="col-8 d-none d-lg-flex flexWrap">

                        <div class="col-12 text-center pt-5">
                            <h3 class="text-white borderBottom ">LASCIA UNA RECENSIONE O UN MESSAGGIO AL MUSICISTA</h3>
                        </div>

                        <!-- messaggi. -->
                        <div class="col-4 text-center pt-4">
                            <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'Messaggi'"
                                :class="{ 'selected': selectedSection === 'Messaggi' }">
                                Messaggi
                            </a>
                        </div>
                       

                        <!-- recensioni. -->
                        <div class="col-4 text-center pt-4">
                            <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'recensioni'"
                                :class="{ 'selected': selectedSection === 'recensioni' }">
                                Recensioni
                            </a>
                        </div>

                        <!-- dettagli. -->
                         <div class="col-4 text-center pt-4">
                            <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'dettagli'"
                                :class="{ 'selected': selectedSection === 'dettagli' }">
                                Dettagli
                            </a>
                        </div>
                    </div>
                </div>

                <!-- riga con recensioni/voto/dettagli da PHONE E TABLET. -->
                <div class="row pt-5 d-lg-none">
                    <div class="col-12 d-flex ">

                        <!-- dettagli. -->
                        <div class="col-4">
                            <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'dettagli'"
                                :class="{ 'selected': selectedSection === 'dettagli' }">
                                Dettagli
                            </a>
                        </div>

                        <!-- recensioni. -->
                        <div class="col-4">
                            <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'recensioni'"
                                :class="{ 'selected': selectedSection === 'recensioni' }">
                                Recensioni
                            </a>
                        </div>

                        <!-- messaggi. -->
                        <div class="col-4">
                            <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'Messaggi'"
                                :class="{ 'selected': selectedSection === 'Messaggi' }">
                                Messaggi
                            </a>
                        </div>
                    </div>
                </div>

                <!-- riga informazioni sul musicista da PHONE E TABLET -->
                <div class="row d-lg-none pt-4">

                    <!-- informazioni. -->
                    <div class="col-10">
                        <h2 class="text-white pt-4 borderBottom">INFORMAZIONI</h2>
                    </div>


                    <!-- genere. -->
                    <div class="col-12 pt-4 ">
                        <h3 class="text-white">Generi</h3>
                        <div class="fs-5 fw-normal badge btnCall me-3 mt-2" v-for="genre in user.genres">
                            {{ genre.name }}
                        </div>
                    </div>

                    <div class="col-12 pt-4">
                        <h3 class="text-white">Regione</h3>
                        <div class="pt-2 text-white">
                            <font-awesome-icon class="fs-4" icon="fa-solid fa-location-dot" style="color: #6b76aa;" />
                            <span class="ms-2 fs-5">{{ user.region }}</span>
                        </div>
                    </div>

                    <div class="col-12 pt-4">
                        <h3 class="text-white">Cachet</h3>
                        <div class="fs-4 text-white">
                            <p>€ {{ user.cachet }}</p>
                        </div>
                    </div>

                    <div class="col-10">
                        <h2 class="text-white pt-4 borderBottom">DESCRIZIONE</h2>
                    </div>

                    <div class="col-10 text-white pt-3">
                        <p>{{ user.experience }}</p>
                    </div>
                </div>
                
                
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
                <div v-else-if="selectedSection === 'Messaggi'">
                    <div>
                        <AppMessage />
                    </div>
                </div>
                
            
                
                
            </div>

        </div>
                <h3 v-else-if="loading">
                    <div class="spinner vh-100">Caricameto dati</div>
                </h3>
                <div v-else>
                    <h3> {{ loadingError }} </h3>
                </div>
    </section>
</template>




<style lang="scss" scoped>
.btnCall {
    background-color: #a79ddb98;
}

.btnWhats {
    background-color: #70539e
}

.cltitle {
    color: rgb(15, 4, 54);
}

.borderBottom {
    border-bottom: 1px solid white;
}

.flexWrap {
    flex-wrap: wrap;
}

a:link,
a:visited {
    text-decoration: underline;
    color: #a689dd;
    background-color: transparent;
}

a:hover,
a:active {
    text-decoration: underline overline;
    color: #dddada;
}</style>