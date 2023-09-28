<script>

import { store } from './store';

export default {

    data() {
        return {
            store,
        }
    },

    mounted() {

    },

    methods: {
        startSearch() {
            store.searchResult = [];
            console.log("SEARCH EMPTIED", store.searchResult);
            store.searchContent(this.store.api_movies);
            store.searchTv(this.store.api_tv);
            console.log("SEARCH RES", store.searchResult);
        },

    }
}


</script>

<template>
    <header>

        <div class="d-flex align-content-center justify-content-center bfx-logo">
            <img src="./assets/img/logo.png" alt="logo">
        </div>

        <div class="d-flex align-content-center justify-content-end me-5 bfx-searchBox">
            <input class="me-2 rounded-2" type="search" name="bfx-searchBar" id="bfx-searchBar"
                v-model="this.store.searchImput">
            <button class="rounded-2 bfx-btn" @click="startSearch">Search</button>
        </div>ox



    </header>

    <main>
        <div class="container class my-4">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-evenly g-4">
                <div class="col" v-for="show in this.store.searchResult">

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

                                <span v-for="vote in Math.round(show.vote_average / 2)">
                                    <i class="fa-solid fa-star"></i>
                                </span>

                                <span v-for="vote in Math.round(5 - show.vote_average / 2)">
                                    <i class="fa-regular fa-star"></i>
                                </span>

                            </p>

                            <p><span class="bfx-title text-uppercase">sinossi: </span> {{ show.overview }}</p>

                        </div>

                        <img class="card-img-top bfx-poster"
                            :alt="show.original_title ? show.original_title : show.original_name"
                            :src="'https://image.tmdb.org/t/p/w342/' + `${show.poster_path}`"
                            @error="$event.target.src = 'src/assets/img/404.jpg'" />

                    </div>

                </div>

            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use './assets/scss/partials/bfxCards.scss';

@use './assets/scss/partials/variables.scss' as *;

.bfx-logo img {
    height: 100px;
}

.bfx-btn {
    // vertical-align: middle;
    border: none;
    // border-radius: 5px;
    padding: 0.3rem 0.8rem;
    background-color: $bfx-accent;
    color: $bfx-primary;
}
</style>
