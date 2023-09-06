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
                <button class="bg-transparent btn btn-light d-md-none me-4" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="offcanvas offcanvas-end " tabindex="-1" id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel">

                    <div class="offcanvas-header bgHeaderSm">
                        <h5 class="offcanvas-title text-white" id="offcanvasRightLabel">Tutto Quello Che Ti Serve</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div class="offcanvas-body bgHeaderSm">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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

                <!-- search. -->
                <div class="inputBox1 d-flex d-none d-md-block">
                    <input type="search" required="required" placeholder="Cerca Musicista">
                    <!-- <button class="btn btn-outline-light" type="submit">Search</button> -->
                </div>

            </div>
        </nav>
    </div>
</template>

<style scoped lang="scss">
.titolo {
    display: flex;
    justify-content: flex-start;
    height: 100px;
}

.header_bg {
    background-color: #00000000;
    position: relative;
    z-index: 999;
}


.inputBox1 input {
  width: 100%;
  padding: 10px;
  outline: none;
  border: none;
  color: #fffcfcb7;
  font-size: 1em;
  background: transparent;
  border-left: 2px solid #fffffffa;
  border-bottom: 2px solid #ffffffe5;
  transition: 0.1s;
  border-bottom-left-radius: 8px;
}
@media (max-width: 425px) {
  .bgHeaderSm{
    background-color: #2222; /* Colore per i telefoni */
  }
}

</style>