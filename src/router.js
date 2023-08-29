import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import AppMusicisti from './pages/AppMusicisti.vue';
import SingleMusicista from './pages/SingleMusicista.vue';


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            name: "Home",
            component:AppHome
        },
        {
            path: "AppAbout",
            name: "About-us",
            component: AppAbout
        },
        {
            path: "/Musicisti",
            name: "Musicisti",
            component: AppMusicisti
        },
        {
            path: "/Musicisti/:id",
            name: "SingleMusicista",
            component: SingleMusicista
        },


    ]
});

export {router};