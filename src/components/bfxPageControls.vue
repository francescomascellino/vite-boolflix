<template>
    <!-- I PULSANTI DI PAGINAZIONE APPAIONO SOLO SE SONO PRESENTI PIU' PAGINE -->
    <div class="col-12 d-flex justify-content-around my-4">

        <button class="rounded-2 shadow bfx-btn fw-bold bfx-btn" :class="page == 1 ? 'bfx-btnDisabled' : ''"
            @click="$emit('prev')">Indietro</button>

        <span> Pagina {{ results.page }} di {{ results.total_pages }} </span>

        <button class="rounded-2 shadow bfx-btn fw-bold bfx-btn"
            :class="page == results.total_pages ? 'bfx-btnDisabled' : ''" @click="$emit('next')">Avanti</button>

    </div>
</template>

<script>
export default {

    name: "bfxPageControls",

    props: {

        results: "Object",
        page: "Number",

    },

    // VIENE DICHIARATO L'emit IN MODO POSSA ESSERE RAGGIUNTO DAL PADRE (App.vue)
    emits: ['prev', 'next']

}
</script>

<style lang="scss" scoped>
@use '../assets/scss/partials/bfxBtn.scss'
</style>