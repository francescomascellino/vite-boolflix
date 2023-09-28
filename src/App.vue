<script>

import { store } from './store';

export default {

    data() {
        return {
            store,
        }
    },

    mounted() {

        // store.searchContent(this.store.api_movies);
        // store.searchContent(this.store.api_tv);
        store.getFlag("en")

    },

    methods: {
        startSearch() {
            store.searchResult = [];
            store.searchContent(this.store.api_movies);
            store.searchTv(this.store.api_tv);
            console.log("SEARCH RES", store.searchResult);
        },

    }
}


</script>

<template>
    <header>

        <h1 class=" text-capitalize text-info text-center">BOOLFLIX BETA</h1>

        <input type="search" name="bfx-searchBar" id="bfx-searchBar" v-model="this.store.searchImput"> <button
            @click="startSearch">Search</button>

    </header>

    <main>
        <div class="container class my-4">
            <div class="row g-4">
                <div class="col-2" v-for="show in this.store.searchResult">

                    <div class="card">
                        <img class="card-img-top" src="https://picsum.photos/200" alt="">
                        <div class="card-body">
                            <p>`{{ show.title ? show.title : show.name }}`</p>
                            <p>`{{ show.original_title ? show.original_title : show.original_name }}`</p>
                            <p class="card-text">{{ show.original_title }}</p>
                            <p class="card-text">{{ show.original_language }}</p>
                            <p class="card-text">{{ show.vote_average }}</p>
                            <img class="bfx-flag" :alt="show.original_language"
                                :src="this.store.getFlag(show.original_language)" />

                            <!-- <img class="bfx-flag" :alt="show.original_language"
                                :src="'https://flagsapi.com/' + `${this.store.getFlag(show.original_language)}` + '/shiny/64.png'" /> -->

                        </div>
                    </div>

                </div>

            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.bfx-flag {
    height: 24px;
}
</style>
