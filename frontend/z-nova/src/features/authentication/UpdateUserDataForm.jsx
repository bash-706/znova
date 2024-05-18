import { useState } from 'react';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { fieldsToOption } from '../../utils/multiSelectTagUtils';
import { useUser } from './useUser';
import styled from 'styled-components';
import { useUpdateAccount } from './useUpdateAccount';
import TextArea from '../../ui/TextArea';
import countryOptions from '../../utils/countryOptions';
import CreatableSelectInput from '../../ui/CreatableSelect';

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
    languages: currentLanguages,
    role,
  } = user;

  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [username, setUsername] = useState(currentUsername);
  const [biodata, setBiodata] = useState(currentBio);
  const [photo, setPhoto] = useState(currentPhoto);
  const [skills, setSkills] = useState(currentSkills || []);
  const [languages, setLanguages] = useState(currentLanguages || []);
  const [country, setCountry] = useState(currentCountry);
  const [avatarSrc, setAvatarSrc] = useState(
    `http://127.0.0.1:8000/users/${currentPhoto}`,
  );

  function handleSubmit(e) {
    e.preventDefault();

    console.log(skills, languages);
    console.log(typeof skills, typeof languages);

    let skillsJSON;
    if (typeof skills === 'string') {
      const skillsArray = skills.split(',').map((skill) => skill.trim());
      const filteredSkillsArray = skillsArray.filter((skill) => skill);
      skillsJSON = JSON.stringify(filteredSkillsArray);
    } else {
      skillsJSON = JSON.stringify(skills);
    }

    let languagesJSON;
    if (typeof languages === 'string') {
      const languagesArray = languages.split(',').map((lang) => lang.trim());
      const filteredlanguagesArray = languagesArray.filter((lang) => lang);
      languagesJSON = JSON.stringify(filteredlanguagesArray);
    } else {
      languagesJSON = JSON.stringify(languages);
    }

    console.log(skillsJSON, languagesJSON);
    console.log(typeof skillsJSON, typeof languagesJSON);

    // if (!name || !email || !username || !country || !photo || !biodata) return;
    updateAccount(
      {
        name,
        email,
        username,
        country,
        photo,
        biodata,
        skills: skillsJSON,
        languages: languagesJSON,
      },
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
    setSkills(fieldsToOption(currentSkills));
    setLanguages(fieldsToOption(currentLanguages));
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
        <>
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

          <FormRow label="Skills">
            {/* <Input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              id="skills"
              disabled={isUpdating}
              placeholder="Enter your skills"
            /> */}
            <CreatableSelectInput
              defaultValue={fieldsToOption(currentSkills)}
              isMulti
              value={skills.map((skill) => ({ label: skill, value: skill }))}
              onChange={(newValue) =>
                setSkills(newValue.map((skill) => skill.value))
              }
              disabled={isUpdating}
            />
          </FormRow>

          <FormRow label="Languages">
            {/* <Input
              type="text"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              id="languages"
              disabled={isUpdating}
              placeholder="Enter your languages"
            /> */}
            <CreatableSelectInput
              defaultValue={fieldsToOption(currentLanguages)}
              isMulti
              value={languages.map((lang) => ({ label: lang, value: lang }))}
              onChange={(newValue) =>
                setLanguages(newValue.map((lang) => lang.value))
              }
              disabled={isUpdating}
            />
          </FormRow>
        </>
      )}
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
