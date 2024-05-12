// movieSearch.js
/*
const fetch = require('node-fetch');

const API_KEY = 'd1cd4d1ba7a58b1513835d935b26b2be';

const searchMovies = async (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        throw error;
    }
};

module.exports = {
    searchMovies
};
*/