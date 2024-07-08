import { useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import Row from './Row';
import Heading from './Heading';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import Editor from './Editor';
import Button from './Button';
import AsyncSelectInput from './AsyncSelect';
import CreatableSelectInput from './CreatableSelect';
import { useCreatePost } from '../features/posts/useCreatePost';
import { usePostCategories } from '../features/postCategories/usePostCategories';
import { useUser } from '../features/authentication/useUser';
import {
  convertTagsArray,
  filterCategories,
} from '../utils/multiSelectTagUtils';
import SpinnerMini from './SpinnerMini';

const StyledNewPost = styled.section`
  display: grid;
  grid-template-columns: 2.6fr 1fr;
  gap: 2rem;
`;

const StyledImage = styled.img`
  border-radius: 1rem;
  width: 100%;
  height: 140px;
`;

const StyledInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const StyledButton = styled.button`
  border-radius: 1rem;
  border: none;
  outline: none;
  font-weight: 400;
  padding: 1rem 2rem;
  background: light-green;
`;

function AdminNewPost() {
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const { createPost, isCreating, status } = useCreatePost();
  const { postCategories: categoriesData } = usePostCategories();
  const user = useUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm();

  const promiseOptions = async (inputValue) => {
    return filterCategories(inputValue, categoriesData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDeleteImage = () => {
    if (window.confirm('Do you want to delete your Post picture?')) {
      setImage(null);
    }
  };

  function submit({ title, caption, category, tags, slug }) {
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('postCategory', category?.value);
    formData.append('tags', convertTagsArray(tags));
    formData.append('slug', slug);
    formData.append('body', JSON.stringify(body));
    formData.append('user', user?.user?._id);
    createPost(formData, {
      onSettled: async () => {
        await Promise.all([setBody(''), setImage(null)]);
        reset({
          title: '',
          caption: '',
          category: null,
          tags: [],
          slug: '',
        });
      },
    });
  }

  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          Add New Post
        </Heading>
      </Row>
      <Form onSubmit={handleSubmit(submit)}>
        <StyledNewPost>
          <section>
            <FormRow label="Name" error={errors?.title?.message}>
              <Input
                style={{ fontWeight: 500, fontSize: '1.5rem' }}
                placeholder="Enter post title"
                type="text"
                id="title"
                {...register('title', {
                  required: 'This field is required',
                })}
                disabled={isCreating}
              />
            </FormRow>
            <FormRow
              label="Description"
              style={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <div style={{ width: '100%' }}>
                <Editor
                  content={body}
                  editable={true}
                  onDataChange={(data) => {
                    setBody(data);
                  }}
                />
              </div>
            </FormRow>
            <StyledButton
              style={{ background: 'var(--color-brand-600)', color: '#fff' }}
            >
              {status === 'pending' ? <SpinnerMini /> : 'Publish Post'}
            </StyledButton>
          </section>
          <section>
            <FormRow
              label="Add Post Image"
              style={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <label
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  display: 'block',
                }}
                htmlFor="postImage"
              >
                {image ? (
                  <StyledImage src={URL.createObjectURL(image)} />
                ) : (
                  <StyledImage src="/default.png" />
                )}
              </label>
              <StyledInput
                type="file"
                id="postImage"
                onChange={handleImageChange}
              />
              <Button
                variation="danger"
                size="small"
                onClick={handleDeleteImage}
                style={{
                  margin: '1rem 0',
                  textTransform: 'capitalize',
                  fontWeight: '500',
                  padding: '0.6rem 1rem',
                }}
              >
                Delete Image
              </Button>
            </FormRow>
            <FormRow label="Slug" error={errors?.slug?.message}>
              <Input
                placeholder="Enter URL-friendly slug"
                type="text"
                id="slug"
                {...register('slug')}
                style={{ padding: '0.8rem 1.2rem', width: '100%' }}
              />
            </FormRow>
            <FormRow label="Category" error={errors?.category?.message}>
              <Controller
                name="category"
                control={control}
                defaultValue={[]}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <AsyncSelectInput
                    loadOptions={promiseOptions}
                    defaultValue={[]}
                    isMulti={false}
                    placeholder="Select a category"
                    {...field}
                    styles={{
                      width: '100%',
                      position: 'relative',
                      zIndex: 30,
                      cursor: 'pointer',
                    }}
                  />
                )}
              />
            </FormRow>
            <FormRow label="Tags" error={errors?.tags?.message}>
              <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <CreatableSelectInput
                    id="tags"
                    placeholder="Add post tags..."
                    onChange={(newValue) => field.onChange(newValue)}
                    {...field}
                    defaultValue={[]}
                    isMulti={true}
                    style={{ padding: '0.8rem 1.2rem' }}
                    styles={{
                      width: '100%',
                      position: 'relative',
                      zIndex: 20,
                      cursor: 'pointer',
                    }}
                  />
                )}
              />
            </FormRow>
            <FormRow
              label="Caption"
              orientation="vertical"
              error={errors?.caption?.message}
            >
              <Input
                placeholder="Enter post caption"
                type="text"
                id="caption"
                {...register('caption', { required: 'This field is required' })}
                style={{ padding: '0.8rem 1.2rem', width: '100%' }}
              />
            </FormRow>
          </section>
        </StyledNewPost>
      </Form>
    </>
  );
}

export default AdminNewPost;
