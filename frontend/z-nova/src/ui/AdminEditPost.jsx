import { Link, useParams } from 'react-router-dom';
import { usePost } from '../features/posts/usePost';
import { useUpdatePost } from '../features/posts/useUpdatePost';
import styled from 'styled-components';
import Spinner from './Spinner';
import { HiOutlineCamera } from 'react-icons/hi2';
import Button from './Button';
import Editor from './Editor';
import { useEffect, useState } from 'react';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledArticle = styled.section`
  margin: 0 auto;
  width: 100%;
`;

const StyledImage = styled.img`
  border-radius: 2rem;
  width: 100%;
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

function AdminEditPost() {
  const { slug } = useParams();
  const [image, setImage] = useState(null);
  const [initialImage, setInitialImage] = useState(null);
  const [body, setBody] = useState(null);
  const { updatePost, isUpdating } = useUpdatePost();
  const { post, isLoading, error } = usePost(slug);

  let mainPost;
  if (post) {
    mainPost = post?.post;
  }

  useEffect(() => {
    if (!isLoading && !error) {
      setInitialImage(mainPost?.image);
      setBody(mainPost?.body);
    }
  }, [post, isLoading, error, mainPost, body]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpdatePost = async () => {
    if (!mainPost) return;
    const postId = mainPost?.id;
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    } else {
      formData.append('image', initialImage);
    }
    formData.append('body', JSON.stringify(body));
    await updatePost({ formData, postId });
  };

  const handleDeleteImage = () => {
    setInitialImage(null);
    setImage(null);
  };

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  if (error)
    return (
      <Center>
        <p>{error?.message}</p>
      </Center>
    );

  return (
    <StyledArticle>
      <article>
        <label
          style={{
            width: '100%',
            cursor: 'pointer',
            display: 'block',
          }}
          htmlFor="postImage"
        >
          {image ? (
            <StyledImage
              src={URL.createObjectURL(image)}
              alt={mainPost?.title}
            />
          ) : initialImage ? (
            <StyledImage
              src={`http://127.0.0.1:8000/posts/${mainPost?.image}`}
              alt={mainPost?.title}
            />
          ) : (
            <div
              style={{
                width: '100%',
                minHeight: '10rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-grey-100)',
                borderRadius: '2rem',
              }}
            >
              <HiOutlineCamera
                style={{
                  color: 'var(--color-brand-600)',
                  width: '2rem',
                  height: 'auto',
                }}
              />
            </div>
          )}
        </label>
        <StyledInput type="file" id="postImage" onChange={handleImageChange} />
        <Button onClick={handleDeleteImage} style={{ margin: '1rem 0' }}>
          Delete Image
        </Button>

        <div style={{ marginTop: '2rem' }}>
          {mainPost?.categories?.map((category, index) => (
            <Link
              key={index}
              style={{
                color: 'var(--color-grey-500)',
                fontSize: '1.8rem',
                fontWeight: '500',
              }}
              to={`/blog?category=${category?.name}`}
            >
              {category?.name}
            </Link>
          ))}
        </div>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '600',
            color: 'var(--color-grey-800)',
            marginTop: '2rem',
          }}
        >
          {mainPost?.title}
        </h1>
        <div style={{ width: '100%' }}>
          {!isLoading && !error && (
            <Editor
              content={mainPost?.body}
              editable={true}
              onDataChange={(data) => {
                setBody(data);
              }}
            />
          )}
        </div>
        <Button onClick={handleUpdatePost} disabled={isUpdating}>
          Update Now
        </Button>
      </article>
    </StyledArticle>
  );
}

export default AdminEditPost;
