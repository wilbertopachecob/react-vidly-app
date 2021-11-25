import { ENV } from "../const/env";
import httpService from "../services/httpService";

export function getMovies() {
  return httpService.get(`${ENV.API_HOST}/movies`);
}

export function deleteMovie(id) {
  return httpService.delete(`${ENV.API_HOST}/movies/${id}`);
}

export function getMovie(id) {
  return httpService.get(`${ENV.API_HOST}/movies/${id}`);
}

export function saveMovie(movie) {
    return httpService.post(`${ENV.API_HOST}/movies`, movie);
}
