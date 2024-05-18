import styled from 'styled-components';
import { useState } from 'react';

import { useDeletePost } from './useDeletePost';
// import { formatCurrency } from '../../utils/helpers';
// import { HiPencil,
import {
  HiEye,
  HiPencil,
  HiPencilSquare,
  HiSquare2Stack,
  HiTrash,
} from 'react-icons/hi2';
import { useCreatePost } from './useCreatePost';
import { useUpdatePost } from './useUpdatePost';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1.4fr 1fr 1fr 1fr 1.2fr 0.3fr;
  column-gap: 2.4rem;
  align-items: center;
  /* text-align: center; */
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 5rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin: 0 1.2rem;
`;

function PostRow({ post }) {
  const [showForm, setShowForm] = useState(false);
  const { deletePost, isDeleting } = useDeletePost();
  const { isCreating, createPost } = useCreatePost();
  const { updatePost, isUpdating } = useUpdatePost();
  const navigate = useNavigate();

  const {
    _id: postId,
    title,
    createdAt,
    postCategory,
    tags,
    image,
    body,
    caption,
    user,
    slug,
  } = post;

  function handleDuplicate() {
    createPost({
      title: title.startsWith('Copy') ? title : `Copy of ${title}`,
      postCategory,
      tags,
      image,
      body,
      caption,
      user,
      slug,
      createdAt,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={`http://127.0.0.1:8000/posts/${image}`} />
        <div style={{ textAlign: 'start' }}>{title}</div>
        <div>{user?.username}</div>
        <div style={{ textTransform: 'capitalize' }}>
          {post?.category?.split('-').join(' ')}
        </div>
        <div>
          {post?.tags.length > 0 ? (
            post?.tags.map((tag, index) =>
              tags[tags.length - 1] !== tag ? `${tag}, ` : `${tag}`,
            )
          ) : (
            <span>&mdash;</span>
          )}
        </div>
        <div>
          {new Date(post?.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: 'numeric',
          })}
        </div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={postId} />
              <Menus.List id={postId}>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => navigate(`/blog/${slug}`)}
                >
                  View
                </Menus.Button>
                <Menus.Button
                  icon={<HiPencil />}
                  onClick={() => navigate(`edit/${slug}`)}
                >
                  Edit
                </Menus.Button>
                <Menus.Button
                  icon={<HiPencilSquare />}
                  onClick={() => setShowForm((show) => !show)}
                >
                  Quick Edit
                </Menus.Button>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={() => handleDuplicate()}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window>
              <ConfirmDelete
                onConfirm={() => deletePost(post?._id)}
                resourceName={`post`}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
      {showForm && (
        <PostForm
          post={post}
          formSubmitHandler={(formData) => {
            updatePost({ formData, postId });
            setShowForm(false);
          }}
          formCancelHandler={() => setShowForm(false)}
          isLoading={isUpdating}
        />
      )}
    </>
  );
}

export default PostRow;
