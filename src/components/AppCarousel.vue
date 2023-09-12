<script>
import axios from 'axios';
import { store } from '../store';

import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
export default (await import('vue')).defineComponent({
  name: 'AppCarousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      store,
      modules: [Navigation],
      users: [],

    };
  },
  methods: {
    getUserWithSponsor() {
      axios.get(this.store.apiUrl + this.store.usersApi).then(response => {
        this.users = response.data.results.data;
      }).catch(err => {
        this.loadingError = err.message;
        this.$router.push({ name: 'error', params: { code: 404 } })
      })
    },
  },
  mounted() {
    this.getUserWithSponsor();
  },
});
</script>
<template>
  <div class="col-12 d-flex justify-content-center mb-4 pb-4 ">
    <h2 class="text-center text-white">Scopri I Musicisti In Evidenza</h2>
  </div>
  <swiper ref="{swiperRef}" :slidesPerView="3" :centeredSlides="true" :spaceBetween="30" :navigation="true"
    :modules="modules" class="mySwiper">


    <swiper-slide v-for="user in users">
      <div v-if="user.has_active_sponsorship === 1">
        <img class="round w-50" :src="store.storageUrl + user.img" />
        <div class="col-6 rounded-4 mt-2 p-2 text-white text-center bg_color">{{ user.name }}</div>
      </div>
    </swiper-slide>

  </swiper>
  <p class="append-buttons"></p>
</template>


<style scoped lang="scss">
.bg_color {
  background-color: #4b5b8bd5;
}
</style>