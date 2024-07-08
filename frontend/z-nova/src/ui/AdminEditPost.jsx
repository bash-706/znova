import { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { usePostCategories } from '../features/postCategories/usePostCategories';
import { usePost } from '../features/posts/usePost';
import { useUpdatePost } from '../features/posts/useUpdatePost';
import SpinnerMini from './SpinnerMini';
import Spinner from './Spinner';
import {
  convertTagsArray,
  fieldsToOption,
  categoryToOption,
  filterCategories,
} from '../utils/multiSelectTagUtils';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledEditPost = styled.section`
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
  background: var(--color-brand-600);
  color: #fff;
`;

function AdminEditPost() {
  const { slug } = useParams();
  const { post, isLoading, error } = usePost(slug);
  const { postCategories: categoriesData } = usePostCategories();
  const { updatePost, status } = useUpdatePost();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [initialImage, setInitialImage] = useState(null);

  useEffect(() => {
    if (post) {
      const mainPost = post?.post;
      setInitialImage(mainPost?.image);
      setValue('title', mainPost?.title);
      setValue('slug', mainPost?.slug);
      setValue('category', mainPost?.category);
      setValue('tags', mainPost?.tags);
      setValue('caption', mainPost?.caption);
      setBody(mainPost?.body);
    }
  }, [post, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDeleteImage = () => {
    if (window.confirm('Do you want to delete your Post picture?')) {
      setInitialImage(null);
      setImage(null);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    } else {
      formData.append('image', initialImage);
    }
    formData.append('body', JSON.stringify(body));
    formData.append('title', data.title);
    formData.append('slug', data.slug);
    formData.append('postCategory', data.category?.value);
    formData.append('tags', convertTagsArray(data.tags));
    formData.append('caption', data.caption);

    await updatePost({ formData, postId: post?.post?.id });
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <p>{error.message}</p>
      </Center>
    );
  }

  const displayImage = () => {
    if (image) {
      return URL.createObjectURL(image);
    } else if (initialImage) {
      return `http://127.0.0.1:8000/posts/${initialImage}`;
    } else {
      return '/default.png';
    }
  };

  const promiseOptions = async (inputValue) => {
    return filterCategories(inputValue, categoriesData);
  };

  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          Edit Post
        </Heading>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StyledEditPost>
          <section>
            <FormRow label="Title" error={errors?.title?.message}>
              <Input
                style={{ fontWeight: 500, fontSize: '1.5rem' }}
                placeholder="Enter post title"
                type="text"
                {...register('title', { required: 'This field is required' })}
                disabled={status === 'pending'}
              />
            </FormRow>
            <FormRow
              label="Description"
              style={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <Editor
                content={body}
                editable={true}
                onDataChange={(data) => setBody(data)}
              />
            </FormRow>
            <StyledButton>
              {status === 'pending' ? <SpinnerMini /> : 'Update Post'}
            </StyledButton>
          </section>
          <section>
            <FormRow
              label="Update Post Image"
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
                <StyledImage
                  src={displayImage()}
                  alt={post?.post?.title || 'default image'}
                />
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
                {...register('slug')}
                style={{ padding: '0.8rem 1.2rem', width: '100%' }}
              />
            </FormRow>
            <FormRow label="Category" error={errors?.category?.message}>
              {!isLoading && (
                <Controller
                  name="category"
                  control={control}
                  defaultValue={categoryToOption(post?.post?.postCategory)}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <AsyncSelectInput
                      loadOptions={promiseOptions}
                      defaultValue={categoryToOption(post?.post?.postCategory)}
                      isMulti={false}
                      {...field}
                      disabled={isLoading}
                      styles={{
                        width: '100%',
                        position: 'relative',
                        zIndex: 30,
                        cursor: 'pointer',
                      }}
                    />
                  )}
                />
              )}
            </FormRow>
            <FormRow label="Tags" error={errors?.tags?.message}>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <CreatableSelectInput
                    id="tags"
                    placeholder="Add post tags..."
                    onChange={(newValue) => field.onChange(newValue)}
                    {...field}
                    defaultValue={fieldsToOption(post?.post?.tags)}
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
            <FormRow label="Caption" error={errors?.caption?.message}>
              <Input
                placeholder="Enter post caption"
                type="text"
                {...register('caption', { required: 'This field is required' })}
                style={{ padding: '0.8rem 1.2rem', width: '100%' }}
              />
            </FormRow>
          </section>
        </StyledEditPost>
      </Form>
    </>
  );
}

export default AdminEditPost;
