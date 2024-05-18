import styled from 'styled-components';
import { useState } from 'react';
import { useDeleteUser } from './useDeleteUser';
import { useUpdateUser } from './useUpdateUser';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { RiForbid2Fill } from 'react-icons/ri';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Tooltip from '../../ui/Tooltip';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import UserForm from './UserForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 2fr 1.4fr 1.8fr 1fr 1fr 2fr 1fr 1fr 0.3fr;
  column-gap: 2.4rem;
  align-items: center;
  // text-align: center;
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

const CellWrapper = styled.div`
  position: relative;
`;

const CellText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  cursor: pointer;
`;

const StyledLabel = styled.div`
  border-radius: 5rem;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.6rem;
  color: #fff;
  width: fit-content;
`;

function UserRow({ user }) {
  const [showForm, setShowForm] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { updateUser, isLoading: isUpdating } = useUpdateUser();
  const { deleteUser, isDeleting } = useDeleteUser();

  const {
    _id: userId,
    name,
    email,
    username,
    role,
    active,
    isVerified,
    photo,
    country,
    createdAt,
  } = user;

  function handleVerifyStatus() {
    updateUser({
      data: { isVerified: !isVerified },
      userId,
      message: `Account has been ${
        isVerified ? 'Unverified' : 'Verified'
      } successfully!`,
    });
  }

  function handleActiveStatus() {
    updateUser({
      data: { active: !active },
      userId,
      message: `Account has been ${
        active ? 'Deactivated' : 'Activated'
      } successfully!`,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={`http://127.0.0.1:8000/users/${photo}`} />
        <div>{name}</div>
        <div>{username}</div>
        <CellWrapper
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <CellText>{email}</CellText>
          <Tooltip isVisible={showTooltip}>{email}</Tooltip>
        </CellWrapper>
        <div>{country || 'Undefined'}</div>
        {/* <div>
          {languages ? languages?.map((lang) => `${lang} `) : 'Undefined'}
        </div> */}
        <div>{role}</div>
        <div>
          {new Date(createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: 'numeric',
          })}
        </div>
        <StyledLabel
          style={{ backgroundColor: active ? '#35db35' : '#fc3d3d' }}
        >
          {active ? 'Active' : 'Inactive'}
        </StyledLabel>
        <StyledLabel
          style={{ backgroundColor: isVerified ? '#35db35' : '#fc3d3d' }}
        >
          {isVerified ? 'Verified' : 'Unverified'}
        </StyledLabel>
        <div>
          <Modal>
            {/* <button onClick={() => setShowForm((show) => !show)}>Edit</button> */}
            <Menus.Menu>
              <Menus.Toggle id={userId} />
              <Menus.List id={userId}>
                <Menus.Button
                  icon={active ? <FaToggleOn /> : <FaToggleOff />}
                  onClick={() => handleActiveStatus()}
                >
                  {active ? 'Deactivate' : 'Activate'}
                </Menus.Button>
                <Menus.Button
                  icon={
                    isVerified ? <RiForbid2Fill /> : <RiVerifiedBadgeFill />
                  }
                  onClick={() => handleVerifyStatus()}
                >
                  {isVerified ? 'Unverify' : 'Verify'}
                </Menus.Button>
                <Menus.Button
                  icon={<HiPencil />}
                  onClick={() => setShowForm((show) => !show)}
                >
                  Edit
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
      </TableRow>
      {showForm && (
        <UserForm
          btnLabel="Update"
          user={user}
          formSubmitHandler={(data) => {
            updateUser({ data, userId, message: 'User updated successfully!' });
            setShowForm(false);
          }}
          formCancelHandler={() => setShowForm(false)}
          isLoading={isUpdating}
        />
      )}
    </>
  );
} 

export default UserRow;
