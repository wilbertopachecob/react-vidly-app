import { ENV } from "../const/env";
import httpService from "../services/httpService";

export function getGenres() {
  return httpService.get(`${ENV.API_HOST}/genres`);
}
