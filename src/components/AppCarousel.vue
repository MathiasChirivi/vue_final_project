<script>
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
            modules: [ Navigation],
        };
    },
});
</script>
<template>  <swiper
    ref="{swiperRef}"
    :slidesPerView="3"
    :centeredSlides="true"
    :spaceBetween="30"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443378767175690/musicista1.jpeg">
        <div>Stelle</div>
    </swiper-slide>
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443379035615372/musicista2.jpeg"></swiper-slide>
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443379325030523/musicista3.jpeg"></swiper-slide>
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443379597647914/musicista4.jpeg"></swiper-slide>
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443379597647914/musicista4.jpeg"></swiper-slide>
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443379597647914/musicista4.jpeg"></swiper-slide>
  </swiper>

  <p class="append-buttons"></p></template>
<style></style>