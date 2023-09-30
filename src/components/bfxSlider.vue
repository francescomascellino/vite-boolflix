<template>
    <div class="container">

        <div class="row align-items-center flex-column">

            <h2 classs="bfx-secTitle">Airing Today</h2>

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

import bfxSliderCard from './bfxSliderCard.vue';

export default {

    name: 'bfxSlider',

    components: {
        bfxSliderCard
    },

    data() {
        return {

            store,

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
            console.log(this.store.airingToday.length);
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
@use '../assets/scss/partials/variables.scss' as *;

// SLIDER
@use '../assets/scss/partials/bfxCards.scss';

// @use '../assets/scss/partials/bfxBtn.scss';


.carousel {
    overflow: hidden;
}

.inner {
    transition: transform 0.2s;
    white-space: nowrap;
}

.card {
    width: 171px;
    margin-right: 10px;
    display: inline-flex;
    height: 256px;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
    background-color: $bfx-dark;

    img {
        height: 100%;
    }
}

.bfx-card-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: $bfx-darkOverlay;
    display: none;
    color: $bfx-primary;
    padding: 5px;
    overflow-y: scroll;

    p {
        vertical-align: middle;
        font-size: small;
        line-break: strict;
    }

    .bfx-flag {
        height: 24px;
    }
}

.card:hover .bfx-card-overlay {
    display: block;
}

.bfx-prev {
    height: 256px;
    width: 3rem;
    top: 0;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $bfx-primary;
    font-size: 1.5rem;
    padding: 1rem;
    background: rgb(34, 31, 31);
    background: linear-gradient(90deg, rgba(34, 31, 31, 1) 12%, rgba(255, 255, 255, 0) 72%);
}

.bfx-next {
    height: 256px;
    width: 3rem;
    top: 0;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $bfx-primary;
    font-size: 1.5rem;
    padding: 1rem;
    background: rgb(34, 31, 31);
    background: linear-gradient(180deg, rgba(34, 31, 31, 1) 12%, rgba(255, 255, 255, 0) 72%);
}
</style>


                    <!--                     <div class="card shadow" v-for="serie in this.store.airingToday" :key="serie.id">


                        <div class="bfx-card-overlay">

                            <p>`{{ serie.title ? serie.title :
                                serie.name
                            }}`</p>

                            <p class="card-text"><span class="bfx-title text-uppercase">original language: </span>

                                <img class="bfx-flag" :alt="serie.original_language"
                                    :src="serie.original_language == 'en' ? 'https://flagsapi.com/GB/shiny/64.png' : 'https://flagsapi.com/' + serie.original_language.toUpperCase().split('_')[0] + '/shiny/64.png'"
                                    @error="$event.target.src = 'https://cdn3.iconfinder.com/data/icons/faticons/32/globe-01-512.png'" />

                            </p>

                            <p><span class="bfx-title text-uppercase">voto: </span>

                                <span v-for=" vote  in  Math.round(serie.vote_average / 2) ">
                                    <i class="fa-solid fa-star"></i>
                                </span>

                                <span v-for=" vote  in  Math.round(5 - serie.vote_average / 2) ">
                                    <i class="fa-regular fa-star"></i>
                                </span>

                            </p>

                        </div>

                        <img class="card-img-top bfx-poster"
                            :alt="serie.original_title ? serie.original_title : serie.original_name"
                            :src="'https://image.tmdb.org/t/p/w342/' + `${serie.poster_path}`"
                            @error="$event.target.src = getPosterUrl('../assets/img/404.jpg')" />

                    </div> -->