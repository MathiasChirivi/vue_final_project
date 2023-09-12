<script>
import axios from 'axios';
import { store } from '../../store';
import StarItems from '../StarItems.vue'

export default {
    name: 'AppMusicisti',
    components: {
        StarItems,
    },
    data() {
        return {

            store,
            // caricamento dati
            loading: false,
            loadingError: false,
            // per gestire carosello
            currentPage: 0,
            totalPages: 0,
            genres: [],
            users: [],
            minReviewCount: null,
            choosenGenre: "",
            currentPage: 1,
            selectedAverageVote: "0",
            selectedFilter: null,


            // poupup
            isPopupVisible: false,

        }
    },
    props: {
        genre: String
    },
    methods: {

        // calcolo media voto 

        calculateAverageVote(user) {
            if (user.votes.length === 0) {
                return 'N/A';
            }

            const totalVotes = user.votes.reduce((total, vote) => total + vote.vote, 0);
            const averageVote = totalVotes / user.votes.length;
            return averageVote.toFixed(2); // Mostra il voto medio con due decimali
        },

        setGenre(clickedGenre) {
            if (this.selectedFilter === 'vote') {
                console.log("selezionato voto")
                if (this.selectedAverageVote === 0) {
                    if (clickedGenre === this.choosenGenre) {
                        this.choosenGenre = "";
                        this.getUsersFirstPage();
                    } else {
                        this.choosenGenre = clickedGenre;
                        this.getUsersByGenre(clickedGenre);
                    }
                } else {
                    if (clickedGenre === this.choosenGenre) {
                        this.choosenGenre = "";
                    } else {
                        this.choosenGenre = clickedGenre;
                    }
                    this.searchUsersByAverageVote();
                }

            } else if (this.selectedFilter === 'reviews') {
                console.log("selezionato reviews")
                if (this.minReviewCount == null || this.minReviewCount == "") {
                    console.log("review voto")
                    if (clickedGenre === this.choosenGenre) {
                        this.choosenGenre = "";
                        this.getUsersFirstPage();
                    } else {
                        this.choosenGenre = clickedGenre;
                        this.getUsersByGenre(clickedGenre);
                    }
                } else {
                    console.log("review pieno")
                    console.log(this.minReviewCount)
                    if (clickedGenre === this.choosenGenre) {
                        this.choosenGenre = "";
                    } else {
                        this.choosenGenre = clickedGenre;
                    }
                    this.searchUsersByReviewCount();
                }

            } else {
                console.log("selezionato nu cazz")
                if (clickedGenre === this.choosenGenre) {
                    this.choosenGenre = "";
                    this.getUsersFirstPage();
                } else {
                    this.choosenGenre = clickedGenre;
                    this.getUsersByGenre(clickedGenre);
                }

            }

        },

        resetVote() {
            if (this.choosenGenre === "") {
                this.getUsersFirstPage();
            } else {
                this.getUsersByGenre(this.choosenGenre);
            }
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

        searchUsersByAverageVote() {
            // Esegui la ricerca basata sul voto medio (this.selectedAverageVote)
            // Chiamando la tua API con il valore selezionato
            // Fai la chiamata API con il voto medio selezionato
            if (this.choosenGenre === "") {
                axios.get(this.store.apiUrl + `users/search/${this.selectedAverageVote}`)
                    .then((response) => {
                        // Aggiorna i risultati utenti con i nuovi dati ricevuti dalla chiamata API
                        this.users = response.data.results.data;
                        this.currentPage = response.data.results.current_page;
                        this.totalPages = response.data.results.last_page;
                    })
                    .catch((err) => {
                        this.loading = false;
                        this.loadingError = err.message;
                        this.$router.push({ name: 'error', params: { code: 404 } })
                    });
            } else {
                //contatta l'Api nel nuvovo metodo che prima filtra per genere sleezionato e poi per il voto medio selezionato 
                // http://localhost:8000/api/users/search/genre/Rock/average_vote/3
                axios.get(this.store.apiUrl + `users/search/genre/${this.choosenGenre}/average_vote/${this.selectedAverageVote}`)
                    .then((response) => {
                        // Aggiorna i risultati utenti con i nuovi dati ricevuti dalla chiamata API
                        this.users = response.data.results.data;
                        this.currentPage = response.data.results.current_page;
                        this.totalPages = response.data.results.last_page;
                    })
                    .catch((err) => {
                        this.loading = false;
                        this.loadingError = err.message;
                        this.$router.push({ name: 'error', params: { code: 404 } })
                    });
            }

        },

        onMinReviewCountInput() {

            this.searchUsersByReviewCount();

        },

        searchUsersByReviewCount() {
            // Verifica se l'input è vuoto o nullo

            if (this.choosenGenre === "") {
                if (this.minReviewCount !== null && this.minReviewCount !== "") {
                    axios.get(this.store.apiUrl + `users/search/review/${this.minReviewCount}`).then(response => {
                        this.users = response.data.results.data;
                        this.currentPage = response.data.results.current_page;
                        this.totalPages = response.data.results.last_page;
                        this.loading = false;
                    }).catch(err => {
                        this.loading = false;
                        this.loadingError = err.message;
                        this.$router.push({ name: 'error', params: { code: 404 } });
                    });
                } else {
                    this.minReviewCount = null;
                    this.getUsersFirstPage();
                }

            } else {
                //contatta l'Api nel nuvovo metodo che prima filtra per genere sleezionato e poi per recensioni minime
                // http://localhost:8000/api/users/search/genre/classical/reviews/1
                if (this.minReviewCount !== null && this.minReviewCount !== "") {
                    axios.get(this.store.apiUrl + `users/search/genre/${this.choosenGenre}/reviews/${this.minReviewCount}`)
                        .then((response) => {
                            // Aggiorna i risultati utenti con i nuovi dati ricevuti dalla chiamata API
                            this.users = response.data.results.data;
                            this.currentPage = response.data.results.current_page;
                            this.totalPages = response.data.results.last_page;
                        })
                        .catch((err) => {
                            this.loading = false;
                            this.loadingError = err.message;
                            this.$router.push({ name: 'error', params: { code: 404 } })
                        });
                } else {
                    this.minReviewCount = null;
                    this.getUsersByGenre(this.choosenGenre);
                }


            }

        },


        getUsersByGenre(genre) {

            this.loading = true;
            axios.get(this.store.apiUrl + `users/genre/${genre}`).then(response => {
                this.users = response.data.results.data;
                this.currentPage = response.data.results.current_page
                this.totalPages = response.data.results.last_page

                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'error', params: { code: 404 } })
            });
        },

        //calcolo media voti e bottone per orderby

        getUsersFirstPage() {
            this.loading = true;
            axios.get(this.store.apiUrl + this.store.usersApi).then(response => {
                this.users = response.data.results.data;
                this.currentPage = response.data.results.current_page
                this.totalPages = response.data.results.last_page

                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'error', params: { code: 404 } })
            })
        },
        getUsersPage(pageNumber) {
            if (pageNumber && pageNumber > 0 && pageNumber <= this.totalPages) {
                let config = {
                    params: {
                        page: pageNumber
                    }
                };

                this.loading = true;
                axios.get(this.store.apiUrl + this.store.usersApi, config).then(response => {
                    this.users = response.data.results.data;
                    this.currentPage = response.data.results.current_page
                    this.totalPages = response.data.results.last_page

                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.loadingError = err.message;
                    this.$router.push({ name: 'error', params: { code: 404 } })
                });
            } else {
                console.error("non ci sono piu pagine");
            }
        },
        getUsersPrevPage() {
            this.getUsersPage(this.currentPage - 1);
        },
        getUsersNextPage() {
            this.getUsersPage(this.currentPage + 1);
        },
    },

    // Ricerca Utenti
    computed: {

    },
    mounted() {
        this.getGenresArray()
        this.getUsersFirstPage();
        const genre = this.$route.params.genre; // Ottieni il parametro "genre" dall'URL
        if (genre) {
            // Qui puoi usare "genre" per eseguire la ricerca in base al genere
            this.getUsersByGenre(genre); // Chiama il metodo per la ricerca
            this.choosenGenre = genre
        }
    }
}
</script>


