<template>
    <!-- MODALE -->
    <div class="modal fade bfx-modal" :id="`bfx-sliderModal${serie.id}`" tabindex="-1"
        :aria-labelledby="`bfx-sliderModal${serie.id}Label`" aria-hidden="true" v-for="serie in this.store.airingToday"
        :key="serie.id">

        <div class="modal-dialog modal-dialog-centered">

            <div class="modal-content">

                <div class="modal-header">

                    <h1 class="modal-title fs-5" :id="`bfx-sliderModal${serie.id}Label`">{{ serie.title ?
                        serie.title :
                        serie.name
                    }}</h1>

                    <button type="button" class=" btn-close btn-close-white " data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>

                <div class="modal-body text-wrap">

                    <p><strong>Titolo originale:</strong> `{{ serie.original_title ? serie.original_title :
                        serie.original_name
                    }}`</p>

                    <p><strong>Prima messa in onda:</strong> {{ serie.first_air_date }}</p>

                    <p> <strong>Sinossi:</strong>
                        {{ serie.overview == "" ? "SAREBBE BELLO LEGGERE QUALCOSA, MA LE AIRING TODAY HANNO COME SINOSSI UNA BELLISSIMA STRINGA DESERTA." : serie.overview }}
                    </p>

                </div>

            </div>
        </div>
    </div>
</template>

<script>

import { store } from '../store';

import { Modal } from 'bootstrap';

export default {

    name: 'bfxModal',

    props: {

        serie: "Object"

    },

    data() {
        return {

            store,
            Modal,

        }
    },

}
</script>

<style lang="scss" scoped>
@use '../assets/scss/partials/bfxModal.scss';
</style>