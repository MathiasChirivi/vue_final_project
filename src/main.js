import { createApp, reactive } from 'vue'
import App from './App.vue'
import {router} from './router'

import 'swiper/css';
import 'swiper/css/pagination';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
library.add(faLocationDot)

import { faMusic } from '@fortawesome/free-solid-svg-icons'
library.add(faMusic)

import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
library.add(faMoneyBill)

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass)

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight)

import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
library.add(faArrowLeft)

import { faStar } from '@fortawesome/free-solid-svg-icons';
library.add(faStar)

import { faPhone } from '@fortawesome/free-solid-svg-icons';
library.add(faPhone)

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
library.add(faWhatsapp)

import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowLeftLong)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
