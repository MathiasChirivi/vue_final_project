<script>
import axios from 'axios'
import { store } from '../../store'
export default {
    name: "AppHome",
    data() {
        return {
            store,
        }
    },
    methods: {
        getUser() {
            axios.get(this.store.apiUrl + this.store.usersApi).then(response => {
                this.users = response.data.results.data;
                console.log(this.users)
            })
        }
    },
    components: {
    },
    mounted() {
        this.getUser();
    },

}
</script>
<template>
    <div class="container p-0 ">
        <div class="row">
            <div class="col-8 my-5">
                <!-- titolone. -->
                <div class="col-9 titolo">
                    <h1>Trova musicisti Interessanti, gruppi, DJ e band per il tuo evento</h1>
                </div>

                <!-- search di ricerca. -->
                <div class="search col-8 d-flex align-items-center mt-5 p-4 rounded-4 bgcolor_search">
                    <!-- genere -->
                    <div class="col-2 pe-3">
                        <input class="form-control form-control-sm rounded-4" type="text" placeholder="Genere"
                            aria-label=".form-control-sm example">
                    </div>

                    <!-- Regione -->
                    <div class="col-2 pe-3">
                        <input class="form-control form-control-sm rounded-4" type="text" placeholder="Regione"
                            aria-label=".form-control-sm example">
                    </div>

                    <!-- cerca. -->
                    <div class="col-2">
                        <input class="btn btn-outline-light rounded-4" type="submit" value="Submit">
                    </div>
                </div>
            </div>

            <!-- immagine.-->
            <div class="col-4 my-5">
                <div>

                </div>
            </div>
            <!-- <div class="d-flex justify-content-center container pt-5 pb-5">


                <div class=" d-flex align-items-center pr-5 ps-5 ">
                    <div class="d-flex flex-column justify-content-center align-items-center mx-5">
                        <span class="colorPrimary fs-3">{{ users.length }}</span>
                        <div class="fs-2">Musicisti iscritti</div>
                    </div>
                    <div class="d-flex flex-column justify-content-center align-items-center mx-5">
                        <span class="colorPrimary fs-3">{{ users.length }}</span>
                        <div class="fs-2">Richieste per concerti</div>
                    </div>
                    <div class="d-flex flex-column justify-content-center align-items-center mx-5">
                        <span class="colorPrimary fs-3">{{ users.length }}</span>
                        <div class="fs-2">Recensioni clienti</div>
                    </div>


                </div> -->
            <!-- </div> -->
        </div>
    </div>
</template>


<style scoped lang="scss">
.bgcolor_search {
    background-color: rgba(255, 255, 255, 0.493);
}
</style>