import { CategoryService } from "@/services/category.service"
import { ICategory } from "@/types/category.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useCreateCategory = () => {
  const { mutate: createCategory, isPending: isLoading } = useMutation<ICategory, AxiosError, ICategory>({
    mutationKey: ['createCategory'],
    mutationFn: formData => CategoryService.createCategory(formData),
    onSuccess() {
      console.log('onseccess')
    },
    onError(error) {
      console.log('auth error', error)
    }
  })

  return { createCategory, isLoading }
}