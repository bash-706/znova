import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useServiceCategories } from '../serviceCategories/useServiceCategories';
import AsyncSelectInput from '../../ui/AsyncSelect';
import {
  filterCategories,
  categoryToOption,
} from '../../utils/multiSelectTagUtils';

const StyledButton = styled.button`
  border-radius: 1rem;
  border: none;
  outline: none;
  font-weight: 400;
  padding: 1rem 2rem;
`;

const StyledButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2rem;
`;

function ServiceForm({
  service,
  formSubmitHandler,
  formCancelHandler = null,
  isLoading,
}) {
  const { serviceCategories: categoriesData } = useServiceCategories();
  console.log(categoryToOption(service?.serviceCategory));
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm();

  const promiseOptions = async (inputValue) => {
    return filterCategories(inputValue, categoriesData);
  };

  function submit({ name, slug, category }) {
    formSubmitHandler(
      {
        name,
        slug,
        serviceCategory: category?.value,
      },
      service?._id,
    );
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        }}
      >
        <FormRow
          label="Name"
          error={errors?.name?.message}
          style={{ display: 'flex' }}
        >
          <Input
            type="text"
            id="name"
            style={{
              padding: '0.8rem 1.2rem',
              width: '100%',
            }}
            {...register('name', {
              required: 'This field is required',
            })}
            disabled={isLoading}
            defaultValue={service?.name}
          />
        </FormRow>
        <FormRow
          label="Slug"
          error={errors?.slug?.message}
          style={{ display: 'flex' }}
        >
          <Input
            type="text"
            id="slug"
            {...register('slug', { required: 'This field is required' })}
            style={{ padding: '0.8rem 1.2rem', width: '100%' }}
            disabled={isLoading}
            defaultValue={service?.slug}
          />
        </FormRow>
        <FormRow
          label="Category"
          error={errors?.category?.message}
          style={{ display: 'flex' }}
        >
          {!isLoading && (
            <Controller
              name="category"
              control={control}
              defaultValue={categoryToOption(service?.serviceCategory)}
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <AsyncSelectInput
                  loadOptions={promiseOptions}
                  defaultValue={categoryToOption(service?.serviceCategory)}
                  isMulti={false}
                  {...field}
                  disabled={isLoading}
                  styles={{
                    width: '100%',
                    position: 'relative',
                    zIndex: 20,
                    cursor: 'pointer',
                  }}
                />
              )}
            />
          )}
        </FormRow>
      </div>
      <StyledButtons>
        {formCancelHandler && (
          <StyledButton
            onClick={formCancelHandler}
            style={{ background: 'var(--color-grey-200)' }}
          >
            Cancel
          </StyledButton>
        )}

        <StyledButton
          style={{ background: 'var(--color-brand-600)', color: '#fff' }}
        >
          Submit
        </StyledButton>
      </StyledButtons>
    </Form>
  );
}

export default ServiceForm;
