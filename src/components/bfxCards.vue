<template>
    <div class="col">

        <div class="shadow rounded-2 bfx-card">

            <div class="bfx-overlay">

                <!-- LE VARIE SEZIONI MOSTRANO name O title A SECONDA SE IL RISULTATO DA MOSTRARE SIA UN FIL O UNASERIE TV -->
                <p><span class="bfx-title text-uppercase">titolo:</span> {{ show.title ? show.title : show.name
                }}</p>

                <p><span class="bfx-title">titolo originale:</span> {{ show.original_title ?
                    show.original_title : show.original_name }}</p>

                <p class="card-text"><span class="bfx-title text-uppercase">original language: </span>

                    <!-- @error INTERCETTA L'EVENTO CHE LO HA SCATENATO E CAMBIA IL PERCORSO DELL'IMMAGINE DA MOSTRARE -->
                    <img class="bfx-flag" :alt="show.original_language"
                        :src="show.original_language == 'en' ? 'https://flagsapi.com/GB/shiny/64.png' : 'https://flagsapi.com/' + show.original_language.toUpperCase().split('_')[0] + '/shiny/64.png'"
                        @error="$event.target.src = getPlaceholderImg('../assets/img/small-globe-icon.jpg')" />

                    ({{ show.original_language.toUpperCase() }})

                </p>

                <p><span class="bfx-title text-uppercase">voto: </span>

                    <!-- DIVIDE IL VOTO PER 2 ARROTONDANDOLO E MOSTRANDO UNA STELLINA PIENA O VUOTA PER OGNI UNITA' -->
                    <span v-for=" vote  in  Math.round(show.vote_average / 2) ">
                        <i class="fa-solid fa-star"></i>
                    </span>

                    <span v-for=" vote  in  Math.round(5 - show.vote_average / 2) ">
                        <i class="fa-regular fa-star"></i>
                    </span>

                </p>

                <p><span class="bfx-title text-uppercase">sinossi: </span> {{ show.overview }}</p>

            </div>

            <img class="card-img-top bfx-poster" :alt="show.original_title ? show.original_title : show.original_name"
                :src="'https://image.tmdb.org/t/p/w342/' + `${show.poster_path}`"
                @error="$event.target.src = getPlaceholderImg('../assets/img/404.jpg')" />

        </div>

    </div>
</template>

<script>

export default {
    name: 'bfxCards',

    props: {

        show: "Object",
        movies: "Object"

    },

    methods: {
        // TRASFORMA IL PERCORSO DELL'IMMAGINE LOCALE IN UN URL
        getPlaceholderImg(url) {
            return new URL(`${url}`, import.meta.url).href
        },
    }

}
</script>

<style lang="scss" scoped>
@use '../assets/scss/partials/bfxCards.scss';
</style>