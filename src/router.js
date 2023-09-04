import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './components/pages/AppHome.vue';
import AppGeneri from './components/pages/AppGeneri.vue';
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
            path: "/Generi",
            name: "Generi",
            component: AppGeneri
        },
        {
            path: "/Musicisti/",
            name: "Musicisti",
            component: AppMusicisti,
        },
        {
            path: "/Musicisti/:id",
            name: "SingleMusicista",
            component: SingleMusicista
        }

    ]
});

export {router};