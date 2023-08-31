<script>

import { store } from '../../store';
import axios from "axios";

export default {
    name: "SingleMusicista",
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
                    <div class="col-12 d-flex">
                        <div class="col-7">
                            <img class="w-75" :src="store.storageUrl + user.img" />
                        </div>
                        <div class="col-5">
                            <div class="d-flex align-items-center my-3">
                                <strong class="badge fs-5 fw-blod bg_violet me-3">Nome:</strong>
                                <span>{{ user.name }}</span>
                            </div>
                            <div class="d-flex align-items-center my-3">
                                <strong class="badge fs-5 fw-blod bg_violet me-3">Cognome:</strong>
                                <span>{{ user.surname }}</span>
                            </div>
                            <div class="d-flex align-items-center my-3">
                                <strong class="badge fs-5 fw-blod bg_violet me-3">Prezzo:</strong>
                                <span>{{ user.cachet }}</span>
                            </div>
                            <div class="d-flex align-items-center my-3">
                                <strong class="badge fs-5 fw-blod bg_violet me-3">Esperienza:</strong>
                                <span>{{ user.experience }}</span>
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
<style scoped></style>
