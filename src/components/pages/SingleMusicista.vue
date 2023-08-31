<script>

import { store } from '../../store';
import axios from "axios";
import StarItems from '../StarItems.vue'


export default {
    name: "SingleMusicista",
    components:{
        StarItems
    },
    data() {
        return {
            store,
            loading: false,
            loadingError: false,
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
            })
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
                <div class="row">
                    <div class="col-10 d-flex">
                        <div class="col-5 d-flex align-items-center justify-content-center">
                            <img class="w-75" :src="store.storageUrl + user.img" />
                        </div>
                        <div class="col-4 d-flex flex-column justify-content-around">
                            <div>
                                <StarItems :itemRate="(user.votes.length > 0 ? user.votes.reduce((total, vote) => total + vote.vote, 0) / user.votes.length : 0)" />
                                <div>({{ user.votes.length > 0 ? user.votes.reduce((total, vote) => total + vote.vote, 0) / user.votes.length : 0 }} recensioni su {{ user.reviews.length }})</div>
                                </div>
                            <div class="d-flex flex-column justify-content-start ">
                                <h3>{{ user.name }} {{ user.surname }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a class="btn btn-danger ">
                <router-link class="text-decoration-none text-white" :to="{ name: 'Musicisti' }">Torna ai
                    Musicisti</router-link>
            </a>
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
</style>