import { reactive } from "vue";

import axios from "axios";

export const store = reactive({

    api_key: "df0571431ac3bb84d4126e111a35cb87",

    // LINK API RICERCHE
    api_movies: "https://api.themoviedb.org/3/search/movie", // MOVIES CON QUERY
    api_tv: "https://api.themoviedb.org/3/search/tv", // TV SERIES CON QUERY
    api_trending: 'https://api.themoviedb.org/3/trending/all/day', // TRENDING TODAY (MOVIES & SERIES)
    api_trend_movies: 'https://api.themoviedb.org/3/trending/movie/day', //TRENDING MOVIES
    api_trend_tv: 'https://api.themoviedb.org/3/trending/tv/day', //TRENDING SERIES
    api_airing_tv: 'https://api.themoviedb.org/3/tv/airing_today', //SERIE AIRING TORDAY

    // ARRAY DEI VARI RISULTATI
    movies: null, //response DELLA CHIAMATA AXIOS MOVIES
    tv: null, //response DELLA CHIAMATA AXIOS TV
    trending: null, //response DELLA CHIAMATA AXIOS TRENDING

    airingToday: [], //SERIE TV IN ONDA OGGI

    searchImput: "", // IL v-model DEL CAMPO DI RICERCA

    query: "", // QUERY CHIAMATA AXIOS

    moviesPage: 1, // CONTROLLO DELLA PAGINA INIZIALE. DEVE ESSERE RIPORTATO A 1 A OGNI RICERCA (VEDI "startSearch()" IN bfxNav.vue)

    seriesPage: 1, // CONTROLLO DELLA PAGINA INIZIALE. DEVE ESSERE RIPORTATO A 1 A OGNI RICERCA (VEDI "startSearch()" IN bfxNav.vue)

    navSelection: "Trending", // ETICHETTA DELL'ELEMENTO DELLA NAV SELEZIONATO

    /* RICERCHE */

    // FILM CON QUERY
    searchMovies(url) {
        axios.get(url, {

            params: {
                api_key: this.api_key,
                query: this.query,
                include_adult: false,
                language: "it-IT",
                page: this.moviesPage
            }

        })
            .then(response => {

                this.movies = response.data;
                console.log("MOVIES", this.movies);

            })
            .catch(error => {
                console.error(error);
            })
    },

    // SERIE TV CON QUERY
    searchTv(url) {
        axios.get(url, {

            params: {
                api_key: this.api_key,
                query: this.query,
                include_adult: false,
                language: "it-IT",
                page: this.seriesPage
            }

        })
            .then(response => {

                this.tv = response.data;
                console.log("TV", this.tv);

            })
            .catch(error => {
                console.error(error);
            })
    },

    // FILM + SERIE DEL MOMENTO
    searchTrending(url) {
        axios.get(url, {

            params: {
                api_key: this.api_key,
                include_adult: false,
                language: "it-IT"
            }

        })
            .then(response => {

                this.trending = response.data.results;
                console.log("TRENDING", this.trending);

            })
            .catch(error => {
                console.error(error);
            })
    },

    // SERIE AIRING TORDAY
    searchAiringToday(url) {
        axios.get(url, {

            params: {
                api_key: this.api_key,
                include_adult: false,
                language: "it-IT"
            }

        })
            .then(response => {

                this.airingToday = response.data.results;
                console.log("AIRING TODAY", this.airingToday);

            })
            .catch(error => {
                console.error(error);
            })
    },

})