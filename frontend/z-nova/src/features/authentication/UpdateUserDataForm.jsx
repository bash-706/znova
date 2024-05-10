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
import countryOptions from '../../utils/countryOptions';

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

const StyledSelect = styled.select`
  cursor: pointer;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
`;

function UpdateUserDataForm() {
  const { user } = useUser();
  const { updateAccount, isUpdating } = useUpdateAccount();

  const {
    name: currentName,
    email: currentEmail,
    username: currentUsername,
    photo: currentPhoto,
    biodata: currentBio,
    country: currentCountry,
    skills: currentSkills,
    role,
  } = user;

  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [username, setUsername] = useState(currentUsername);
  const [biodata, setBiodata] = useState(currentBio);
  const [photo, setPhoto] = useState(currentPhoto);
  const [skills, setSkills] = useState(currentSkills || []);
  const [country, setCountry] = useState(currentCountry);
  const [avatarSrc, setAvatarSrc] = useState(
    `http://127.0.0.1:8000/users/${currentPhoto}`,
  );

  function handleSubmit(e) {
    e.preventDefault();

    // if (!name || !email || !username || !country || !photo || !biodata) return;
    updateAccount(
      { name, email, username, country, photo, biodata, skills },
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
    setCountry(currentCountry);
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

      <FormRow label="Country">
        <StyledSelect
          onChange={(e) => setCountry(e.target.value)}
          id="country"
          disabled={isUpdating}
          value={country}
        >
          {countryOptions.map((option) => (
            <option key={option.name} value={option.name}>
              <span>{option.name}</span>
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      {!(role === 'user') && (
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
      )}

      <FormRow label="Skills">
        <Input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          id="skills"
          disabled={isUpdating}
          placeholder="Enter your skills"
        />
      </FormRow>

      <FormRow>
        <Button
          type="button"
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
