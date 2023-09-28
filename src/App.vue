<script>

import { store } from './store';

export default {

    data() {
        return {
            store
        }
    },

    mounted() {

        store.searchContent(this.store.api_url);

    },

    methods: {
        startSearch() {
            store.searchContent(this.store.api_url);
        }
    }
}


</script>

<template>
    <header>

        <h1 class=" text-capitalize text-info">test</h1>
        <input type="search" name="bfx-searchBar" id="bfx-searchBar" v-model="this.store.searchImput"> <button
            @click="startSearch">Search</button>

    </header>

    <main>
        <div class="container">
            <div class="row">
                <div class="col-2" v-for="movie in this.store.movies">

                    <div class="card">
                        <img class="card-img-top" src="https://picsum.photos/200" alt="">
                        <div class="card-body">
                            <p class="card-title">{{ movie.title }}</p>
                            <p class="card-text">{{ movie.original_title }}</p>
                            <p class="card-text">{{ movie.original_language }}</p>
                            <p class="card-text">{{ movie.vote_average }}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped></style>