<template>
    <div class="container pb-4">

        <!-- INPUT NUMBER PER FILTRARE PER N DI RECENSIONI. -->
        <!-- <div class="row">
            <div class="col-12">

                <div class="form-controls col-12">
                    <input type="number" required="">
                    <label>
                        <span style="transition-delay:0ms">F</span>
                        <span style="transition-delay:50ms">i</span>
                        <span style="transition-delay:100ms">l</span>
                        <span style="transition-delay:150ms">t</span>
                        <span style="transition-delay:200ms">r</span>
                        <span style="transition-delay:250ms">a</span>
                        <span style="transition-delay:300ms"> </span>
                        <span style="transition-delay:300ms">P</span>
                        <span style="transition-delay:350ms">e</span>
                        <span style="transition-delay:350ms">r</span>
                        <span style="transition-delay:300ms"> </span>
                        <span style="transition-delay:300ms">N</span>
                        <span style="transition-delay:300ms">u</span>
                        <span style="transition-delay:300ms">m</span>
                        <span style="transition-delay:300ms">e</span>
                        <span style="transition-delay:300ms">r</span>
                        <span style="transition-delay:300ms">o</span>
                        <span style="transition-delay:300ms"> </span>
                        <span style="transition-delay:300ms">R</span>
                        <span style="transition-delay:300ms">e</span>
                        <span style="transition-delay:300ms">c</span>
                        <span style="transition-delay:300ms">e</span>
                        <span style="transition-delay:300ms">n</span>
                        <span style="transition-delay:300ms">s</span>
                        <span style="transition-delay:300ms">i</span>
                        <span style="transition-delay:300ms">o</span>
                        <span style="transition-delay:300ms">n</span>
                        <span style="transition-delay:300ms">i</span>
                    </label>
                </div>

            </div>
        </div> -->


        <!-- filtro per genere musicali. -->
        <div class="row justify-content-center border-bottom d-none d-sm-block">
            <div class="col-8 col-sm-12">
                <div
                    class="col-12  rounded-4 d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between p-2 p-sm-3">
                    <button v-for="genre in genres" class="btn badge text-white  col-sm-1  "
                        v-bind:class="choosenGenre === genre.name ? 'bg-danger' : ''" @click="setGenre(genre.name)">{{
                            genre.name }}
                    </button>
                </div>
            </div>
        </div>

        <!-- filto per genere musicale phone. -->
        <div class="row d-sm-none justify-content-center">
            <div class="col-8">
                <h6 class="text-white">filtra per genere</h6>
            </div>

            <div class="col-8 d-flex justify-content-center ">
                <select class="form-select p-1" v-model="choosenGenre" @change="updateGenre">
                    <option v-for="genre in genres" :key="genre.name" :value="genre.name">{{ genre.name }}</option>
                </select>
            </div>
        </div>

        <!-- filtro per ordine alfabetico,recensioni,voti. -->
        <div class="row justify-content-center pt-4 d-lg-block">
            <div class="col-8 col-sm-12 d-flex justify-content-sm-center border-bottom">
                <div
                    class="col-sm-12 col-12-md rounded-4 d-flex flex-column flex-lg-row align-items-center">
                    <div class="col-12 col-xl-6">
                        <div class="col-12 col-xl-4 d-flex d-lg-none d-xl-flex me-3">
                            <h6 class="text-white">Filtra Per:</h6>
                        </div>
                        <div class="my-3">
                            <select name="" id="" v-model="selectedFilter">
                                <option value="reviews">Numero di recensioni</option>
                                <option value="vote">Voto Medio Minimo</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="selectedFilter === 'reviews'" class="col-12 col-xl-6">
                        <label class="text-white me-3" for="minReviewCount">Inserisci il numero minimo di recensioni:</label>
                        <input type="number" id="minReviewCount" v-model="minReviewCount" @input="onMinReviewCountInput" />
                    </div>
                    <!-- <div>
                        <label for="averageVote">Seleziona il voto medio:</label>
                        <select id="averageVote" v-model="selectedAverageVote" @change="searchUsersByAverageVote">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div> -->
                    <div v-if="selectedFilter === 'vote'" class="d-flex flex-wrap">
                        <div class="col-12 d-flex flex-wrap lign-items-center">
                            <label class="text-white me-3 my-3" for="rating">Seleziona il voto medio:</label>
                            <div v-if="selectedFilter === 'vote'" class="rating">
                                <input v-for="rating in [1, 2, 3, 4, 5]" :key="rating" :value="rating" name="rating"
                                    :id="'star' + rating" type="radio" v-model="selectedAverageVote"
                                    @change="searchUsersByAverageVote">
                                <label v-for="rating in [1, 2, 3, 4, 5]" :key="rating" :for="'star' + rating"
                                    :class="{ 'selected': rating <= selectedAverageVote }"></label>
                            </div>
                        </div>

                        <!-- radio no voto medio. -->
                        <div class="col-12 d-flex align-items-center">
                            <label class="text-white me-3" for="no-rating">Senza voto medio</label>
                            <input value="0" name="no-rating" id="no-rating" type="radio" class="ms-3"
                                v-model="selectedAverageVote" @click="resetVote()">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- contenitore card musicisti. -->
    <div class="container pt-4">

        <!-- CARICAMNETO DATI IN CORSO. -->
        <div class="d-flex justify-content-center">
            <h3 v-if="loading">

                <section class="dots-container">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </section>

            </h3>
            <h3 v-if="loadingError"> {{ loadingError }} </h3>
        </div>


        <div class="d-flex flex-wrap gap-3 justify-content-center align-items-center">
            <div v-for="user in users" :key="user.id">
                <!-- Mostra i dettagli del musicista della search qui -->

                <div class="card-container">
                    <span v-if="user.has_active_sponsorship === 1" class="pro">PRO</span>

                    <img v-if="user.img" class="round" :src="store.storageUrl + user.img" />
                    <img v-else class="round"
                        src="https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4=" />
                    <h3>{{ user.name }} {{ user.surname }}</h3>
                    <!-- descrizione. -->
                    <h6 class="text-truncate ms-3 me-3 pt-3 pb-3">{{ user.experience }}</h6>

                    <!-- voto medio e recensioni. -->
                    <StarItems class="me-1 mt-2 d-flex justify-content-center"
                        :itemRate="parseFloat(calculateAverageVote(user))" />
                    <p>Numero recensioni: ({{ user.reviews.length }})</p>
                    <!-- regione e cache. -->
                    <div class="row pb-3">
                        <div class="col-6 card-text text-center"><font-awesome-icon icon="fa-solid fa-location-dot "
                                class="me-1" style="color: white;" /> {{ user.region }}
                        </div>
                        <div class="col-6 card-text text-center"><font-awesome-icon icon="fa-solid fa-money-bill"
                                class="me-1" style="color: white;" /> {{ user.cachet }}
                        </div>
                    </div>

                    <!-- bottone dettagli musicista. -->
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center box-3">
                            <router-link
                                class="text-decoration-none my-3 btnScopri btn-1 d-flex justify-content-center m-0 align-items-center"
                                :to="{ name: 'SingleMusicista', params: { id: user.id } }">
                                <svg>
                                    <rect x="0" y="0" fill="none" width="100%" height="100%" />
                                </svg>
                                Scopri Musicista
                            </router-link>
                        </div>
                    </div>

                    <!-- genere. -->
                    <div class="skills">
                        <h6>Genere</h6>
                        <font-awesome-icon icon="fa-solid fa-music" class="me-2" style="color: white; padding-top: 5px;" />
                        {{ user.genres.map(genre =>
                            genre.name).join(', ') }}
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="d-flex justify-content-center gap-4 mt-5">
        <a class="btn" @click="getUsersPrevPage">
            <span class="ms-3">
                <font-awesome-icon icon="fa-solid fa-arrow-left" style="color: white;" />
            </span>
        </a>
        <a class="btn text-black rounded-circle text-white" :class="{ 'bg_violet': pageNumber === currentPage }"
            @click="getUsersPage(pageNumber)" v-for="pageNumber in  totalPages">{{
                pageNumber }}</a>
        <a class="btn" @click="getUsersNextPage">
            <span class="me-3">
                <font-awesome-icon icon="fa-solid fa-arrow-right" style="color: white;" />
            </span>
        </a>
    </div>
