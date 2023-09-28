import { reactive } from "vue";

import axios from "axios";

export const store = reactive({

    api_key: "df0571431ac3bb84d4126e111a35cb87",
    api_movies: "https://api.themoviedb.org/3/search/movie", // MOVIES
    api_tv: "https://api.themoviedb.org/3/search/tv", // TV SERIES

    movies: [], //response DELLA CHIAMATA AXIOS
    tv: [],
    searchResult: [],

    flags: [
        {
            lang: "en",
            url: "https://flagsapi.com/US/shiny/64.png"
        }
    ],

    searchImput: "Star Wars",

    searchContent(url) {
        axios.get(url, {

            params: {
                api_key: this.api_key,
                query: this.searchImput,
                include_adult: false,
                language: "it-IT"
            }

        })
            .then(response => {

                this.movies = response.data.results;
                this.searchResult.push(...response.data.results);
                console.log("MOVIES", this.movies);

            })
            .catch(error => {
                console.error(error);
            })
    },

    searchTv(url) {
        axios.get(url, {

            params: {
                api_key: this.api_key,
                query: this.searchImput,
                include_adult: false,
                language: "it-IT"
            }

        })
            .then(response => {

                this.tv = response.data.results;
                this.searchResult.push(...response.data.results);
                console.log("TV", this.tv);

            })
            .catch(error => {
                console.error(error);
            })
    },

    /*     getFlag(iso) {
            return iso.toUpperCase()
        } */

    getFlag(language) {
        let index = this.flags.findIndex(flag => flag.lang == language);
        return this.flags[index].url;
    }



})