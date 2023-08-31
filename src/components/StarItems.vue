<script>
export default {
    name: "StarItems",
    props: {
        itemRate: Number
    }
}
</script>

<template>
    <!-- GESTIAMO LE STELLE, SE IL FILM NON E' STATO VOTATO -->
    <div v-if="Math.ceil(itemRate / 2) === 0" class="raitStar">
        <div class="d-flex align-items-center raitStar pt-1">
            <h5 class="pe-2">Voto:</h5>
            <img src="../../src/assets/img/starGrey.png" v-for="starGrey in (5 - (Math.ceil(itemRate / 2)))">
        </div>
    </div>
    <!-- GESTIAMO LE STELLE, SE IL FILM E' STATO VOTATO -->
    <div v-else class="d-flex align-items-center raitStar pt-1">
        <h5 class="pe-2">Voto:</h5>
        <img src="../../src/assets/img/Gold_Star.png" v-for="star in Math.ceil(itemRate / 2)">
        <img src=" src/assets/starGrey.png" v-for="starGrey in (5 - (Math.ceil(itemRate / 2)))">
    </div>
</template>

<style lang="scss" scoped>
.raitStar {
    img {
        height: 25px;
    }
}
</style>