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

        <h1 class=" text-capitalize text-info text-center">BOOLFLIX BETA</h1>

        <input type="search" name="bfx-searchBar" id="bfx-searchBar" v-model="this.store.searchImput"> <button
            @click="startSearch">Search</button>

    </header>

    <main>
        <div class="container class my-4">
            <div class="row g-4">
                <div class="col-2" v-for="show in this.store.searchResult">

                    <div class="card">

                        <img class="card-img-top" :alt="show.original_title ? show.original_title : show.original_name"
                            :src="'https://image.tmdb.org/t/p/w342/' + `${show.poster_path}`" />

                        <div class="card-body">

                            <p>TITOLO: `{{ show.title ? show.title : show.name }}`</p>

                            <p>TITOLO ORIGINALE: `{{ show.original_title ? show.original_title : show.original_name }}`</p>

                            <p class="card-text"> Original Language:

                                <img class="bfx-flag" :alt="show.original_language"
                                    :src="show.original_language == 'en' ? 'https://flagsapi.com/GB/shiny/64.png' : 'https://flagsapi.com/' + show.original_language.toUpperCase().split('_')[0] + '/shiny/64.png'" />

                                ({{ show.original_language.toUpperCase() }})

                            </p>


                            <p class="card-text">{{ show.vote_average }} <i class="fa-solid fa-star"></i></p>

                            <span v-for="vote in Math.round(show.vote_average / 2)">
                                <i class="fa-solid fa-star"></i>
                            </span>

                            <span v-for="vote in Math.round(5 - show.vote_average / 2)">
                                <i class="fa-regular fa-star"></i>
                            </span>

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
