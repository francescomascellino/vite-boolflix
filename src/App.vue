<script>

import { store } from './store';

import bfxNav from './components/bfxNav.vue';

import bfxCards from './components/bfxCards.vue';

export default {

    components: {
        bfxNav,
        bfxCards
    },

    data() {
        return {

            store,

        }
    },

    created() {

        store.searchTrending(this.store.api_trending);

    },

}

</script>

<template>
    <header>

        <bfxNav />

    </header>

    <main>

        <div class="container class my-4">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-evenly g-4">

                <bfxCards :show="show" v-for="show in  this.store.searchResult" />

            </div>
        </div>

    </main>
</template>

<style lang="scss" scoped>
// @use './assets/scss/partials/bfxCards.scss';

@use './assets/scss/partials/variables.scss' as *;
</style>
