import { reactive } from "vue";

export const store = reactive({
    apiUrl: "http://localhost:8000/api/",
    usersApi:"users/",
    storageUrl: "http://localhost:8000/storage/",

    statistiche:[
        {
            dato: "32.225",
            testo: "Musicisti iscritti",
        },
        {
            dato:"88.326",
            testo: "Richieste per concerti",
        },
        {
            dato:"10.599",
            testo: "Recensioni clienti",
        },
        
    ],

})