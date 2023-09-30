<template>
    <div class="card shadow">

        <div class="bfx-card-overlay">

            <p>`{{ serie.title ? serie.title :
                serie.name
            }}`</p>

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

        </div>

        <img class="card-img-top bfx-poster" :alt="serie.original_title ? serie.original_title : serie.original_name"
            :src="'https://image.tmdb.org/t/p/w342/' + `${serie.poster_path}`"
            @error="$event.target.src = getPlaceholderImg('../assets/img/404.jpg')" />

    </div>
</template>

<script>
export default {

    props: {

        serie: "Object"

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