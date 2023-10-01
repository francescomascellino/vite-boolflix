<template>
    <div class="container">

        <div class="row align-items-center flex-column">

            <h2 classs="bfx-secTitle">Airing Today</h2>

            <!-- MODALE - ASSEGNA ALLA PROP "serie" IL LIST RENDERING DELL?ARRAY DELLE SERIE IN ONDA OGGI IN MODO DA POTER VISUALIZZARE LE INFORMAZIONI AGGIUNTIVE DELLA SERIE CLICCATA -->

            <!-- LA MODALE VA CREATA AL DI FUORI DELLO SLIDER PER EVITARE CHE VENGA POSIZIONATA SECONDO LE REGOLE DEL CAROSELLO E NON SIA VISIBILE PER LE CARD PROVENIENTI DA UNA POSIZIONE FUORI CAMPO. LE CARD SI SPOSTANO, MA LA MODALE NO! -->
            <bfxModal :serie="serie" v-for="serie in this.store.airingToday" />

            <div class="carousel col-12 position-relative">

                <div class="inner" ref="inner" :style="innerStyles">

                    <!-- CARD DELLO SLIDER - ASSEGNA ALLA PROP "serie" IL LIST RENDERING DELL?ARRAY DELLE SERIE IN ONDA OGGI -->
                    <bfxSliderCard :serie="serie" v-for="serie in this.store.airingToday" :key="serie.id" />

                </div>

                <div class="position-absolute bfx-prev" @click="prev"><i class="fa-solid fa-chevron-left"></i></div>
                <div class="position-absolute bfx-next" @click="next"><i class="fa-solid fa-chevron-right"></i></div>

            </div>

        </div>
    </div>
</template>

<script>

// IMPORT MODALE, STORE E COMPONENTI
import { store } from '../store';

import { Modal } from 'bootstrap';

import bfxSliderCard from './bfxSliderCard.vue';

import bfxModal from './bfxModal.vue';

export default {

    name: 'bfxSlider',

    components: {
        bfxSliderCard,
        bfxModal
    },

    data() {
        return {

            store,
            Modal,

            //SLIDER
            innerStyles: {},
            step: '',
            transitioning: false
        }
    },

    created() {
        store.searchAiringToday(store.api_airing_tv);
    },

    mounted() {

        // ATTENDE UN MINIMO PRIMA DI EFETTUARE IL SETUP PER FAR SI CHE L'ARRAY VENGA POPOLATO
        setTimeout(() => {
            this.setStep()
        }, 500)

        this.resetTranslate()
    },

    methods: {

        // SLIDER
        setStep() {

            // ASSEGNA ALLA LARGHEZZA INTERNA LA LARCHEZZA DELLO SCROLL
            const innerWidth = this.$refs.inner.scrollWidth
            console.log("AIRING TODAY ARR LENGTH", this.store.airingToday.length);
            console.log("INNER WIDTH", innerWidth);

            // IL NUMERO DI CARD TOTALI SONO QUELLE CONTENTUNE NELL'ARRAY DELLE SERIE IN ONDA OGGI
            let totalCards = this.store.airingToday.length

            // OGNI "SCATTO" ("step") DELLO SLIDER E' UGUALE ALLA LARGHEZZA INTERNA / IL NUMERO DI CARD
            this.step = `${innerWidth / totalCards}px`
            console.log("step:", this.step);
        },

        next() {
            if (this.transitioning) return

            this.transitioning = true

            this.moveLeft()

            this.afterTransition(() => {

                // DOPO LA TRANSITION RIMUOVE LA CARD INIZIALE (USCITA FUORI CAMPO) E LA INSERISCE ALLA FINE DELL'ARRAY
                const card = this.store.airingToday.shift()
                this.store.airingToday.push(card)
                this.resetTranslate()
                this.transitioning = false
            })
        },

        prev() {
            if (this.transitioning) return

            this.transitioning = true

            this.moveRight()

            this.afterTransition(() => {

                // DOPO LA TRANSITION RIMUOVE LA CARD FINALE (USCITA FUORI CAMPO) E LA INSERISCE ALLINIZIO DELL'ARRAY
                const card = this.store.airingToday.pop()
                this.store.airingToday.unshift(card)
                this.resetTranslate()
                this.transitioning = false
            })
        },

        moveLeft() {

            // ESEGUE UN TRANSFOR TRANSLATE X PARI ALLO "this.step"
            this.innerStyles = {
                transform: `translateX(-${this.step}) translateX(-${this.step})`
            }
        },

        moveRight() {

            // ESEGUE UN TRANSFOR TRANSLATE X PARI ALLO "this.step"
            this.innerStyles = {
                transform: `translateX(${this.step}) translateX(-${this.step})`
            }
        },

        afterTransition(callback) {
            const listener = () => {
                callback()
                this.$refs.inner.removeEventListener('transitionend', listener)
            }
            this.$refs.inner.addEventListener('transitionend', listener)
        },

        resetTranslate() {
            this.innerStyles = {
                transition: 'none',
                transform: `translateX(-${this.step})`
            }
        },

    }
}
</script>

<style lang="scss" scoped>
// SLIDER
@use '../assets/scss/partials/bfxSlider.scss';
</style>