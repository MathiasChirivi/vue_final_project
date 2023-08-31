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
    <div v-if="Math.ceil(itemRate) === 0" class="raitStar">
        <div class="d-flex align-items-center raitStar pt-1">
            <img src="../../src/assets/img/starGrey.png" v-for="starGrey in (5 - (Math.ceil(itemRate)))">
        </div>
    </div>
    <!-- GESTIAMO LE STELLE, SE IL FILM E' STATO VOTATO -->
    <div v-else class="d-flex align-items-center raitStar">
        <img src="../../src/assets/img/Gold_Star.png" v-for="star in Math.ceil(itemRate)">
        <img src="../../src/assets/img/starGrey.png" v-for="starGrey in (5 - (Math.ceil(itemRate)))">
    </div>
</template>

<style lang="scss" scoped>
.raitStar {
    img {
        height: 25px;
    }
}
</style>