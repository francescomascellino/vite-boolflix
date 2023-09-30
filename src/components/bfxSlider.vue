<template>
    <div class="container">

        <div class="row align-items-center flex-column">

            <h2 classs="bfx-secTitle">Airing Today</h2>

            <!-- MODALE -->
            <bfxModal :serie="serie" v-for="serie in this.store.airingToday" />

            <div class="carousel col-12 position-relative">

                <div class="inner" ref="inner" :style="innerStyles">

                    <bfxSliderCard :serie="serie" v-for="serie in this.store.airingToday" :key="serie.id" />

                </div>

                <div class="position-absolute bfx-prev" @click="prev"><i class="fa-solid fa-chevron-left"></i></div>
                <div class="position-absolute bfx-next" @click="next"><i class="fa-solid fa-chevron-right"></i></div>

            </div>

        </div>
    </div>
</template>

<script>
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
        setTimeout(() => {
            this.setStep()
        }, 500)

        this.resetTranslate()
    },

    methods: {

        // SLIDER
        setStep() {

            const innerWidth = this.$refs.inner.scrollWidth
            console.log("AIRING TODAY ARR LENGTH", this.store.airingToday.length);
            console.log("INNER WIDTH", innerWidth);
            let totalCards = this.store.airingToday.length
            this.step = `${innerWidth / totalCards}px`
            console.log("step:", this.step);
        },

        next() {
            if (this.transitioning) return

            this.transitioning = true

            this.moveLeft()

            this.afterTransition(() => {
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
                const card = this.store.airingToday.pop()
                this.store.airingToday.unshift(card)
                this.resetTranslate()
                this.transitioning = false
            })
        },

        moveLeft() {
            this.innerStyles = {
                transform: `translateX(-${this.step})
        translateX(-${this.step})`
            }
        },

        moveRight() {
            this.innerStyles = {
                transform: `translateX(${this.step})
        translateX(-${this.step})`
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