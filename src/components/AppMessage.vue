<script>
import { store } from '../store'
import axios from "axios"

export default {
    name: "AppMessage",
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
                message: ''
            },
        }
    },
    methods: {
        getUser(id) {
            this.loading = true;
            axios.get(this.store.apiUrl + this.store.usersApi + id).then(response => {
                this.user = response.data.results;
                this.loading = false;

                if (!this.user.messages) {
                this.user.messages = [];
            }
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'error', params: { code: 404 } })
            });
        },
        showPopup() {
            console.log("davide");
            this.isPopupVisible = true;
            this.formData = {
                user_id: this.$route.params.id,
                name: '',
                email: '',
                message: ''
            };      
        },
        closePopup() {
            this.isPopupVisible = false;
            this.formData = {
                user_id: this.$route.params.id,
                name: '',
                email: '',
                message: ''
            };    
        },
        submitMessage() {
            // Crea un oggetto che contiene i dati da inviare
            const messageData = {
                user_id: this.$route.params.id,
                name: this.formData.name,
                email: this.formData.email,
                message: this.formData.message
            };

            // Invia la recensione al server utilizzando Axios o un'altra libreria di tua scelta
            axios.post(this.store.apiUrl + 'messages', messageData, {
                headers: {
                    'Content-Type': 'application/json', // Imposta l'intestazione Content-Type
                }
            }).then(response => {
                // Gestisci la risposta dal server, ad esempio mostra un messaggio di successo
                alert(response.data.message);
                // Puoi anche reimpostare il formData se necessario

                const newMessage = {
                    name: this.formData.name, // Aggiungi il nome
                    // email:this.formData.email,
                    date: new Date().toLocaleDateString(),
                    message: this.formData.message
                };

                // Aggiungi la nuova recensione direttamente all'array delle recensioni
                this.user.messages.push(newMessage);

                // Resetta il formData dopo aver aggiunto la recensione
                setTimeout(() => {
                    this.closePopup();
                }, 200);
            }).catch(error => {
                // Gestisci gli errori qui, ad esempio mostra un messaggio di errore
                console.error(error);
                alert('Si è verificato un errore durante l\'invio della messaggio.');
            });
        },
    },
    mounted() {
        this.getUser(this.$route.params.id);
    }
}
</script>
<template>
    <div class="containerReview d-flex align-items-center justify-content-center bg-light ">
        <a class="btnLink text-decoration-none d-flex align-items-center justify-content-center text-dark"
            @click="showPopup">
            <span class="circle-icon">
                <font-awesome-icon icon="fa-solid fa-plus" style="color: #000000;" />
            </span>
            Invia un messaggio
        </a>
    </div>

    <!-- Popup -->
    <div v-bind:class="isPopupVisible === true ? 'd-block' : ''" id="reviewPopup" class="popup">
        <div class="popup-content">
            <form class="form" @submit.prevent="submitMessage">
                <h2 class="text-white">Invia un messaggio</h2>

                <label>
                    <input type="text" placeholder="" required="" v-model="formData.name" class="input" id="name">
                    <span>Nome</span>
                </label>
                <label>
                    <input type="email" placeholder="" required="" v-model="formData.email" class="input" id="email">
                    <span>Email</span>
                </label>
                <label>
                    <textarea placeholder="" rows="3" required="" v-model="formData.message" class="input01"
                        id="message"></textarea>
                    <span>Messaggio</span>
                </label>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">Invia messaggio</button>
                    <button class="text-white btn" type="button" @click="closePopup">Annulla</button>
                </div>
            </form>
        </div>
    </div>
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
</style>