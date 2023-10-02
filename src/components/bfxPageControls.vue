<template>
    <!-- I PULSANTI DI PAGINAZIONE APPAIONO SOLO SE SONO PRESENTI PIU' PAGINE -->
    <div class="col-12 d-flex justify-content-around my-4">

        <button class="rounded-2 bfx-btn fw-bold bfx-btn" :class="page == 1 ? 'bfx-btnDisabled' : ''"
            @click="prevMovies()">Indietro</button>

        <span> Pagina {{ results.page }} di {{ results.total_pages }} </span>

        <button class="rounded-2 bfx-btn fw-bold bfx-btn" :class="page == results.total_pages ? 'bfx-btnDisabled' : ''"
            @click="nextMovies()">Avanti</button>

    </div>
</template>

<script>
// //IMPORT DELLO STORE
import { store } from '../store';

export default {

    name: "bfxPageControls",

    props: {

        results: "Object",
        page: "Number",

    },

    methods: {
        prevMovies() {
            if (this.page > 1) {
                this.page--;
            }
            this.store.searchMovies(this.store.api_movies)
        },

        nextMovies() {
            if (page < results.total_pages) {
                page++;
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
@use '../assets/scss/partials/bfxBtn.scss'
</style>