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
                    <button class="btn badge text-white rounded-2 pt-2 pb-2 pb-sm-0" v-bind:class="orderBy === 'votes' ? '' : ''"
                        @click="orderingSet('votes')">Più Voti</button>
                </div>
            </div>
        </div>
    </div>

    <!-- contenitore card musicisti. -->
    <div class="container pt-4">
        <div class="d-flex flex-wrap gap-3 justify-content-center align-items-center">
            <div v-for="user in paginatedFilteredUsers" :key="user.id">
                <!-- Mostra i dettagli del musicista della search qui -->
                <div class="card mb-4 me-4" style="width:20rem;">
                    <img v-if="user.img" class="card-img-top" :src="store.storageUrl + user.img" />
                    <img v-else class="card-img-top"
                        src="https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4=" />
                    <div class="card-body">
                        <h5 class="card-title">{{ user.name }} {{ user.surname }}</h5>

                        <!-- descrizione. -->
                        <div class="row pt-2 pb-3">
                            <div class="col-12">
                                <div class="card-text text-truncate">{{ user.experience }}</div>
                            </div>
                        </div>


                        <!-- voto medio e recensioni. -->
                        <div class="row mb-3">
                            <div class="col-12 d-flex align-items-center justify-content-center flex-wrap">
                                <StarItems class="me-1" :itemRate="calculateAverageVote(user)" />
                                <p class="my-3">Numero recensioni: ({{ user.reviews.length }})</p>
                            </div>
                        </div>
                        <!-- regione e cache. -->
                        <div class="row">
                            <div class="col-6 card-text text-center"><font-awesome-icon icon="fa-solid fa-location-dot "
                                    class="me-1" style="color: #00000098;" /> {{ user.region }}
                            </div>
                            <div class="col-6 card-text text-center"><font-awesome-icon icon="fa-solid fa-money-bill"
                                    class="me-1" style="color: #00000094;" /> {{ user.cachet }}
                            </div>
                        </div>

                        <!-- genere. -->
                        <div class="row pt-3 pb-3">
                            <div class="col-12 card-text text-center d-flex justify-content-center">
                                <font-awesome-icon icon="fa-solid fa-music" class="me-2"
                                    style="color: #050407a1; padding-top: 5px;" /> {{ user.genres.map(genre =>
                                        genre.name).join(', ') }}
                            </div>
                        </div>

                        <!-- bottone dettagli musicista. -->
                        <div class="row">
                            <div class="col-12 d-flex justify-content-center">
                                <router-link class="btn text-decoration-none my-3 buttonMusicista"
                                    :to="{ name: 'SingleMusicista', params: { id: user.id } }">Scopri Musicista
                                </router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center gap-4 mt-5">
        <a class="btn" @click="getUsersPrevPage">
            <span class="ms-3">
                <font-awesome-icon icon="fa-solid fa-arrow-left" />
            </span>
        </a>
        <a class="btn text-black rounded-circle" :class="{ 'bg_violet': pageNumber === currentPage }"
            @click="getUsersPage(pageNumber)" v-for="pageNumber in  Math.ceil(filteredUsers.length / resultsPerPage)">{{
                pageNumber }}</a>
        <a class="btn" @click="getUsersNextPage">
            <span class="me-3">
                <font-awesome-icon icon="fa-solid fa-arrow-right" />
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

.buttonMusicista{
    width: 165px;
  height: 42px;
  cursor: pointer;
  color: #fff;
  font-size: 17px;
  border-radius: 1rem;
  border: none;
  position: relative;
  background: #28244b;
  transition: 0.1s;
}

.buttonMusicista::after{
    content: '';
  width: 100%;
  height: 100%;
  background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,94,247,1) 17.8%, rgb(97, 41, 228) 100.2% );
  filter: blur(15px);
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
}

.buttonMusicista:active{
    transform: scale(0.9) rotate(3deg);
  background: radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2% );
  transition: 0.5s;
}
</style>