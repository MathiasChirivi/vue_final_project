<script>
export default {
    name: "AppHeader",
    data() {
        return {
            navLinks: [
                { label: "Home", name: "Home" },
                { label: "Generi", name: "Generi" },
                { label: "Musicisti", name: "Musicisti" },
            ]
        }
    },
    methods: {

    }
}
</script>

<template>
    <div class="container prova header_bg p-0">
        <nav class="navbar navbar-expand-lg bg_navbar rounded-5 p-0">
            <div class="container p-0">
                <!-- logo. -->
                <div class="col-lg-3 mx-4">
                    <a class="navbar-brand" href="#">
                        <img src="../assets/img/logoProva.png" alt="Logo" class="d-inline-block align-text-top">
                    </a>
                </div>
                <!-- hamburger. -->
                <button class="bg-transparent btn btn-light d-lg-none me-4" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel">

                    <div class="offcanvas-header bgHeaderSm">
                        <h5 class="offcanvas-title text-white" id="offcanvasRightLabel">Tutto Quello Che Ti Serve</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div class="offcanvas-body bgHeaderSm d-flex justify-content-lg-end">
                        <ul class="navbar-nav mb-2 mb-lg-0">
                            <li v-for="navLink in navLinks" class="nav-item my-2">
                                <router-link class="nav-link fs-5 me-3 text-white" :to="{ name: navLink.name }">{{
                                    navLink.label }}</router-link>
                            </li>

                            <!-- login/register. -->
                            <li>
                                <a class="nav-link fs-5 my-2 me-2 text-white" href="http://localhost:8000/login">Login</a>
                            </li>

                            <li>
                                <a class="nav-link fs-5 my-2 text-white" href="http://localhost:8000/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped lang="scss">

.header_bg {
    background-color: #00000000;
    position: relative;
    z-index: 999;
}

@media (max-width: 992px) {
  .bgHeaderSm{
    background-color: rgba(11, 11, 11, 0.823) !important; //Ricorda di usare RGBA perchè il colore con # non lo prende 
  }
}



</style>