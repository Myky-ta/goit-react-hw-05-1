import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGQwNWUwMDdlOTI3Zjk2MGMyYzUwZTU5ZGNjMDI1MiIsIm5iZiI6MTc2OTIzODQzNS44OTY5OTk4LCJzdWIiOiI2OTc0NmZhMzk1MTFhZDA4OTJhMzY1M2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Skz7m9sJJvlzbmMUioWNN_rP8GwnzteSro6zY7Nw948";

const options = {
  headers: {
    Authorization: TOKEN,
  },
};

export const getTrendingMovies = async () => {
  const { data } = await axios.get(`${API_URL}/trending/movie/day`, options);
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await axios.get(
    `${API_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data.results;
};

export const getMovieDetails = async (id) => {
  const { data } = await axios.get(`${API_URL}/movie/${id}`, options);
  return data;
};

export const getMovieCredits = async (id) => {
  const { data } = await axios.get(`${API_URL}/movie/${id}/credits`, options);
  return data.cast;
};

export const getMovieReviews = async (id) => {
  const { data } = await axios.get(`${API_URL}/movie/${id}/reviews`, options);
  return data.results;
};
