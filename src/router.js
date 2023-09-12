import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './components/pages/AppHome.vue';
import AppMusicisti from './components/pages/AppMusicisti.vue';
import SingleMusicista from './components/pages/SingleMusicista.vue';



const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            name: "Home",
            component:AppHome
        },
        {
            path: "/Musicisti/",
            name: "Musicisti",
            component: AppMusicisti,
            props: (route) => ({ genre: route.query.genre }),
        },
        {
            path: "/Musicisti/:id",
            name: "SingleMusicista",
            component: SingleMusicista
        },
        {
            path: "/Musicisti/:genre?", // Il "?" indica che il parametro "genre" è opzionale
            name: "Musicisti",
            component: AppMusicisti,
            props: true, // Abilita la trasmissione automatica delle props dai parametri dell'URL
        }

    ]
});

export {router};