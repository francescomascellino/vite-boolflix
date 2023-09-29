<script>

import { store } from './store';

import bfxNav from './components/bfxNav.vue';

export default {

    components: {
        bfxNav
    },

    data() {
        return {

            store,

        }
    },

    created() {

        store.searchTrending(this.store.api_trending);

    },

    methods: {

        getPosterUrl(url) {
            return new URL(`${url}`, import.meta.url).href
        },

        startSearch() {
            store.searchResult = [];
            console.log("SEARCH EMPTIED", store.searchResult);
            store.searchMovies(this.store.api_movies);
            store.searchTv(this.store.api_tv);
            console.log("SEARCH RES", store.searchResult);
        },

        turnActive(index) {
            this.activeLink = index
        }

    },

}

</script>

<template>
    <header>

        <bfxNav />

    </header>

    <main>

        <div class="container class my-4">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-evenly g-4">
                <div class="col" v-for="show in  this.store.searchResult">

                    <div class="shadow bfx-card">

                        <div class="bfx-overlay">

                            <p><span class="bfx-title text-uppercase">titolo:</span> `{{ show.title ? show.title : show.name
                            }}`</p>

                            <p><span class="bfx-title">titolo originale:</span> `{{ show.original_title ?
                                show.original_title : show.original_name }}`</p>

                            <p class="card-text"><span class="bfx-title text-uppercase">original language: </span>

                                <img class="bfx-flag" :alt="show.original_language"
                                    :src="show.original_language == 'en' ? 'https://flagsapi.com/GB/shiny/64.png' : 'https://flagsapi.com/' + show.original_language.toUpperCase().split('_')[0] + '/shiny/64.png'"
                                    @error="$event.target.src = 'https://cdn3.iconfinder.com/data/icons/faticons/32/globe-01-512.png'" />

                                ({{ show.original_language.toUpperCase() }})

                            </p>

                            <p><span class="bfx-title text-uppercase">voto: </span>

                                <span v-for=" vote  in  Math.round(show.vote_average / 2) ">
                                    <i class="fa-solid fa-star"></i>
                                </span>

                                <span v-for=" vote  in  Math.round(5 - show.vote_average / 2) ">
                                    <i class="fa-regular fa-star"></i>
                                </span>

                            </p>

                            <p><span class="bfx-title text-uppercase">sinossi: </span> {{ show.overview }}</p>

                        </div>

                        <img class="card-img-top bfx-poster"
                            :alt="show.original_title ? show.original_title : show.original_name"
                            :src="'https://image.tmdb.org/t/p/w342/' + `${show.poster_path}`"
                            @error="$event.target.src = getPosterUrl('./assets/img/404.jpg')" />

                    </div>

                </div>

            </div>
        </div>

    </main>
</template>

<style lang="scss" scoped>
@use './assets/scss/partials/bfxCards.scss';

@use './assets/scss/partials/bfxNav.scss';

@use './assets/scss/partials/variables.scss' as *;
</style>
