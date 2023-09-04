<script>

import { store } from '../../store';
import axios from "axios";
import StarItems from '../StarItems.vue'


export default {
    name: "SingleMusicista",
    components: {
        StarItems,
    },
    data() {
        return {
            store,
            loading: false,
            loadingError: false,
            user: null,
            selectedSection: "dettagli",
            isPopupVisible: false,
            vote: 0,
            formData: {
                user_id: this.$route.params.id,
                name: '',
                email: '',
                comment: ''
            },
            formVote: {
                user_id: this.$route.params.id,
                vote_id: this.vote,
            }
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
            console.log("davide");
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
        submitReview() {
            // Crea un oggetto che contiene i dati da inviare
            const reviewData = {
                user_id: this.$route.params.id,
                name: this.formData.name,
                email: this.formData.email,
                comment: this.formData.comment
            };

            // Invia la recensione al server utilizzando Axios o un'altra libreria di tua scelta
            axios.post(this.store.apiUrl + 'reviews', reviewData, {
                headers: {
                    'Content-Type': 'application/json', // Imposta l'intestazione Content-Type
                }
            }).then(response => {
                // Gestisci la risposta dal server, ad esempio mostra un messaggio di successo
                alert(response.data.message);
                // Puoi anche reimpostare il formData se necessario
                const newReview = {
                    name: this.formData.name, // Aggiungi il nome
                    date: new Date().toLocaleDateString(),
                    comment: this.formData.comment
                };

                // Aggiungi la nuova recensione direttamente all'array delle recensioni
                this.user.reviews.push(newReview);

                // Resetta il formData dopo aver aggiunto la recensione
                this.formData = {
                    user_id: this.$route.params.id,
                    name: '',
                    email: '',
                    comment: ''
                };
                // Chiudi il popup dopo 2 secondi (2000 millisecondi)
                setTimeout(() => {
                    this.closePopup();
                }, 200);
            }).catch(error => {
                // Gestisci gli errori qui, ad esempio mostra un messaggio di errore
                console.error(error);
                alert('Si è verificato un errore durante l\'invio della recensione.');
            });
        },
        submitVote() {
            // Crea un oggetto che contiene i dati da inviare
            const voteData = {
                user_id: this.$route.params.id,
                vote_id: this.vote,
            };

            // Invia la recensione al server utilizzando Axios o un'altra libreria di tua scelta
            axios.post(this.store.apiUrl + 'votes', voteData, {
                headers: {
                    'Content-Type': 'application/json', // Imposta l'intestazione Content-Type
                }
            }).then(response => {
                // Gestisci la risposta dal server, ad esempio mostra un messaggio di successo
                alert(response.data.message);

                // Aggiungi il nuovo voto direttamente all'array dei voti
                // const newVote = {
                //     vote_id: this.formVote.vote_id
                // };

                // this.user.votes.push(newVote);
                // this.formVote = { user_id: this.$route.params.id, vote_id: this.vote };
                // Chiudi il popup dopo 2 secondi (2000 millisecondi)
                setTimeout(() => {
                    this.closePopup();
                }, 200);

            }).catch(error => {
                // Gestisci gli errori qui, ad esempio mostra un messaggio di errore
                console.error(error);
                alert('Si è verificato un errore durante l\'invio del voto.');
            });
        }

    },
    mounted() {
        this.getUser(this.$route.params.id);
        console.log(this.$route.params.id);


    }
}

</script>

<template>
    <section>
        <div v-if="user" class="vh-100">
            <div class="container mt-5">
                <a class="text-decoration-none">
                    <router-link class="text-decoration-none textLink" :to="{ name: 'Musicisti' }">
                        <font-awesome-icon icon="fa-solid fa-arrow-left" style="color: #003ca3;" />
                        Torna ai Musicisti
                    </router-link>
                </a>
                <div class="row mt-3">
                    <div class="col-10 d-flex ">
                        <div class="d-flex me-3">
                            <img v-if="user.img" class="w-100" :src="store.storageUrl + user.img" />
                            <img v-else class="w-100"
                                src="https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4="
                                alt="">
                        </div>
                        <div class="col-4 d-flex flex-column justify-content-end">
                            <div class="d-flex flex-column justify-content-start ">
                                <h5 class="mb-0">Feedback</h5>
                                <StarItems
                                    :itemRate="(user.votes.length > 0 ? user.votes.reduce((total, vote) => total + vote.vote, 0) / user.votes.length : 0)" />
                                <h3 class="mt-4">{{ user.name }} {{ user.surname }}</h3>
                            </div>
                        </div>
                        <div class="col-4 d-flex align-items-end justify-content-end">
                            <a class="btn btn-primary" href=""><font-awesome-icon :icon="['fas', 'music']" class="me-2"
                                    style="color: #ffffff;" />Contatta l'artista</a>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-12 d-flex gap-4">
                        <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'dettagli'"
                            :class="{ 'selected': selectedSection === 'dettagli' }">
                            Dettagli
                        </a>
                        <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'recensioni'"
                            :class="{ 'selected': selectedSection === 'recensioni' }">
                            Recensioni
                        </a>
                        <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'Voti'"
                            :class="{ 'selected': selectedSection === 'Voti' }">
                            Voti
                        </a>
                        <a class="text-decoration-none" href="" @click.prevent="selectedSection = 'Messaggi'"
                            :class="{ 'selected': selectedSection === 'Messaggi' }">
                            Messaggi
                        </a>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-12">
                        <div v-if="selectedSection === 'dettagli'">
                            <div class="text-decoration-none">
                                <h3>INFORMAZIONI</h3>
                                <div>
                                    <font-awesome-icon class="fs-4" icon="fa-solid fa-location-dot"
                                        style="color: #001580;" />
                                    <span class="ms-2 fs-5">{{ user.region }}</span>
                                </div>
                                <div class="mt-4">
                                    <a class="btn btnCall text-white me-3" href=""><font-awesome-icon
                                            icon="fa-solid fa-phone" class="me-2" style="color: #ffffff;" />Chiama</a>
                                    <a class="btn btnWhats text-white" href=""><font-awesome-icon
                                            :icon="['fab', 'whatsapp']" class="me-2" style="color: #ffffff;" />Whatsapp</a>
                                    <hr class="w-75 mt-5 mb-5">
                                    <div class="row">
                                        <div class="col-12">
                                            <h3>CACHET</h3>
                                            <div class="fs-6 fw-light">
                                                € {{ user.cachet }}
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="w-75 mt-5 mb-5">
                                    <div class="row">
                                        <div class="col-12">
                                            <h3>GENERI</h3>
                                            <div class="fs-5 fw-normal badge btnCall me-3 mt-3"
                                                v-for="genre in user.genres">
                                                {{ genre.name }}
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="w-75 mt-5 mb-5">
                                    <div class="row">
                                        <div class="col-12">
                                            <h3>DESCRIZIONE</h3>
                                            <div class="w-50">
                                                {{ user.experience }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- RECENSIONI -->
                        <div v-else-if="selectedSection === 'recensioni'">
                            <!-- <a class="btn">
                                <font-awesome-icon class="me-2" icon="fa-solid fa-plus" />
                                <span>Lascia una recensione</span>
                            </a> -->
                            <div class="containerReview d-flex align-items-center justify-content-center bg-light ">
                                <a class="btnLink text-decoration-none d-flex align-items-center justify-content-center text-dark"
                                    @click="showPopup">
                                    <span class="circle-icon">
                                        <font-awesome-icon icon="fa-solid fa-plus" style="color: #000000;" />
                                    </span>
                                    Aggiungi una recensione
                                </a>
                            </div>

                            <!-- Popup -->
                            <div v-bind:class="isPopupVisible === true ? 'd-block' : ''" id="reviewPopup" class="popup">
                                <div class="popup-content">
                                    <form class="form" @submit.prevent="submitReview">
                                        <h2 class="text-white">Lascia una recensione</h2>

                                        <label>
                                            <input type="text" placeholder="" required="" v-model="formData.name"
                                                class="input" id="name">
                                            <span>Nome</span>
                                        </label>
                                        <label>
                                            <input type="email" placeholder="" required="" v-model="formData.email"
                                                class="input" id="email">
                                            <span>Email</span>
                                        </label>
                                        <label>
                                            <textarea placeholder="" rows="3" required="" v-model="formData.comment"
                                                class="input01" id="comment"></textarea>
                                            <span>Commento</span>
                                        </label>
                                        <div class="d-flex justify-content-between">
                                            <button type="submit" class="btn btn-primary">Invia recensione</button>
                                            <button class="text-white btn " @click="closePopup">Annulla</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div v-for="review in user.reviews" :key="review.id">
                                <h5 class="m-0">{{ review.name }}</h5>
                                <div class="fw-light">{{ review.date }}</div>
                                <div class="fw-lighter mt-2">{{ review.comment }}</div>
                            </div>
                        </div>

                        <!-- VOTI -->
                        <div v-else-if="selectedSection === 'Voti'">
                            <div class="containerReview d-flex align-items-center justify-content-center bg-light ">
                                <a class="btnLink text-decoration-none d-flex align-items-center justify-content-center text-dark"
                                    @click="showPopup">
                                    <span class="circle-icon">
                                        <font-awesome-icon icon="fa-solid fa-plus" style="color: #000000;" />
                                    </span>
                                    Voti
                                </a>
                            </div>

                            <!-- Popup -->
                            <div v-bind:class="isPopupVisible === true ? 'd-block' : ''" id="reviewPopup" class="popup">
                                <div class="popup-content">
                                    <form class="form" @submit.prevent="submitVote">
                                        <h2 class="text-white">Lascia una recensione</h2>

                                        <div class="starHover">
                                            <label class="fs-2 star_" type="button" v-for="n in 5" :key="n"
                                                @click="vote === n ? deselectStar() : selectStar(n)"
                                                :class="{ 'selectedStar': n <= vote }">&#9733;</label>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <button type="submit" class="btn btn-primary">Invia voto</button>
                                            <button class="text-white btn " @click="closePopup">Annulla</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- <div v-if="user.votes.length > 0">
                                <h3>Voti Ricevuti</h3>
                                <div v-for="(vote, index) in user.users_votes" :key="index">
                                    <div>
                                        <span>Voto {{ index + 1 }}:</span>
                                        <StarItems :itemRate="vote.vote_id" />
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p>L'utente non ha ancora ricevuto voti.</p>
                            </div> -->

                        </div>

                        <!-- MESSAGGI -->
                        <div v-else-if="selectedSection === 'Messaggi'">
                            <div>
                                messaggi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 v-if="loading">
                <div class="spinner vh-100">Caricameto dati</div>
            </h3>
            <h3> {{ loadingError }} </h3>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.selectedStar {
    color: gold;
    /* Puoi personalizzare il colore qui */
}

.btnCall {
    background-color: #001580;
}

.btnWhats {
    background-color: #0d8000
}

.popup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
}

.popup-content {
    width: 50%;
    // min-height: 50%;
    // background: #9496ff;
    // background: -webkit-linear-gradient(173deg, #9496ff 0%, #ffffff 100%);
    // background: linear-gradient(173deg, #9496ff 0%, #ffffff 100%);
    // background-repeat: no-repeat;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    margin-left: auto;
    margin-right: auto;
    transform: translateY(30%);

}

/* Stili per il form */
.review-form {
    display: flex;
    flex-direction: column;
}

.circle-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid black;
    color: #ffffff;
    margin-right: 5px;
}

