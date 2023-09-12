import { reactive } from "vue";
import axios from 'axios';

export const store = reactive({
    apiUrl: "http://localhost:8000/api/",
    usersApi:"users/",
    genresApi:"genres/",
    genreFromHome: "",
    storageUrl: "http://localhost:8000/storage/",

    events:[
        {
            title:"Festeggia il Compleanno!",
            text:"In una festa di compleanno o a un anniversario l'elemento chiave è la Musica,Ma come trovare i musicisti più adatti? Su BoolMusic basta selezionare il Genere per visualizzare tutti i musicisti.",
        },
        {
            title:"Allieta il Matrimonio",
            text:"La musica a un matrimonio, sia durante il ricevimento che come sottofondo della celebrazione in chiesa o civile, ha un ruolo importantissimo e può rendere questo giorno ancora più speciale.",
        },
        {
            title:"Rendi unici gli Eventi Privati",
            text:"Come vuoi distinguere il tuo evento privato? come vuoi attirare i tuoi ospiti? farli divertire, cantare o ballare?. Per Questo il giusto dj, cantante o band dal vivo potrà renderla ancora più divertente e memorabile.",
        },
    ],

    steps:[
        {
            logo:"../assets/img/logo_step1.png",
            title:"STEP 1",
            text:"Naviga tra i musicisti di tutta italia che si mettono a tua disposizione con il loro talento",
        },
        {
            logo:"../assets/img/logo_step2.png",
            title:"STEP 2",
            text:"Usa i nostri filtri di ricerca per trovare facilmente la musica giusta tra migliaia di proposte",
        },
        {
            logo:"../assets/img/logo_step3.png",
            title:"STEP 3",
            text:"Contatta le band o i musicisti che ti interessano, cosi da capire quale fà al tuo caso!",
        },
    ]

    
    

})