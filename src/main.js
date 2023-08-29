import { createApp, reactive } from 'vue'
import App from './App.vue'
import {router} from './router'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
library.add(faLocationDot)

import { faMusic } from '@fortawesome/free-solid-svg-icons'
library.add(faMusic)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
