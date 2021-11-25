import { ENV } from "../const/env";
import httpService from "../services/httpService";

export function login(email, password) {
  return httpService.post(`${ENV.API_HOST}/auth`, {email, password});
}
