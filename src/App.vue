<script >
import AppHeader from './components/AppHeader.vue';

export default {
  name: "App",
  data(){
    return{

    }
  },
  components: {
    AppHeader
  }
}
</script>

<template>
    <AppHeader />
    <router-view></router-view>
</template>

<style scoped>

</style>
