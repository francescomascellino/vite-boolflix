<template>
    <!-- MODALE -->

    <!--     <div class="modal fade bfx-modal" :id="`bfx-sliderModal${serie.id}`" tabindex="-1"
        :aria-labelledby="`bfx-sliderModal${serie.id}Label`" aria-hidden="true">

        <div class="modal-dialog modal-dialog-centered z-n1">

            <div class="modal-content">

                <div class="modal-header">

                    <h1 class="modal-title fs-5" :id="`bfx-sliderModal${serie.id}Label`">`{{ serie.title ? serie.title :
                        serie.name
                    }}`</h1>

                    <button type="button" class=" btn-close btn-close-white " data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>

                <div class="modal-body text-wrap">

                    <p>Titolo originale: `{{ serie.original_title ? serie.original_title :
                        serie.original_name
                    }}`</p>

                    <p>Prima messa in onda: {{ serie.first_air_date }}</p>

                    <p>Sinossi: {{ serie.overview }} SAREBBE BELLO LEGGERE QUALCOSA, MA LE AIRING TODAY HANNO COME
                        SINOSSI
                        UNA
                        BELLISSIMA STRINGA DESERTA.</p>

                </div>

            </div>
        </div>
    </div> -->

    <!-- SLIDER CARDS -->
    <div class="card shadow" data-bs-toggle="modal" :data-bs-target="`#bfx-sliderModal${serie.id}`">

        <div class="text-wrap bfx-card-overlay">

            <p>{{ serie.title ? serie.title :
                serie.name
            }}</p>

            <p class="card-text"><span class="bfx-title text-uppercase">original language: </span>

                <img class="bfx-flag" :alt="serie.original_language"
                    :src="serie.original_language == 'en' ? 'https://flagsapi.com/GB/shiny/64.png' : 'https://flagsapi.com/' + serie.original_language.toUpperCase().split('_')[0] + '/shiny/64.png'"
                    @error="$event.target.src = getPlaceholderImg('../assets/img/small-globe-icon.jpg')" />

            </p>

            <p><span class="bfx-title text-uppercase">voto: </span>

                <span v-for=" vote  in  Math.round(serie.vote_average / 2) ">
                    <i class="fa-solid fa-star"></i>
                </span>

                <span v-for=" vote  in  Math.round(5 - serie.vote_average / 2) ">
                    <i class="fa-regular fa-star"></i>
                </span>

            </p>

            <p>Clicca per maggior saperne di più</p>

        </div>

        <img class="card-img-top bfx-poster" :alt="serie.original_title ? serie.original_title : serie.original_name"
            :src="'https://image.tmdb.org/t/p/w342/' + `${serie.poster_path}`"
            @error="$event.target.src = getPlaceholderImg('../assets/img/404.jpg')" />

    </div>
</template>

<script>

import { Modal } from 'bootstrap';

export default {

    props: {

        serie: "Object"

    },

    data() {
        return {

            Modal,

        }
    },

    methods: {
        getPlaceholderImg(url) {
            return new URL(`${url}`, import.meta.url).href
        },
    }

}
</script>

<style lang="scss" scoped>
@use '../assets/scss/partials/bfxSliderCard.scss';
</style>