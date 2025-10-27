import React, { FC } from 'react'
import Label from '../../../components/form/Label'
import Field from '@/components/shared/field/Field'
import { ICategory, ICategoryCreateDto, ICategoryUpdateDto } from '@/types/category.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import ControlledSelect from '@/components/shared/select/Select'
import Button from '../../../components/ui/button/Button'
import Loader from '@/components/shared/Loader'
import { useCreateCategory } from '@/hooks/category/useCategories'
import { toast } from 'sonner'


interface CategoryFormProps {
  defaultValues?: ICategoryCreateDto | ICategoryUpdateDto;
  categories: ICategory[];
  isFetchingCategories?: boolean;
  onSubmit: SubmitHandler<ICategoryCreateDto>;
  isSubmitting?: boolean;
  submitText?: string;
  clearOnSubmit?: boolean;
}

const CategoryForm: FC<CategoryFormProps> = ({
  defaultValues,
  categories,
  isFetchingCategories,
  onSubmit,
  isSubmitting,
  clearOnSubmit,
  submitText = "Сохранить", }) => {

  const { control, handleSubmit, reset } = useForm<ICategoryCreateDto>({
    mode: 'all',
    defaultValues
  })

  const categoryOptions = categories.map((cat) => ({
    value: cat.id ?? "",
    label: cat.name,
  }));

  const handleFormSubmit: SubmitHandler<ICategoryCreateDto> = (data) => {
    onSubmit(data);
    if(clearOnSubmit) reset()
    toast.success("Категория успешно создана");
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-3'>
      <div>
        <Label htmlFor="name">Название</Label>
        <Field<ICategoryCreateDto>
          name="name"
          control={control}
          rules={{
            required: "Заполните поле",
            minLength: {
              value: 3,
              message: "Минимум 3 символа",
            },
          }}
        />
      </div>

      <div>
        <Label htmlFor="categoryId">Родителькая категория</Label>
        {isFetchingCategories ? (
          <Loader />
        ) : (
          <ControlledSelect<ICategoryCreateDto, string>
            name="parentId"
            control={control}
            options={categoryOptions}
            placeholder="Выберите категорию"
          />
        )}
      </div>

      <div className="flex justify-end">
        <Button
          size="xs"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader /> : ""}
          {submitText}
        </Button>
      </div>
    </form>
  )
}

export default CategoryForm