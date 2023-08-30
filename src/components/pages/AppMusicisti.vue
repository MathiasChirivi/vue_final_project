<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    name: 'AppMusicisti',
    data() {
        return {

            store,
            // caricamento dati
            loading: false,
            loadingError: false,
            // per gestire carosello
            users: [],
            usersCurrentPage: 0,
            usersTotalPages: 0,
            // search
            searchQuery: '',
            filteredUsers: [],
            orderBy: 'null',
            //impaginazione frontend
            resultsPerPage: 6,
            currentPage: 1,

        }
    },
    methods: {

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
            axios.get(this.store.apiUrl + this.store.usersApi
            // , {
            //     params: {
            //         search: this.searchQuery,
            //     }
            // }
            ).then(response => {
                console.log(response);
                this.users = response.data.results;
                this.filteredUsers = response.data.results;
                // .data;
                // this.usersCurrentPage = response.data.results.current_page;
                // this.usersTotalPages = response.data.results.last_page

                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'error', params: { code: 404 } })
            })
        },
        getUsersPage(pageNumber) {
            // if (pageNumber && pageNumber > 0 && pageNumber <= this.usersTotalPages) {
            //     let config = {
            //         params: {
            //             search: this.searchQuery,
            //             page: pageNumber
            //         }
            //     };
            //     this.loading = true;
            //     axios.get(this.store.apiUrl + this.store.usersApi, config).then(response => {
            //         console.log(response);
            //         this.users = response.data.results.data;
            //         this.usersCurrentPage = response.data.results.current_page;
            //         this.usersTotalPages = response.data.results.last_page;
            //         this.loading = false;
            //     }).catch(err => {
            //         this.loading = false;
            //         this.loadingError = err.message;
            //     });
            // if (pageNumber > 0 && pageNumber <= this.usersTotalPages)
            if (pageNumber > 0 && pageNumber <= Math.ceil(this.filteredUsers.length / this.resultsPerPage))
            {
            this.currentPage = pageNumber;
            // this.loading = true;

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
            // this.getUsersPage(this.usersCurrentPage - 1);
            if (this.currentPage > 1) {
                this.currentPage--;
            }else {
                console.error("non ci sono piu pagine");
            }
        },
        getUsersNextPage() {
            // this.getUsersPage(this.usersCurrentPage + 1);
            if (this.currentPage < Math.ceil(this.filteredUsers.length / this.resultsPerPage)) {
                this.currentPage++;
            }else {
                console.error("non ci sono piu pagine");
            }
            // this.currentPage++;
        },

        // SEARCH
        searchUsers() {
            // this.getUsersFirstPage(); // Avvia la ricerca dalla prima pagina
            // console.log("ciao cazzo")
            // console.log(this.users)
        this.filteredUsers = this.users.filter(user => {
            const fullName = user.name + ' ' + user.surname;
            return fullName.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
        this.currentPage = 1; // Reset to first page after new search
        console.log(this.filteredUsers)
    },
        
        // searchUsers() {
        //     if (this.searchQuery.trim() !== '') {
        //         this.loading = true;
        //         axios.get(this.store.apiUrl + this.store.usersApi, {
        //             params: {
        //                 search: this.searchQuery
        //             }
        //         }).then(response => {
        //             console.log(response.data);
        //             this.users = response.data.results.data;
        //             this.usersCurrentPage = response.data.results.current_page;
        //             this.usersTotalPages = response.data.results.last_page;
        //             this.loading = false;
        //         }).catch(err => {
        //             this.loading = false;
        //             this.loadingError = err.message;
        //         });
        //     }
        // }

    },
            // Ricerca Utenti


    computed: {
        paginatedFilteredUsers() {
            const startIndex = (this.currentPage - 1) * this.resultsPerPage;
            const endIndex = startIndex + this.resultsPerPage;
            console.log(this.currentPage);
            
            // return this.users
            //     .filter(user => {
            //         const fullName = user.name + ' ' + user.surname;
            //         return fullName.toLowerCase().includes(this.searchQuery.toLowerCase());
            //     })
            //     .slice(startIndex, endIndex);


            // return this.filteredUsers.slice(startIndex, endIndex);

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
    
    <!-- <h1 style="color: red;">{{ users }}</h1>
    <h1 style="color: green;">{{ filteredUsers }}</h1>
    <h1 style="color: blue;">{{ paginatedFilteredUsers }}</h1> -->
    <div class="mb-5 mt-4">
        <h3 v-if="loading">
            <div class="spinner"></div>
            Caricameto dati
        </h3>
        <h3 v-if="loadingError"> {{ loadingError }} </h3>
    </div>
    <div class="col-12 d-flex flex-row-reverse my-3">
        <nav class="navbar bg_violet rounded-5 me-5">
            <div class="container mx-3">
                <form class="d-flex" @submit.prevent="searchUsers">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchQuery" @input="searchUsers">
                    <button class="btn" type="submit">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </button>
                </form>
            </div>
            
            <div class="d-flex justify-content-center gap-4 mt-3 p-3">
                <button class="btn badge"  v-bind:class="orderBy === 'null' ? 'bg_cl_primary' : '' "  @click="orderingSet('null')">Ordine Alfabetico</button>
                <button class="btn badge"  v-bind:class="orderBy === 'reviews' ? 'bg_cl_primary' : '' "  @click="orderingSet('reviews')">Più Recensioni</button>
                <button class="btn badge"  v-bind:class="orderBy === 'votes' ? 'bg_cl_primary' : '' "  @click="orderingSet('votes')">Più Voti</button>
            </div>
        </nav>
    </div>
    <div class="container mx-auto">
        <div class="d-flex flex-wrap gap-3 justify-content-center align-items-center">
            <div v-for="user in paginatedFilteredUsers" :key="user.id">
                <!-- Mostra i dettagli del musicista della search qui -->
                <div class="card" style="width:20rem;">
                    <img v-if="user.img" class="card-img-top" :src="store.storageUrl + user.img" />
                    <img v-else class="card-img-top" src="https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4=" />
                    <div class="card-body">
                        <h3 class="card-title">{{ user.name }}</h3>
                        <h3 class="card-title">{{ user.surname }}</h3>
                        <p>Recensioni: {{ user.reviews.length }}</p>
                            <!-- Visualizza il voto medio -->
                        <p>Voto Medio: {{ calculateAverageVote(user) }}</p>
                        <div class="card-text text-truncate">{{ user.experience }}</div>
                        <div class="card-text"><font-awesome-icon icon="fa-solid fa-location-dot " class="me-3"
                                style="color: #5d96f8;" /> {{ user.region }}</div>
                        <div class="card-text"><font-awesome-icon icon="fa-solid fa-music" class="me-3"
                                style="color: #5d96f8;" /> {{ user.genres.map(genre => genre.name).join(', ') }}</div>
                        <div class="card-text"><font-awesome-icon icon="fa-solid fa-money-bill" class="me-3"
                                style="color: #5d96f8;" /> {{ user.cachet }}€</div>
                    </div>

                </div>
            </div>
            <!-- <div v-for="user in users">
                <div class="card" style="width:20rem;">
                    <img v-if="user.img" class="card-img-top" :src="store.storageUrl + user.img" />
                    <img v-else class="card-img-top" src="https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4=" />
                    <div class="card-body">
                        <h3 class="card-title">{{ user.name }}</h3>
                        <h3 class="card-title">{{ user.surname }}</h3>
                        <div class="card-text text-truncate">{{ user.experience }}</div>
                        <div class="card-text"><font-awesome-icon icon="fa-solid fa-location-dot " class="me-3"
                                style="color: #5d96f8;" /> {{ user.region }}</div>
                        <div class="card-text"><font-awesome-icon icon="fa-solid fa-music" class="me-3"
                                style="color: #5d96f8;" /> {{ user.genres.map(genre => genre.name).join(', ') }}</div>
                        <div class="card-text"><font-awesome-icon icon="fa-solid fa-money-bill" class="me-3"
                                style="color: #5d96f8;" /> {{ user.cachet }}</div>
                    </div>

                </div>
            </div> -->
        </div>
    </div>
    <div class="d-flex justify-content-center gap-4 mt-5">
        <a class="btn" @click="getUsersPrevPage">
            <span class="ms-3">
                <font-awesome-icon icon="fa-solid fa-arrow-left" />
            </span>
        </a>
        <a class="btn text-black rounded-circle" :class="{ 'bg_violet': pageNumber === currentPage }" @click="getUsersPage(pageNumber)" v-for="pageNumber in  Math.ceil(filteredUsers.length / resultsPerPage)">{{ pageNumber }}</a>
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

.bg_cl_primary{
    background-color:#5c75d1e0 ;
}

</style>