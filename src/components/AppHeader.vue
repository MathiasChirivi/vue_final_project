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
    }
}
</script>

<template>
    <div class="container p-0">
        <nav class="navbar navbar-expand-lg bg_navbar rounded-5">
            <div class="container p-0">
                <div class="col-lg-3 mx-4">
                    <a class="navbar-brand" href="#">
                        <img src="" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                        Nome Sito
                    </a>
                </div>
                <!-- bottone a scomparsa -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="col-lg-3 flex-grow-0 collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li v-for="navLink in navLinks" class="nav-item my-2">
                            <router-link class="nav-link badge btnColor fs-5 me-3" :to="{ name: navLink.name }">{{
                                navLink.label }}</router-link>
                        </li>
                    </ul>
                </div>

                <div class="col-lg-3 login_ collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <a class="nav-link badge btnColor fs-5 my-2 me-2" href="http://localhost:8000/login">Login</a>
                    <a class="nav-link badge btnColor fs-5 my-2" href="http://localhost:8000/register">Register</a>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped lang="scss">
// .bg_navbar{
//     background-color:#5c75d1e0;
// }
// .btnColor{
//     background-color: #8999da;
// }

.titolo {
    display: flex;
    justify-content: flex-start;
    height: 100px;

}

.bgcolor_search {
    background-color: rgba(255, 255, 255, 0.493);
}

.img {
    width: 100%;
}
</style>