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
    <h1 class=" text-capitalize text-info">test</h1>
    <input type="search" name="bfx-searchBar" id="bfx-searchBar" v-model="this.store.searchImput"> <button
        @click="startSearch">Search</button>
</template>

<style lang="scss" scoped></style>
