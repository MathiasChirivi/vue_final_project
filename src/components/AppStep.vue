<script>
import { store } from '../store'

export default {
    name: "AppStep",

    data() {
        return {
            store,
        }
    },
    methods: {
        getImgPath(imgPath) {
            return new URL(imgPath, import.meta.url).href;

        },
    }
}
</script>

<template>
    <div class="container pb-5">

        <div class="row d-sm-block d-flex justify-content-center pt-5 pb-5">
            <!-- titolo. -->
            <div class="col-12 pt-4 pb-4">
                <h2 class="text-center">Cercare Musicisti Non è Stato Mai Così Semplice</h2>
            </div>

            <!-- card. -->
            <div class="d-sm-flex justify-content-center">
                <div v-for="step in store.steps" class="w-75  pt-4 me-sm-3 mb-3 mx-auto">

                    <!-- logo. -->
                    <div class="text-center col-sm-12">
                        <img :src="getImgPath(step.logo)" class="text-center" alt="">
                    </div>

                    <!-- titolo. -->
                    <div class="row d-flex justify-content-center">
                        <h5 class="text-center">{{ step.title }}</h5>
                    </div>

                    <!-- testo. -->
                    <div class="row d-flex justify-content-center ">
                        <p class="text-center">{{ step.text }}</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>