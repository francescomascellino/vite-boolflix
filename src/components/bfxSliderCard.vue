<template>
    <div class="card shadow">


        <div class="bfx-card-overlay">

            <p>`{{ serie.title ? serie.title :
                serie.name
            }}`</p>

            <p class="card-text"><span class="bfx-title text-uppercase">original language: </span>

                <img class="bfx-flag" :alt="serie.original_language"
                    :src="serie.original_language == 'en' ? 'https://flagsapi.com/GB/shiny/64.png' : 'https://flagsapi.com/' + serie.original_language.toUpperCase().split('_')[0] + '/shiny/64.png'"
                    @error="$event.target.src = 'https://cdn3.iconfinder.com/data/icons/faticons/32/globe-01-512.png'" />

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
            @error="$event.target.src = getPosterUrl('../assets/img/404.jpg')" />

    </div>
</template>

<script>
export default {

    props: {

        serie: "Object"

    },

    methods: {
        getPosterUrl(url) {
            return new URL(`${url}`, import.meta.url).href
        },
    }

}
</script>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;

.card {
    width: 171px;
    margin-right: 10px;
    display: inline-flex;
    height: 256px;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
    background-color: $bfx-dark;

    img {
        height: 100%;
    }
}

.bfx-card-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: $bfx-darkOverlay;
    display: none;
    color: $bfx-primary;
    padding: 5px;
    overflow-y: scroll;

    p {
        vertical-align: middle;
        font-size: small;
        line-break: strict;
    }

    .bfx-flag {
        height: 24px;
    }
}

.card:hover .bfx-card-overlay {
    display: block;
}
</style>