.containerReview {
    height: 75px;
    width: 50%;
    margin: auto;
}

.btnLink {
    cursor: pointer;
}

.form {
    display: flex;
    margin: auto;
    flex-direction: column;
    gap: 10px;
    width: 90%;
    background-color: #355891;
    padding: 20px;
    border-radius: 10px;
    position: relative;
}

.message {
    color: #355891;
    font-size: 14px;
}

.flex {
    display: flex;
    width: 100%;
    gap: 6px;
}

.form label {
    position: relative;
}

.form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid #355891;
    border-radius: 5px;
}

.form label .input+span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: #355891;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
}

.form label .input:placeholder-shown+span {
    top: 15px;
    font-size: 0.9em;
}

.form label .input:focus+span,
.form label .input:valid+span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
}

.form label .input:valid+span {
    color: green;
}

.input01 {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid #355891;
    border-radius: 5px;
}

.form label .input01+span {
    position: absolute;
    left: 10px;
    top: 50px;
    color: #355891;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
}

.form label .input01:placeholder-shown+span {
    top: 40px;
    font-size: 0.9em;
}

.form label .input01:focus+span,
.form label .input01:valid+span {
    top: 50px;
    font-size: 0.7em;
    font-weight: 600;
}

.form label .input01:valid+span {
    color: green;
}

