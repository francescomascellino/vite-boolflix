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

            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-evenly g-4">

                <!-- MOSTRA LE CARD ASSOCIANDO LA PROP "show" A LL'OGGETTO CONTENUTO IN "store" -->
                <bfxCards :show="show" v-for="show in  this.store.searchResult" />

            </div>
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

}

</script>

<style lang="scss" scoped>
@use './assets/scss/partials/variables.scss' as *;
</style>
