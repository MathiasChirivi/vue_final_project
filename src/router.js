import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './components/pages/AppHome.vue';
import AppAbout from './components/pages/AppAbout.vue';
import AppMusicisti from './components/pages/AppMusicisti.vue';
import SingleMusicista from './components/pages/SingleMusicista.vue';
import AppLogin from './components/pages/AppLogin.vue';


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            name: "Home",
            component:AppHome
        },
        {
            path: "/AppAbout",
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
        {
            path: "/Login",
            name: "Login",
            component: AppLogin
        },


    ]
});

export {router};