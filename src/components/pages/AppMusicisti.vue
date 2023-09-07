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
            users: [],
            // search
            searchQuery: '',
            filteredUsers: [],
            orderBy: 'null',
            //impaginazione frontend
            resultsPerPage: 6,
            currentPage: 1,
            // gestione ricerca per genere
            uniqueGenres: [],
            genres: [],
            choosenGenre: store.genreFromHome,
            // poupup
            isPopupVisible: false,

        }
    },
    methods: {
        //costruzione array genres
        extractUniqueGenres() {
            const uniqueGenres = [];
            this.users.forEach((user) => {
                user.genres.forEach((genre) => {
                    const isGenreUnique = !uniqueGenres.find((uniqueGenre) => uniqueGenre.id === genre.id);
                    if (isGenreUnique) {
                        uniqueGenres.push(genre);
                    }
                });
            });
            this.uniqueGenres = uniqueGenres;
            this.genres = uniqueGenres;
        },
        setGenre(clickedGenre) {
            this.choosenGenre = clickedGenre;
        },

        //calcolo media voti e bottone per orderby

        calculateAverageVote(user) {
            if (user.votes.length === 0) {
                return 'N/A';
            }

            const totalVotes = user.votes.reduce((total, vote) => total + vote.vote, 0);
            const averageVote = totalVotes / user.votes.length;
            return averageVote.toFixed(2); // Mostra il voto medio con due decimali
        },

        orderingSet(orderBy) {
            this.orderBy = orderBy;
        },
        // CAROSELLO MUSICISTI 
        getUsersFirstPage() {
            this.loading = true;
            axios.get(this.store.apiUrl + this.store.usersApi).then(response => {
                this.users = response.data.results;
                this.filteredUsers = response.data.results;

                this.extractUniqueGenres();

                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'error', params: { code: 404 } })
            })
        },
        getUsersPage(pageNumber) {
            if (pageNumber > 0 && pageNumber <= Math.ceil(this.filteredUsers.length / this.resultsPerPage)) {
                this.currentPage = pageNumber;

                // Calcola l'indice di inizio e fine per la pagina corrente
                const startIndex = (this.currentPage - 1) * this.resultsPerPage;
                const endIndex = startIndex + this.resultsPerPage;

                // Ottieni gli utenti per la pagina corrente
                this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);

                this.loading = false;
            }
            else {
                console.error("non ci sono piu pagine");
            }
        },
        getUsersPrevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            } else {
                console.error("non ci sono piu pagine");
            }
        },
        getUsersNextPage() {
            if (this.currentPage < Math.ceil(this.filteredUsers.length / this.resultsPerPage)) {
                this.currentPage++;
            } else {
                console.error("non ci sono piu pagine");
            }
            console.log(this.genres)
        },

        // SEARCH
        searchUsers() {
            this.filteredUsers = this.users.filter(user => {
                const fullName = user.name + ' ' + user.surname;
                return fullName.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
            this.currentPage = 1; // Reset to first page after new search

        },
        updateGenre() {
            // Chiamare la funzione setGenre con il genere selezionato
            this.setGenre(this.choosenGenre);
        },
    },

    // Ricerca Utenti
    computed: {
        paginatedFilteredUsers() {
            const startIndex = (this.currentPage - 1) * this.resultsPerPage;
            const endIndex = startIndex + this.resultsPerPage;

            // Aggiungi questa parte per filtrare in base al genere scelto nella route
            if (this.choosenGenre != "") {
                // Filtra gli utenti che hanno il genere selezionato
                this.filteredUsers = this.users.filter((user) => {
                    return user.genres.some((genre) => genre.name === this.choosenGenre);
                });
            } else {
                // Nessun genere specifico selezionato, utilizza tutti gli utenti
                this.filteredUsers = this.users.slice(); // Copia tutti gli utenti
            }

            // Rimani con il resto del tuo metodo
            this.filteredUsers.sort((a, b) => {
                if (this.orderBy === 'reviews') {
                    if (a.reviews.length !== b.reviews.length) {
                        return b.reviews.length - a.reviews.length;
                    } else {
                        return a.name.localeCompare(b.name);
                    }
                } else if (this.orderBy === 'votes') {
                    const avgVoteA = a.votes.length > 0 ? a.votes.reduce((total, vote) => total + vote.vote, 0) / a.votes.length : 0;
                    const avgVoteB = b.votes.length > 0 ? b.votes.reduce((total, vote) => total + vote.vote, 0) / b.votes.length : 0;

                    // Ordina in base al voto medio
                    if (avgVoteA !== avgVoteB) {
                        return avgVoteB - avgVoteA; // Ordine decrescente per voto medio
                    } else {
                        return a.name.localeCompare(b.name);
                    }
                } else {
                    // Ordinamento di base (ordine alfabetico per nome)
                    return a.name.localeCompare(b.name);
                }
            });

            // Restituisci solo gli utenti della pagina corrente
            return this.filteredUsers.slice(startIndex, endIndex);
        },

    },
    mounted() {
        this.getUsersFirstPage();
        this.filteredUsers = this.users;
    }
}
</script>


