<template>
    <nav class="navbar text-danger ">

        <div class="container-fluid">
            <a class="navbar-brand ms-5 me-auto bfx-logo" href="#"><img src="../assets/img/logo.png" alt="logo"></a>

            <div class="me-5 d-flex me-5 bfx-searchBox">
                <ul class="navbar-nav flex-row">
                    <li class="nav-item ms-4" v-for="(link, index) in navLinks" @click="turnActive(index)">
                        <span class="nav-link" :class="(index == activeLink ? 'bfx-active' : '')"
                            @click="navSearch(link.choice)">
                            {{ link.text }}
                        </span>
                    </li>
                </ul>

                <input class="ms-4 rounded-2" type="search" name="bfx-searchBar" id="bfx-searchBar"
                    placeholder="Cosa vuoi guardare?" v-model="this.store.searchImput" @keyup.enter="startSearch()">
                <!-- <button class="rounded-2 bfx-btn" @click="startSearch">Search</button> -->

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
                    choice: "srcTrending"
                },


                {
                    text: "Movies",
                    choice: "srcMovies"
                },

                {
                    text: "Series",
                    choice: "srcSeries"
                },

            ],

            activeLink: 0

        }
    },

    methods: {

        startSearch() {
            store.searchResult = [];
            console.log("SEARCH EMPTIED", store.searchResult);
            store.searchMovies(this.store.api_movies);
            store.searchTv(this.store.api_tv);
            console.log("SEARCH RES", store.searchResult);
        },

        turnActive(index) {
            this.activeLink = index;
            this.store.navSelection = this.navLinks[index].text
            console.log(this.store.navSelection);
        },

        navSearch(argument) {
            store.searchResult = [];
            console.log("SEARCH EMPTIED", store.searchResult);
            if (argument == "srcMovies") {
                store.searchTrending(this.store.api_trend_movies);
            } else if (argument == "srcSeries") {
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