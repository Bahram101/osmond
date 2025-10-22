import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useAppMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, AxiosError, TVariables>
): UseMutationResult<TData, AxiosError, TVariables> {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn,
    ...options,
  });
}
