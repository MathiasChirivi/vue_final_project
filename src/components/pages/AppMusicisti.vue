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

        }
    },
    methods: {

        // CAROSELLO MUSICISTI 
        getUsersFirstPage() {
            this.loading = true;
            axios.get(this.store.apiUrl + this.store.usersApi, {
                params: {
                    search: this.searchQuery,
                }
            }).then(response => {
                console.log(response);
                this.users = response.data.results.data;
                this.usersCurrentPage = response.data.results.current_page;
                this.usersTotalPages = response.data.results.last_page
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'error', params: { code: 404 } })
            })
        },
        getUsersPage(pageNumber) {
            if (pageNumber && pageNumber > 0 && pageNumber <= this.usersTotalPages) {
                let config = {
                    params: {
                        search: this.searchQuery,
                        page: pageNumber
                    }
                };
                this.loading = true;
                axios.get(this.store.apiUrl + this.store.usersApi, config).then(response => {
                    console.log(response);
                    this.users = response.data.results.data;
                    this.usersCurrentPage = response.data.results.current_page;
                    this.usersTotalPages = response.data.results.last_page;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.loadingError = err.message;
                });
            } else {
                console.error("non ci sono piu pagine");
            }
        },
        getUsersPrevPage() {
            this.getUsersPage(this.usersCurrentPage - 1);
        },
        getUsersNextPage() {
            this.getUsersPage(this.usersCurrentPage + 1);
        },

        // SEARCH
        searchUsers() {
            this.getUsersFirstPage(); // Avvia la ricerca dalla prima pagina
        }
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
    mounted() {
        this.getUsersFirstPage();
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
    <div class="col-12 d-flex flex-row-reverse">
        <nav class="navbar bg_violet rounded-5 me-5">
            <div class="container mx-3">
                <form class="d-flex" role="search" @submit.prevent="searchUsers">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                    v-model="searchQuery">
                    <button class="btn" type="submit">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </button>
                </form>
            </div>
        </nav>
    </div>
    <div class="container mx-auto">
        <div class="d-flex flex-wrap gap-3 justify-content-center align-items-center">
            <div v-for="user in users">
                <div class="card" style="width:20rem;">
                    <img class="card-img-top" :src="store.storageUrl + user.img" />
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
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center gap-4 mt-5">
        <a class="btn" @click="getUsersPrevPage">
            <span class="ms-3">
                <font-awesome-icon icon="fa-solid fa-arrow-left" />
            </span>
        </a>
        <a class="btn text-black rounded-circle" :class="{ 'bg_violet': pageNumber === usersCurrentPage }" @click="getUsersPage(pageNumber)" v-for="pageNumber in usersTotalPages">{{ pageNumber }}</a>
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
</style>