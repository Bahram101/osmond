import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "./axios";
import { errorCatch } from "./error.api";
import { toast } from "sonner";

interface CustomRequestConfig extends AxiosRequestConfig {
  showToast?: boolean;
}

export const request = async <T>(config: CustomRequestConfig) => {
  const { showToast = true } = config;
  const onSuccess = (response: AxiosResponse<T>) => {
    return response.data;
  };

  const onError = (error: AxiosError<{ error?: string; message?: string }>) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Unknown error";

    if (showToast) toast.error(message);

    return Promise.reject(errorCatch(error));
  };

  return instance<T>(config).then(onSuccess).catch(onError);
};
