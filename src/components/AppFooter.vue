<script>
export default{
    name: "AppFooter",
    data(){
        return{

        }
    }
}
</script>

<template>
    <div class="container pt-4 pb-4 ">
        <div class="row">
            <!-- logo footer. -->
            <div class="d-none d-md-block col-md-4 pt-4">
                <img src="../assets/img/logoProva.png" alt="">
            </div>

            <!-- link footer. -->
            <div class="col-12 col-md-7 d-flex pt-4">

                <!-- mondo boolmusic. -->
                <div class="col-4">
                    <h6 class="text-white">Mondo BoolMusic</h6>

                    <div class="d-flex flex-column pt-4">
                        <a href="#" class="link">Generi</a>
                        <a href="#" class="link">Eventi</a>
                        <a href="#" class="link">Blog</a>
                        <a href="#" class="link">Linkedin</a>
                    </div>
                </div>

                <!-- altre info. -->
                <div class="col-4">
                    <h6 class="text-white">Altre Info</h6>

                    <div class="d-flex flex-column pt-4">
                        <a href="#" class="link">Dati della Società</a>
                        <a href="#" class="link">Condizioni Legali</a>
                        <a href="#" class="link">Cookie Policy</a>
                    </div>
                </div>

                <!-- altri paesi. -->
                <div class="col-4">
                    <h6 class="text-white">Altri Paesi</h6>

                    <div class="d-flex flex-column pt-4">
                        <a href="#" class="link">Spagna</a>
                        <a href="#" class="link">Francia</a>
                        
                        <div class="pt-4">
                            <p class="text-white">Seguici su Linkedin</p>
                        </div>

                        <!-- icone linkedin. -->
                        <div class="d-flex flex-wrap flex-column">
                            <span class="text-white pe-2 me-3">
                                <a class="me-2 text-white" target="_blank" href= "https://www.linkedin.com/in/davidetaribelli">Davide</a>
                                <font-awesome-icon icon="fa-brands fa-linkedin" />
                            </span>
                            <span class="text-white pe-2 me-3">
                                <a class="me-2 text-white" target="_blank" href="https://www.linkedin.com/in/mathias-chirivi/">Mathias</a>
                                <font-awesome-icon icon="fa-brands fa-linkedin" />
                            </span>
                            <span class="text-white pe-2 me-3">
                                <a class="me-2 text-white" target="_blank" href="https://www.linkedin.com/in/giadapirone/">Giada</a>
                                <font-awesome-icon icon="fa-brands fa-linkedin" />
                            </span>
                            <span class="text-white pe-2 me-3">
                                <a class="me-2 text-white" target="_blank" href="https://www.linkedin.com/in/federico-finco/">Federico</a>
                                <font-awesome-icon icon="fa-brands fa-linkedin" />
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="row">
            <div class="col-12 d-flex justify-content-center pt-4">               
                <p class="text-white text-center"><small>Copyright <span><font-awesome-icon icon="fa-solid fa-copyright" /></span> 2023 BoolMusic | All rights reserved</small></p>                
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
    .link{
        color: white;
        text-decoration: none;
    }

</style>