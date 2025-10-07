import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "./axios";
import { errorCatch } from "./error.api";
import { toast } from "sonner";

export const request = async <T>(config: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse<T>) => {
    return response.data;
  };

  const onError = (error: AxiosError<{ error?: string; message?: string }>) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Unknown error";
    toast.error(message);
    return Promise.reject(errorCatch(error));
  };

  return instance<T>(config).then(onSuccess).catch(onError);
};