<template>
    <div class="mb-5 mt-4">
        <h3 v-if="loading">
            <div class="spinner"></div>
            Caricameto dati
        </h3>
        <h3 v-if="loadingError"> {{ loadingError }} </h3>
    </div>

    <div class="container pb-4">

        <!-- filtro per genere musicali. -->
        <div class="row justify-content-center border-bottom d-none d-sm-block">
            <div class="col-8 col-sm-12">
                <div
                    class="col-12  rounded-4 d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between p-2 p-sm-3">
                    <button v-for="genre in genres" class="btn badge text-white  col-sm-1  "
                        v-bind:class="choosenGenre === genre.name ? 'bg_cl_primary' : ''" @click="setGenre(genre.name)">{{
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
        <div class="row justify-content-center pt-4 d-sm-block">
            <div class="col-8 col-sm-12 d-flex justify-content-sm-center border-bottom">
                <div class="col-12 col-sm-8 col-12-md rounded-4 d-flex flex-column flex-sm-row  justify-content-sm-around ">
                    <div class="col-4 d-flex justify-content-center d-sm-none">
                        <h6 class="text-white">Filtra Per:</h6>
                    </div>
                    <button class="btn badge text-white rounded-3 pt-2" v-bind:class="orderBy === 'null' ? '' : ''"
                        @click="orderingSet('null')">Ordine
                        Alfabetico</button>
                    <button class="btn badge text-white rounded-2 pt-2" v-bind:class="orderBy === 'reviews' ? '' : ''"
                        @click="orderingSet('reviews')">Più
                        Recensioni</button>
                    <button class="btn badge text-white rounded-2 pt-2 pb-2 pb-sm-0"
                        v-bind:class="orderBy === 'votes' ? '' : ''" @click="orderingSet('votes')">Più Voti</button>
                </div>
            </div>
        </div>
    </div>

    <!-- contenitore card musicisti. -->
    <div class="container pt-4">
        <div class="d-flex flex-wrap gap-3 justify-content-center align-items-center">
            <div v-for="user in paginatedFilteredUsers" :key="user.id">
                <!-- Mostra i dettagli del musicista della search qui -->
                <div class="card-container">
                    <span class="pro">PRO</span>
                    <img v-if="user.img" class="round" :src="store.storageUrl + user.img" />
                    <img v-else class="round"
                        src="https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4=" />
                    <h3>{{ user.name }} {{ user.surname }}</h3>
                    <!-- descrizione. -->
                    <h6 class="text-truncate ms-3 me-3">{{ user.experience }}</h6>

                    <!-- voto medio e recensioni. -->
                    <StarItems class="me-1 mt-2 d-flex justify-content-center"
                        :itemRate="parseFloat(calculateAverageVote(user))" />
                    <p>Numero recensioni: ({{ user.reviews.length }})</p>
                    <!-- regione e cache. -->
                    <div class="row">
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
                            <router-link class="text-decoration-none my-3 btnScopri btn-1 d-flex justify-content-center m-0 align-items-center" :to="{ name: 'SingleMusicista', params: { id: user.id } }">
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
            @click="getUsersPage(pageNumber)" v-for="pageNumber in  Math.ceil(filteredUsers.length / resultsPerPage)">{{
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
    color: #231E39;
    background-color: #FEBB0B;
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

.btnScopri{
  color: #fff;
  cursor: pointer;
  font-size:16px;
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
</style>