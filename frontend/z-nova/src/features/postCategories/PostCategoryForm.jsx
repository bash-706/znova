import { useForm } from 'react-hook-form';
import { useCreatePostCategory } from './useCreatePostCategory';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';
import Heading from '../../ui/Heading';

function CategoryForm() {
  const { createPostCategory, isLoading } = useCreatePostCategory();

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function submit({ category }) {
    if (!category) return;
    createPostCategory({ name: category });
    reset();
  }

  return (
    <Form
      onSubmit={handleSubmit(submit)}
      style={{ border: 'none', padding: 0 }}
    >
      <Heading
        as="h1"
        style={{ fontWeight: '500', fontSize: '2rem', marginBottom: '2rem' }}
      >
        Create New Post Category
      </Heading>
      <FormRow
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          padding: 0,
        }}
        orientation="vertical"
        error={errors?.category?.message}
      >
        <Input
          type="text"
          id="category"
          style={{ width: '100%' }}
          placeholder="Create New Category"
          {...register('category', {
            required: 'This field is required',
          })}
          disabled={isLoading}
        />
        <Button
          disabled={isLoading}
          style={{ fontSize: '1.4rem', fontWeight: 400, padding: '1rem 2rem' }}
        >
          {!isLoading ? 'Create' : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CategoryForm;
