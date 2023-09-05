<script>

export default {
    name: "AppNuovoProfilo",

    data() {
        return {

        }
    }
}
</script>

<template>
    <div class="container pt-4 pb-4 mt-4 mb-4">

        <div class="row justify-content-center">
            <div class="col-11 col-sm-12 d-flex rounded-4 pt-4 pb-4 card">

                <div class="row justify-content-center">
                    <!-- immagine. -->
                    <div class="col-11 col-sm-5 d-sm-flex">
                        <img src="../assets/img/profilo_musicista.jpg" alt="" class="rounded-4 shadow w-100">
                    </div>

                    <div class="col-11 col-sm-7 d-sm-flex flex-sm-column justify-content-sm-evenly">
                        <!-- titolo crea profilo. -->
                        <div class="col-12 col-sm-11 text-center pb-4 pt-4">
                            <h2>Amplifica Le Tue Note In Una Melodia Di Opportunità Con Il Nostro Straordinario Servizio Per Musicisti.</h2>
                        </div>

                        <!-- bottone crea profilo. -->
                        <div class="col-12 d-flex justify-content-center pt-4 ">
                            <button class="button">
                                <a href="http://localhost:8000/register" class="text-decoration-none text-white" role="" >Crea Il Tuo Profilo</a>
                            </button>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>


<style scoped lang="scss">
.card {
    background-color: #4B5B8B;
    transition: all 0.5s;

    box-shadow: 12px 17px 51px rgba(61, 61, 61, 0.603);
    backdrop-filter: blur(6px);
    background: #4b5b8bb9;
}

.card:hover {
    transform: scale(1.05);
}

.card:active {
    transform: scale(0.95) rotateZ(1.7deg);
}


button {
 --glow-color: rgb(217, 176, 255);
 --glow-spread-color: rgba(191, 123, 255, 0.781);
 --enhanced-glow-color: rgb(231, 206, 255);
 --btn-color: rgb(100, 61, 136);
 border: .25em solid var(--glow-color);
 padding: 1em 3em;
 color: var(--glow-color);
 font-size: 15px;
 font-weight: bold;
 background-color: var(--btn-color);
 border-radius: 1em;
 outline: none;
 box-shadow: 0 0 1em .25em var(--glow-color),
        0 0 4em 1em var(--glow-spread-color),
        inset 0 0 .75em .25em var(--glow-color);
 text-shadow: 0 0 .5em var(--glow-color);
 position: relative;
 transition: all 0.3s;
}

button::after {
 pointer-events: none;
 content: "";
 position: absolute;
 top: 120%;
 left: 0;
 height: 100%;
 width: 100%;
 background-color: var(--glow-spread-color);
 filter: blur(2em);
 opacity: .7;
 transform: perspective(1.5em) rotateX(35deg) scale(1, .6);
}

button:hover {
 color: var(--btn-color);
 background-color: var(--glow-color);
 box-shadow: 0 0 1em .25em var(--glow-color),
        0 0 4em 2em var(--glow-spread-color),
        inset 0 0 .75em .25em var(--glow-color);
}

button:active {
 box-shadow: 0 0 0.6em .25em var(--glow-color),
        0 0 2.5em 2em var(--glow-spread-color),
        inset 0 0 .5em .25em var(--glow-color);
}
</style>