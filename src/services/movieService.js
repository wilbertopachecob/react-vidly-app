import { ENV } from "../const/env";
import httpService from "../services/httpService";

const apiEndpoint = `${ENV.API_HOST}/movies`;

export function getMovies() {
  return httpService.get(apiEndpoint);
}

export function deleteMovie(id) {
  return httpService.delete(`${apiEndpoint}/${id}`);
}

export function getMovie(id) {
  return httpService.get(`${apiEndpoint}/${id}`);
}

export function saveMovie(movie) {
    const data = {
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
        genreId: movie.genreId,
        numberInStock: movie.numberInStock,
    };
    return httpService.put(`${apiEndpoint}/${movie._id}`, data);
}

export function addMovie(movie) {
    return httpService.post(apiEndpoint, movie);
}

