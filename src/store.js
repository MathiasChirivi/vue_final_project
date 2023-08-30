import { reactive } from "vue";

export const store = reactive({
    apiUrl: "http://localhost:8000/api/",
    usersApi:"users/",
    storageUrl: "http://localhost:8000/storage/",

    statistiche:[
        {
            testo: "Musicisti iscritti",
        },
        {
            testo: "Richieste per concerti",
        },
        {
            testo: "Recensioni clienti",
        },
        
    ],

})