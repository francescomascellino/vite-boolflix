<template>
    <header>

        <!-- NAVBAR -->
        <bfxNav />

    </header>

    <main>

        <!-- SLIDER -->
        <bfxSlider />

        <div class="container class my-4">

            <!-- IL TITOLO DEL FILTRO DI RICERCA CAMBIA A SECONDA DELLA SCELTA UTENTE (vedi bfxNav.vue) -->
            <div class="col-12">
                <h2 v-if="this.store.navSelection == 'Trending'">Le novità del momento</h2>
                <h2 v-else-if="this.store.navSelection == 'Movies'">I Film del momento</h2>
                <h2 v-else-if="this.store.navSelection == 'Series'">Le Serie TV del momento</h2>
                <h2 v-else>Perchè hai cercato "{{ this.store.navSelection }}"</h2>
            </div>

            <!-- LIST RENDERING DEI FILM E SERIE DEL MOMENTO. (VIENE RENDERIZZATO AL CARICAMENTO) -->
            <template v-if="this.store.trending">

                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">

                    <!-- MOSTRA LE CARD ASSOCIANDO LA PROP "show" A LL'OGGETTO CONTENUTO IN "store" -->
                    <bfxCards v-if="this.store.trending" :show="show" v-for="show in  this.store.trending" />

                </div>

            </template>

            <!-- LIST RENDERING DEI MOVIES SE LA RICERCA TROVA RISULTATI (QUINDI "this.store.movies" NON E' "null") -->
            <template v-if="this.store.movies">

                <div class="col-12">
                    <h3 class="ms-3">Film</h3>
                </div>

                <!-- I PULSANTI DI PAGINAZIONE APPAIONO SOLO SE SONO PRESENTI PIU' PAGINE -->
                <div class="col-12 d-flex justify-content-around my-4" v-if="this.store.movies.total_pages > 1">

                    <button class="rounded-2 bfx-btn fw-bold bfx-btn"
                        :class="this.store.moviesPage == 1 ? 'bfx-btnDisabled' : ''" @click="prevMovies()">Indietro</button>

                    <span> Pagina {{ this.store.movies.page }} di {{ this.store.movies.total_pages }} </span>

                    <button class="rounded-2 bfx-btn fw-bold bfx-btn"
                        :class="this.store.moviesPage == this.store.movies.total_pages ? 'bfx-btnDisabled' : ''"
                        @click="nextMovies()">Avanti</button>

                </div>

                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">

                    <!-- MOSTRA LE CARD ASSOCIANDO LA PROP "show" A LL'OGGETTO CONTENUTO IN "store" -->
                    <bfxCards v-if="this.store.movies" :show="show" v-for="show in  this.store.movies.results" />

                </div>

            </template>

            <!-- LIST RENDERING DEI DELLE SERIE SE LA RICERCA TROVA RISULTATI (QUINDI "this.store.tv" NON E' "null") -->
            <template v-if="this.store.tv">

                <div class="col-12">
                    <h3 class="ms-3" v-if="this.store.tv">Serie TV</h3>
                </div>

                <!-- I PULSANTI DI PAGINAZIONE APPAIONO SOLO SE SONO PRESENTI PIU' PAGINE -->
                <div class="col-12 d-flex justify-content-around my-4" v-if="this.store.tv.total_pages > 1">
                    <button class="rounded-2  ms-2 bfx-btn fw-bold bfx-btn"
                        :class="this.store.seriesPage == 1 ? 'bfx-btnDisabled' : ''" @click="prevSeries()">Indietro</button>
                    <span> Pagina {{ this.store.tv.page }} di {{ this.store.tv.total_pages }} </span>
                    <button class="rounded-2  ms-2 bfx-btn fw-bold bfx-btn"
                        :class="this.store.seriesPage == this.store.tv.total_pages ? 'bfx-btnDisabled' : ''"
                        @click="nextSeries()">Avanti</button>
                </div>

                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">

                    <!-- MOSTRA LE CARD ASSOCIANDO LA PROP "show" A LL'OGGETTO CONTENUTO IN "store" -->
                    <bfxCards v-if="this.store.tv" :show="show" v-for="show in  this.store.tv.results" />

                </div>

            </template>

        </div>

    </main>
</template>

<script>

// //IMPORT DELLO STORE
import { store } from './store';

// IMPORTA COMPONENTE MODALE DA BS
import { Modal } from 'bootstrap';

// COMPONENTI
import bfxNav from './components/bfxNav.vue';

import bfxCards from './components/bfxCards.vue';

import bfxSlider from './components/bfxSlider.vue';

export default {

    components: {
        bfxNav,
        bfxCards,
        bfxSlider
    },

    data() {
        return {

            // RICHIAMO DI STORE E COMPONENTE BS
            store,
            Modal,

        }
    },

    created() {

        // ALLA CREAZIONE MOSTRA TRENDING MOVIES & SERIES
        store.searchTrending(this.store.api_trending);

    },

    methods: {
        prevMovies() {
            if (this.store.moviesPage > 1) {
                this.store.moviesPage--;
            }
            this.store.searchMovies(this.store.api_movies)
        },
        nextMovies() {
            if (this.store.moviesPage < this.store.movies.total_pages) {
                this.store.moviesPage++;
            }
            this.store.searchMovies(this.store.api_movies)
        },

        prevSeries() {
            if (this.store.seriesPage > 1) {
                this.store.seriesPage--;
            }
            store.searchTv(this.store.api_tv);
        },
        nextSeries() {
            if (this.store.seriesPage < this.store.tv.total_pages) {
                this.store.seriesPage++;
                console.log(this.store.seriesPage);
            }
            store.searchTv(this.store.api_tv);
        }
    },

}

</script>

<style lang="scss" scoped>
@use './assets/scss/partials/variables.scss' as *;
@use './assets/scss/partials/bfxBtn.scss';
</style>