</template>


<style scoped lang="scss">
.bg_violet {
    background-color: #8999da;
}

.card {
    background-color: #ffffff;
    transition: all 0.5s;

    box-shadow: 12px 17px 51px rgba(194, 191, 191, 0.603);
    backdrop-filter: blur(6px);
    background: #ffffffb9;
}

.card:hover {
    transform: scale(1.05);
}

.card:active {
    transform: scale(0.95) rotateZ(1.7deg);
}

* {
    box-sizing: border-box;
}

body {
    background-color: #28223F;
    font-family: Montserrat, sans-serif;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    min-height: 100vh;
    margin: 0;
}

h3 {
    margin: 10px 0;
}

h6 {
    margin: 5px 0;
    text-transform: uppercase;
}

p {
    font-size: 14px;
    line-height: 21px;
}

.card-container {
    background-color: #231E39;
    border-radius: 5px;
    box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
    color: #B3B8CD;
    padding-top: 30px;
    position: relative;
    width: 320px;
    max-width: 100%;
    text-align: center;
}

.card-container .pro {
    color: #2b2449;
    background-color: #03BFCB;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    padding: 3px 7px;
    position: absolute;
    top: 25px;
    left: 20px;
}

.card-container .round {
    border: 1px solid #03BFCB;
    border-radius: 50%;
    padding: 7px;
    width: 75%;
}

