import { useState } from 'react';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import styled from 'styled-components';
import { useUpdateAccount } from './useUpdateAccount';
import TextArea from '../../ui/TextArea';

const FormUserPhotoContainer = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  margin: auto;

  &:hover img {
    filter: brightness(0.7);
  }

  &:hover::after {
    content: 'Upload a Photo';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    opacity: 1;
    text-align: center;
  }
`;

const FormUserPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const { updateAccount, isUpdating } = useUpdateAccount();

  const {
    name: currentName,
    email: currentEmail,
    username: currentUsername,
    photo: currentPhoto,
    biodata: currentBio,
  } = user;

  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [username, setUsername] = useState(currentUsername);
  const [biodata, setBiodata] = useState(currentBio);
  const [photo, setPhoto] = useState(currentPhoto);
  const [avatarSrc, setAvatarSrc] = useState(
    `http://127.0.0.1:8000/users/${currentPhoto}`,
  );

  function handleSubmit(e) {
    e.preventDefault();
    // if (!name || !email || !username || !photo || !biodata) return;
    updateAccount(
      { name, email, username, photo, biodata },
      {
        onSuccess: () => {
          setPhoto(null);
          e.target.reset();
        },
      },
    );
  }

  function handleChangePhoto(e) {
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target.result);
      };
      reader.readAsDataURL(selectedPhoto);
    }
    setPhoto(selectedPhoto);
  }

  function handleCancel() {
    setName(currentName);
    setUsername(currentUsername);
    setEmail(currentEmail);
    setBiodata(currentBio);
    setPhoto(currentPhoto);
    setAvatarSrc(`http://127.0.0.1:8000/users/${currentPhoto}`);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <FormUserPhotoContainer>
          <FormUserPhoto src={avatarSrc} />
          <FileInput
            style={{
              position: 'absolute',
              cursor: 'pointer',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              zIndex: '10',
              opacity: '0',
            }}
            id="avatar"
            accept="image/*"
            onChange={handleChangePhoto}
            disabled={isUpdating}
          />
        </FormUserPhotoContainer>
      </FormRow>

      <FormRow label="Full Name">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Email Address">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Username">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Bio">
        <TextArea
          type="text"
          value={biodata}
          onChange={(e) => setBiodata(e.target.value)}
          id="biodata"
          disabled={isUpdating}
          style={{ resize: 'none' }}
          rows="4"
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
