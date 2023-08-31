<script>

</script>

<template>
    <div class="container pb-5">

        <div class="row d-flex justify-content-center">
            <!-- titolo. -->
            <div class="col-6 mt-4 pt-5">
                <h2 class="text-center">La Giusta Musica Per I Tuoi Eventi</h2>
            </div>

            <!-- contenitore card eventi. -->
            <div class="col-12 d-md-flex justify-content-center pt-4 ">

                <!-- prima card. -->
                <div class="col-3 d-flex flex-column align-items-center justify-content-evenly rounded-4 me-5 card">
                    <!-- titolo. -->
                    <div class="col-4">
                        <h6 class="text-center">Musica Per Compleanno</h6>
                    </div>

                    <!-- testo. -->
                    <div class="col-8">
                        <p class="text-center">La musica a una festa di compleanno o a un anniversario è un elemento
                            chiave,Ma come trovare i musicisti più adatti? Su BoolMusic basta selezionare il Genere per
                            visualizzare tutti i musicisti.</p>
                    </div>
                </div>

                <!-- seconda card. -->
                <div class="col-3 d-flex flex-column align-items-center justify-content-evenly rounded-4 me-5 card">
                    <!-- titolo. -->
                    <div class="col-4">
                        <h6 class="text-center">Musica Per Matrimonio</h6>
                    </div>

                    <!-- testo. -->
                    <div class="col-8">
                        <p class="text-center">La musica a un matrimonio, sia durante il ricevimento che come sottofondo
                            della celebrazione in chiesa o civile, ha un ruolo importantissimo e può rendere questo giorno
                            ancora più speciale.</p>
                    </div>
                </div>

                <!-- terza card. -->
                <div class="col-3 d-flex flex-column align-items-center justify-content-evenly rounded-4 card">
                    <!-- titolo. -->
                    <div class="col-4">
                        <h6 class="text-center">Musica Per Festa Privata</h6>
                    </div>

                    <!-- testo. -->
                    <div class="col-8">
                        <p class="text-center">La musica a una festa può far divertire, cantare o ballare. Per Questo il
                            giusto dj, cantante o band dal vivo potrà renderla ancora più divertente e memorabile.</p>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style scoped lang="scss">
.card {
    background-color: #4B5B8B;
    min-height: 350px;
    transition: all 0.5s;

    box-shadow: 12px 17px 51px rgba(61, 61, 61, 0.603);
    backdrop-filter: blur(6px);
    background: #4b5b8bb9;
}

.card:hover {
    border: 1px solid black;
    transform: scale(1.05);
}

.card:active {
    transform: scale(0.95) rotateZ(1.7deg);
}</style>