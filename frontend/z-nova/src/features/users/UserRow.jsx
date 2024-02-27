import styled from 'styled-components';
import { useState } from 'react';
import { useDeleteUser } from './useDeleteUser';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
// import { useCreatePost } from '../posts/useCreatePost';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr 1fr 2fr 1fr 1fr 1fr 0.3fr;
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
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin: 0 1.2rem;
`;

function UserRow({ user }) {
  const [showForm, setShowForm] = useState(false);
  const { deleteUser, isDeleting } = useDeleteUser();
  // const { isCreating, createPost } = useCreatePost();

  const {
    _id: userId,
    name,
    email,
    username,
    role,
    active,
    isVerified,
    photo: image,
    location,
    skills,
    createdAt,
  } = user;

  function handleDuplicate() {
    // createPost({
    // title: `Copy of ${title}`,
    // categories,
    // tags,
    // image,
    // body,
    // caption,
    // user,
    // slug,
    // createdAt,
    // });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={`http://127.0.0.1:8000/users/${image}`} />
        <div style={{ textAlign: 'left' }}>{username}</div>
        <div>{name}</div>
        <div>{email}</div>
        <div>
          Verified
          {/* {active && isVerified && 'Verified'} */}
          {/* {!active && 'Inactive'} */}
          {/* {!isVerified && 'Unverified'} */}
        </div>
        <div>{role}</div>
        {/* <div>
          {skills.length > 0 ? (
            skills.map((skill) =>
              skills[skill.length - 1] !== skill ? `${skill}, ` : `${skill}`,
            )
          ) : (
            <span>&mdash;</span>
          )}
        </div> */}
        <div>{location ? location : 'Undefined'}</div>
        {/* <div> */}
        {/* {new Date(user?.createdAt).toLocaleDateString('en-US', { */}
        {/* day: 'numeric', */}
        {/* month: 'short', */}
        {/* year: 'numeric', */}
        {/* hour: '2-digit', */}
        {/* minute: 'numeric', */}
        {/* })} */}
        {/* </div> */}
        <div>
          <Modal>
            {/* <button onClick={() => setShowForm((show) => !show)}>Edit</button> */}
            <Menus.Menu>
              <Menus.Toggle id={userId} />
              <Menus.List id={userId}>
                <Menus.Button
                  icon={<HiPencil />}
                  onClick={() => setShowForm((show) => !show)}
                >
                  Edit
                </Menus.Button>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={() => handleDuplicate()}
                  // disabled={isCreating}
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
                onConfirm={() => deleteUser(user?._id)}
                resourceName={`post`}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
        {/* <div> */}
        {/* <button disabled={isCreating} onClick={handleDuplicate}> */}
        {/* <HiSquare2Stack /> */}
        {/* </button> */}
        {/* <button onClick={() => setShowForm((show) => !show)}> */}
        {/* <HiPencil /> */}
        {/* </button> */}
        {/* <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}> */}
        {/* <HiTrash /> */}
        {/* </button> */}
        {/* </div> */}
      </TableRow>
      {/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
      {showForm && <p>Form</p>}
    </>
  );
}

export default UserRow;
