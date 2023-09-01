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
<template>  

  <div class="col-12 d-flex justify-content-center mb-4 pb-4 ">
    <h2 class="text-center">Scopri I Musicisti In Evidenza</h2>
  </div>
  <swiper
    ref="{swiperRef}"
    :slidesPerView="3"
    :centeredSlides="true"
    :spaceBetween="30"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >

  
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443378767175690/musicista1.jpeg">
        <div class="col-8 rounded-4 mt-2 p-2 text-white bg_color">
          Band i Violinisti
        </div>
    </swiper-slide>
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443379035615372/musicista2.jpeg">
        <div class="col-8 rounded-4 mt-2 p-2 text-white bg_color">
          Band i Violinisti
        </div>
    </swiper-slide>
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443379325030523/musicista3.jpeg">
        <div class="col-8 rounded-4 mt-2 p-2 text-white bg_color">
          Band i Violinisti
        </div>
    </swiper-slide>
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443379597647914/musicista4.jpeg">
        <div class="col-8 rounded-4 mt-2 p-2 text-white bg_color">
          Band i Violinisti
        </div>
    </swiper-slide>
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443379597647914/musicista4.jpeg">
        <div class="col-8 rounded-4 mt-2 p-2 text-white bg_color">
          Band i Violinisti
        </div>
    </swiper-slide>
    <swiper-slide><img src="https://cdn.discordapp.com/attachments/1143106499103694858/1146443379597647914/musicista4.jpeg">
        <div class="col-8 rounded-4 mt-2 p-2 text-white bg_color">
          Band i Violinisti
        </div>
    </swiper-slide>
  </swiper>

  <p class="append-buttons"></p></template>


<style scoped lang="scss">

.bg_color{
  background-color: #4b5b8bd5;
}


</style>