.fancy {
    background-color: white;
    border: 2px solid #355891;
    border-radius: 0px;
    box-sizing: border-box;
    color: #355891;
    cursor: pointer;
    display: inline-block;
    font-weight: 390;
    letter-spacing: 2px;
    margin: 0;
    outline: none;
    overflow: visible;
    padding: 8px 30px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    transition: all 0.3s ease-in-out;
    user-select: none;
    font-size: 13px;
}

.fancy::before {
    content: " ";
    width: 1.7rem;
    height: 2px;
    background: #355891;
    top: 50%;
    left: 1.5em;
    position: absolute;
    transform: translateY(-50%);
    transform: translateX(230%);
    transform-origin: center;
    transition: background 0.3s linear, width 0.3s linear;
}

.fancy .text {
    font-size: 1.125em;
    line-height: 1.33333em;
    padding-left: 2em;
    display: block;
    text-align: left;
    transition: all 0.3s ease-in-out;
    text-transform: lowercase;
    text-decoration: none;
    color: #355891;
    transform: translateX(30%);
}

.fancy .top-key {
    height: 2px;
    width: 1.5625rem;
    top: -2px;
    left: 0.625rem;
    position: absolute;
    background: #355891;
    transition: width 0.5s ease-out, left 0.3s ease-out;
}

.fancy .bottom-key-1 {
    height: 2px;
    width: 1.5625rem;
    right: 1.875rem;
    bottom: -2px;
    position: absolute;
    background: #355891;
    transition: width 0.5s ease-out, right 0.3s ease-out;
}

.fancy .bottom-key-2 {
    height: 2px;
    width: 0.625rem;
    right: 0.625rem;
    bottom: -2px;
    position: absolute;
    background: #355891;
    transition: width 0.5s ease-out, right 0.3s ease-out;
}

.fancy:hover {
    color: #355891;
    background: #5f82a9;
}

.fancy:hover::before {
    width: 1.5rem;
    background: #355891;
}

.fancy:hover .text {
    color: white;
    padding-left: 1.5em;
}

.fancy:hover .top-key {
    left: -2px;
    width: 0px;
}

.fancy:hover .bottom-key-1,
.fancy:hover .bottom-key-2 {
    right: 0;
    width: 0;
}
</style>