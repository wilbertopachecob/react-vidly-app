import { ENV } from "../const/env";
import httpService from "../services/httpService";

const apiEndpoint = `${ENV.API_HOST}/users`;

export function register(user) {
  const data = {
    email: user.username,
    password: user.password,
    name: user.name,
  };

  return httpService.post(apiEndpoint, data);
}
