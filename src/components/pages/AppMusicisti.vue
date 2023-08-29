<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    name: 'AppMusicisti',
    data(){
        return{
            
            store,
            loading: false,
            loadingError: false,
            users: [],
            usersCurrentPage: 0,
            usersTotalPages: 0,
        }
    },
    methods:{
        getUsersFirstPage(){
            this.loading = true;
            axios.get(this.store.apiUrl + this.store.usersApi).then(response => {
                console.log(response.data);
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
        getUsersPage(pageNumber){
            if(pageNumber && pageNumber > 0 && pageNumber <= this.usersTotalPages){
                let config = {
                    params:{
                        page: pageNumber
                    }
                };
                this.loading = true;
                axios.get(this.store.apiUrl + this.store.usersApi, config).then(response => {
                    console.log(response.data);
                    this.users = response.data.results.data;
                    this.usersCurrentPage = response.data.results.current_page;
                    this.usersTotalPages = response.data.results.last_page;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.loadingError = err.message;
                });
            } else {
                console.error ("non ci sono piu pagine");
            }
        },
        getUsersPrevPage(){
            this.getUsersPage(this.usersCurrentPage - 1);
        },
        getUsersNextPage(){
            this.getUsersPage(this.usersCurrentPage + 1);
        }
    },
    mounted(){
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
        <div class="container mx-auto">
            <div class="d-flex flex-wrap gap-3 justify-content-between">
                <div v-for="user in users">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" :src="store.storageUrl + user.img" />
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center gap-4 mt-5">
            <a class="btn btn-primary" @click="getUsersPrevPage"><i class="fa-solid fa-chevron-left" style="color: #ffffff;"></i><span class="ms-3">Previous</span></a>
            <a class="btn text-white" :class="{ 'btn-primary': pageNumber === usersCurrentPage }" @click="getUsersPage(pageNumber)" v-for="pageNumber in usersTotalPages">{{ pageNumber }}</a>
            <a class="btn btn-primary" @click="getUsersNextPage"><span class="me-3">Next</span><i class="fa-solid fa-chevron-right" style="color: #ffffff;"></i></a>
        </div>
</template>


<style></style>