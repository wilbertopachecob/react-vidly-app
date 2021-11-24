import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    _.get(error.response, "status", undefined) >= 400 &&
    error.response.status < 500;
  //Unexpected Error
  if (!expectedError) {
    console.error("Logging the error: ", error);
    toast.error("An unexpected error occurred");
  }

  return Promise.reject(error);
});

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default httpService;
