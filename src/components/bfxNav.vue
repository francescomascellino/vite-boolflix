<template>
    <nav class="navbar text-danger ">

        <div class="container-fluid">
            <a class="navbar-brand ms-5 me-auto bfx-logo" href="#"><img src="../assets/img/logo.png" alt="logo"></a>

            <div class="me-5 d-flex me-5 bfx-searchBox">
                <ul class="navbar-nav flex-row">
                    <li class="nav-item ms-4" v-for="(link, index) in navLinks" @click="turnActive(index)">
                        <!-- SE "index" e "activeLink" SONO UGUALI ASSEGNA LA CLASSE "bfx-active" -->
                        <span class="nav-link" :class="(index == activeLink ? 'bfx-active' : '')"
                            @click="navSearch(link.text)">
                            {{ link.text }}
                        </span>
                    </li>
                </ul>

                <input class="ms-4 rounded-2" type="search" name="bfx-searchBar" id="bfx-searchBar" required
                    placeholder="Cosa vuoi guardare?" v-model="this.store.searchImput" @keyup.enter="startSearch()">
                <button class="rounded-2  ms-2 bfx-btn fw-bold" @click="startSearch">Cerca</button>

            </div>

        </div>
    </nav>
</template>

<script>

import { store } from '../store';

export default {
    name: "bfxNav",

    data() {
        return {

            store,

            navLinks: [

                {
                    text: "Trending",
                },


                {
                    text: "Movies",
                },

                {
                    text: "Series",
                },

            ],

            activeLink: 0

        }
    },

    methods: {

        // RICERCA TRAMITE INPUT (FILM + SERIE)
        startSearch() {

            // SE IL CAMPO DI RICERCA NON E' VUOTO...
            if (store.searchImput.length > 0) {

                // SVUOTA L'ARRAY DEI RISULTATI DI RICERCA
                // store.searchResult = [];
                // console.log("SEARCH EMPTIED", store.searchResult);

                store.trending = null;

                // ASSEGNA A "navSelection" IL VALORE DEL CAMPO DI RICERCA PER MODIFICARE IL TITOLO IN "App.vue"
                store.navSelection = store.searchImput;

                // ASSEGNA ALLA QUERY DELLA CHIAMATA IL VALORE DEL CAMPO DI RICERCA
                store.query = store.searchImput;

                // IMPOSTA LA PAGINA INIZIALE SU 1
                store.moviesPage = 1;

                // CERCA SIA FILM CHE SERIE CORRISPONDENTI A "searchImput (VEDI FUNZIONI DI RICERCA SU "store.js")"
                store.searchMovies(this.store.api_movies);
                store.searchTv(this.store.api_tv);
                // console.log("SEARCH RES", store.searchResult);

                store.searchImput = "";
            }

        },

        turnActive(index) {

            // ASSEGNA AD "activeLink" IL VALORE DI "index", TRIGGERANDO IL CAMBIO DI CLASSE
            this.activeLink = index;

            // ASSEGNA A NAV SELECYION IL VALORE DEL TESTO DEL MENU' DELLA NAVBAR, TRIGGERANDO IL CAMBIO DI TITOLO IN App.vue
            this.store.navSelection = this.navLinks[index].text
            console.log(this.store.navSelection);
        },

        // RICERCHE FISSE TRAMITE LINK NAVBAR (TRENDING SERIES, TRENDING MOVIES O TRENDING MOVIES + SERIES)
        navSearch(argument) {

            // SVUOTA IL CAMPO DI RICERCA
            // store.searchResult = [];
            // console.log("SEARCH EMPTIED", store.searchResult);

            store.movies = null;
            store.tv = null;

            // A SECONDA DELL LINK CLICKATO EFFETTUA UNA RICERCA DIVERSA
            if (argument == "Movies") {
                store.searchTrending(this.store.api_trend_movies);
            } else if (argument == "Series") {
                store.searchTrending(this.store.api_trend_tv);
            } else {
                store.searchTrending(this.store.api_trending);
            }

        },

    },

}
</script>

<style lang="scss" scoped>
@use '../assets/scss/partials/bfxNav.scss';
</style>