.skills {
    background-color: #1F1A36;
    text-align: left;
    padding: 15px;
    margin-top: 25px;
}

.skills ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.skills ul li {
    border: 1px solid #2D2747;
    border-radius: 2px;
    display: inline-block;
    font-size: 12px;
    margin: 0 7px 7px 0;
    padding: 7px;
}

.btnScopri {
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    max-width: 160px;
    position: relative;
    text-decoration: none;
    width: 100%;
    height: 75%;
}

.btn-1 {
    font-weight: 100;

    svg {
        height: 45px;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }

    rect {
        fill: none;
        stroke: #fff;
        stroke-width: 2;
        stroke-dasharray: 422, 0;
        transition: all 0.35s linear;
    }
}

.btn-1:hover {
    letter-spacing: 1px;

    rect {
        stroke-width: 5;
        stroke-dasharray: 15, 310;
        stroke-dashoffset: 48;
        transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
    }
}

// CARICAMENTO DATI.
.dots-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

.dot {
    height: 20px;
    width: 20px;
    margin-right: 10px;
    border-radius: 10px;
    background-color: #b3d4fc;
    animation: pulse 1.5s infinite ease-in-out;
}

.dot:last-child {
    margin-right: 0;
}

.dot:nth-child(1) {
    animation-delay: -0.3s;
}

.dot:nth-child(2) {
    animation-delay: -0.1s;
}

.dot:nth-child(3) {
    animation-delay: 0.1s;
}

@keyframes pulse {
    0% {
        transform: scale(0.8);
        background-color: #b3d4fc;
        box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }

    50% {
        transform: scale(1.2);
        background-color: #6793fb;
        box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
    }

    100% {
        transform: scale(0.8);
        background-color: #b3d4fc;
        box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }
}

// filtro per voto medio(stelline)
.rating {
    display: inline-block;
}

.rating input {
    display: none;
}

.rating label {
    float: left;
    cursor: pointer;
    color: #f8f7f7;
    transition: color 0.3s;
}

.rating label:before {
    content: '\2605';
    font-size: 30px;
}

/* Rimuovi il selettore generale e usa uno specifico per ciascun input radio */
.rating input:checked+label {
    color: #113996;
    transition: color 0.3s;
}

.rating .selected {
    color:#a79ff5 ; 
    transition: color 0.3s;
}


/* Rimuovi il colore dalle stelle precedenti in caso di unhover */
.rating input:checked~label:hover {
    color: #32387c;
    transition: color 0.3s;
}
</style>