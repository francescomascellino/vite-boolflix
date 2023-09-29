<template>
    <nav class="navbar text-danger ">

        <div class="container-fluid">
            <a class="navbar-brand ms-5 me-auto bfx-logo" href="#"><img src="../assets/img/logo.png" alt="logo"></a>

            <div class="me-5 d-flex me-5 bfx-searchBox">
                <ul class="navbar-nav flex-row">
                    <li class="nav-item ms-4" v-for="(link, index) in navLinks" @click="turnActive(index)">
                        <span class="nav-link" :class="(index == activeLink ? 'bfx-active' : '')" @click="link.path">
                            {{ link.text }}
                        </span>
                    </li>
                </ul>

                <input class="ms-4 rounded-2" type="search" name="bfx-searchBar" id="bfx-searchBar"
                    placeholder="Cosa vuoi guardare?" v-model="this.store.searchImput" @keyup.enter="$emit('bfxSearch')">
                <!-- <button class="rounded-2 bfx-btn" @click="startSearch">Search</button> -->

            </div>

        </div>
    </nav>
</template>

<script>

import { store } from '../store';

export default {
    name: "bfxNav",

    emits: ['bfxSearch'],

    data() {
        return {

            store,

            navLinks: [

                {
                    text: "Trending",
                    path: store.searchMovies(store.api_movies)
                },


                {
                    text: "Movies",
                    path: store.searchMovies(store.api_movies)
                },

                {
                    text: "Series",
                    path: store.searchMovies(store.api_movies)
                },

            ],

            activeLink: 0

        }
    },

    methods: {
        /*         startSearch() {
                    store.searchResult = [];
                    console.log("SEARCH EMPTIED", store.searchResult);
                    store.searchMovies(this.store.api_movies);
                    store.searchTv(this.store.api_tv);
                    console.log("SEARCH RES", store.searchResult);
                }, */

        turnActive(index) {
            this.activeLink = index
        }

    },

}
</script>

<style lang="scss" scoped>
@use '../assets/scss/partials/bfxNav.scss'
</style>