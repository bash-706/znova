import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { usePostCategories } from '../postCategories/usePostCategories';
import AsyncSelectInput from '../../ui/AsyncSelect';
import CreatableSelectInput from '../../ui/CreatableSelect';
import {
  filterCategories,
  categoryToOption,
  convertTagsArray,
  fieldsToOption,
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

function PostForm({
  post,
  formSubmitHandler,
  formCancelHandler = null,
  isLoading,
  isError,
}) {
  const { postCategories: categoriesData } = usePostCategories();
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

  function submit({ title, slug, category, caption, tags }) {
    formSubmitHandler(
      {
        title,
        slug,
        postCategory: category?.value,
        caption,
        tags: convertTagsArray(tags),
      },
      post?._id,
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
          label="Title"
          error={errors?.title?.message}
          style={{ display: 'flex' }}
        >
          <Input
            type="text"
            id="title"
            style={{
              padding: '0.8rem 1.2rem',
              width: '100%',
            }}
            {...register('title', {
              required: 'This field is required',
            })}
            disabled={isLoading}
            defaultValue={post?.title}
          />
        </FormRow>
        <FormRow
          label="Slug"
          orientation="vertical"
          error={errors?.slug?.message}
          style={{ display: 'flex' }}
        >
          <Input
            type="text"
            id="slug"
            {...register('slug', { required: 'This field is required' })}
            style={{ padding: '0.8rem 1.2rem', width: '100%' }}
            disabled={isLoading}
            defaultValue={post?.slug}
          />
        </FormRow>
        <FormRow
          label="Caption"
          orientation="vertical"
          error={errors?.caption?.message}
          style={{ display: 'flex' }}
        >
          <Input
            type="text"
            id="caption"
            {...register('caption', { required: 'This field is required' })}
            style={{ padding: '0.8rem 1.2rem', width: '100%' }}
            disabled={isLoading}
            defaultValue={post?.caption}
          />
        </FormRow>
        <FormRow
          label="Tags"
          error={errors?.tags?.message}
          style={{ display: 'flex' }}
        >
          {!isLoading && (
            <Controller
              name="tags"
              control={control}
              defaultValue={fieldsToOption(post?.tags)}
              render={({ field }) => (
                <CreatableSelectInput
                  id="tags"
                  {...field}
                  defaultValue={fieldsToOption(post?.tags)}
                  isMulti={true}
                  style={{ padding: '0.8rem 1.2rem' }}
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
        <FormRow
          label="Category"
          error={errors?.category?.message}
          style={{ display: 'flex' }}
        >
          {!isLoading && (
            <Controller
              name="category"
              control={control}
              defaultValue={categoryToOption(post?.postCategory)}
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <AsyncSelectInput
                  loadOptions={promiseOptions}
                  defaultValue={categoryToOption(post?.postCategory)}
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

export default PostForm;
