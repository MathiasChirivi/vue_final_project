<script>
import { store } from '../store';
import axios from "axios";

export default {
    name: "AppReview",
    components: {
    },
    data() {
        return {
            store,
            loading: false,
            loadingError: false,
            user: null,
            isPopupVisible: false,
            formData: {
                user_id: this.$route.params.id,
                name: '',
                email: '',
                comment: ''
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
            this.isPopupVisible = true;
        },
        closePopup() {
            this.isPopupVisible = false;
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
                this.emailSent = true;

                // Dopo 3 sec sparisce
                setTimeout(() => {
                    this.emailSent = false;
                }, 3000);
                
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
    },
    mounted() {
        this.getUser(this.$route.params.id);
    }
}
</script>
<template>
    <div class="row pt-5 mt-5 pb-4">
        <div class=" col-12 d-flex align-items-center justify-content-center  ">
        <a class="btnLink col-lg-6 bgReview text-decoration-none d-flex align-items-center justify-content-center rounded-4 text-white p-2"
            @click="showPopup">
            <span class="circle-icon">
                <font-awesome-icon icon="fa-solid fa-plus" style="color: #ffffff;" />
            </span>
            Aggiungi una recensione
        </a>
    </div>
    </div>
  

    <!-- Popup -->
    <div v-bind:class="isPopupVisible === true ? 'd-block' : ''" id="reviewPopup" class="popup col-sm-12">
        <div class="popup-content w-100">
            <form class="form" @submit.prevent="submitReview">
                <h2 class="text-white">Lascia una recensione</h2>

                <label>
                    <input type="text" placeholder="" required="" v-model="formData.name" class="input" id="name">
                    <span>Nome</span>
                </label>
                <label>
                    <input type="email" placeholder="" required="" v-model="formData.email" class="input" id="email">
                    <span>Email</span>
                </label>
                <label>
                    <textarea placeholder="" rows="3" required="" v-model="formData.comment" class="input01"
                        id="comment"></textarea>
                    <span>Commento</span>
                </label>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-secondary">Invia recensione</button>
                    <button class="btn btn-secondary" type="button" @click="closePopup">Annulla</button>
                </div>
            </form>
        </div>
    </div>
    <div v-for="review in user && user.reviews ? user.reviews : []" :key="review.id" class="pb-4 pt-4 mt-4 ">
        <h5 class="m-0 text-white">{{ review.name }}</h5>
        <div class="fw-light text-white">{{ review.date }}</div>
        <div class="fw-lighter mt-2 text-white">{{ review.comment }}</div>
    </div>

     <!-- Success Banner Transition -->
    <transition name="fade">
        <div v-show="emailSent" class="success-banner">Recensione inviata con successo!</div>
    </transition>
</template>
<style lang="scss" scoped>
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
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    margin-left: auto;
    margin-right: auto;
    transform: translateY(30%);

}

/* Stili per il form */
.circle-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgb(250, 248, 248);
    color: #ffffff;
    margin-right: 5px;
}

.bgReview {
    background-color: #a79ddb98;
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
    background-color: #5d5583;
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
    border: 1px solid #5d5583;
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