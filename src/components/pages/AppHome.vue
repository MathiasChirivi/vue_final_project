<script>
export default {
    name: "AppHome",
    data() {
        return {
            
        }
    }
}
</script>
<template>
    <div class="container p-0 ">
        <div class="row">
            <div class="col-8 my-5">
                <!-- titolone. -->
                <div class="col-9 titolo">
                    <h1>Trova musicisti Interessanti, gruppi, DJ e band per il tuo evento</h1>
                </div>

                <!-- search di ricerca. -->
                <div class="search col-8 d-flex align-items-center mt-5 p-4 rounded-4 bgcolor_search">
                    <!-- genere -->
                    <div class="col-2 pe-3">
                        <input class="form-control form-control-sm rounded-4" type="text" placeholder="Genere"
                            aria-label=".form-control-sm example">
                    </div>

                    <!-- Regione -->
                    <div class="col-2 pe-3">
                        <input class="form-control form-control-sm rounded-4" type="text" placeholder="Regione"
                            aria-label=".form-control-sm example">
                    </div>

                    <!-- cerca. -->
                    <div class="col-2">
                        <input class="btn btn-outline-light rounded-4" type="submit" value="Submit">
                    </div>
                </div>
            </div>

            <!-- immagine.-->
            <div class="col-4 my-5">
                <div>
                    <!-- <img class="w-100" src="../../assets/img/Progetto_senza_titolo_2.png" alt=""> -->
                </div>
            </div>

        </div>
    </div>
</template>
<style></style>