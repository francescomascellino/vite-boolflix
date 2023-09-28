import { reactive } from "vue";

import axios from "axios";

export const store = reactive({

    api_key: "df0571431ac3bb84d4126e111a35cb87",
    api_url: "https://api.themoviedb.org/3/search/movie", // MOVIES

    movies: [], //response DELLA CHIAMATA AXIOS
    /*     movieTitle: "",
        movieOriginalTitle: "",
        movieLang: "",
        movieVote: Number(""), */

    searchImput: "",

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

                console.log(response);
                this.movies = response.data.results;
                console.log(this.movies);

            })
            .catch(error => {
                console.error(error);
            })
    },

})