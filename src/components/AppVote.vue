<script>

import { store } from '../store';
import axios from "axios";
import moment from 'moment';


export default {
    name: "AppVote",
    components: {
    },
    data() {
        return {
            store,
            loading: false,
            loadingError: false,
            user: null,
            isPopupVisible: false,
            vote: 0,
            formVote: {
                user_id: this.$route.params.id,
                vote_id: this.vote,
            },
            emailSent: false,

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
            this.vote = 0;
            this.isPopupVisible = true;
        },
        closePopup() {
            this.vote = 0;
            this.isPopupVisible = false;
        },
        selectStar(n) {
            this.vote = n;
        },
        deselectStar() {
            this.vote = 0; // Imposta il voto a 0 per deselezionare tutte le stelle
        },
        submitVote() {
            
           
            // Crea un oggetto che contiene i dati da inviare
            const voteData = {
                user_id: this.$route.params.id,
                vote_id: this.vote,
                date: moment().format('YYYY-MM-DD')
            };


            // Invia la recensione al server utilizzando Axios o un'altra libreria di tua scelta
            axios.post(this.store.apiUrl + 'votes', voteData, {
                headers: {
                    'Content-Type': 'application/json', // Imposta l'intestazione Content-Type
                }
            }).then(response => {
                // Gestisci la risposta dal server, ad esempio mostra un messaggio di successo
                this.emailSent = true;

                // Dopo 3 sec sparisce
                setTimeout(() => {
                    this.emailSent = false;
                }, 3000);

                // Aggiorna il voto nel tuo componente dopo una risposta positiva
                
                this.user.votes.push({ pivot: { vote_id: this.vote}, date: moment().format('YYYY-MM-DD')  });

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
    }
}
</script>
<template>
    <div class="containerReview d-flex align-items-center justify-content-center rounded-4">
        <a class="btnLink text-decoration-none d-flex align-items-center justify-content-center text-white"
            @click="showPopup">
            <span class="circle-icon">
                <font-awesome-icon icon="fa-solid fa-plus" style="color: #f7efef;" />
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
                    <button type="submit" class="btn btn-secondary">Invia voto</button>
                    <button class="text-white btn btn-secondary" type="button" @click="closePopup">Annulla</button>
                </div>
            </form>
        </div>
    </div>
    <!-- Success Banner Transition -->
    <transition name="fade">
        <div v-show="emailSent" class="success-banner">Voto inviato con successo!</div>
    </transition>
    
</template>
<style>

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
    /* min-height: 50%; */
    /* background: #9496ff; */
    /* background: -webkit-linear-gradient(173deg, #9496ff 0%, #ffffff 100%); */
    /* background: linear-gradient(173deg, #9496ff 0%, #ffffff 100%); */
    /* background-repeat: no-repeat; */
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    margin-left: auto;
    margin-right: auto;
    transform: translateY(30%);

}
.circle-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgb(252, 248, 248);
    color: #ffffff;
    margin-right: 5px;
}

.containerReview {
    background-color: #355891d3;
    height: 55px;
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

.success-banner {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>