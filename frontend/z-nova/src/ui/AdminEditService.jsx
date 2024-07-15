import { useEffect, useState } from 'react';
import { useServiceCategories } from '../features/serviceCategories/useServiceCategories';
import { filterCategories } from '../utils/multiSelectTagUtils';
import styled from 'styled-components';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { HiTrash } from 'react-icons/hi2';
import Row from './Row';
import Heading from './Heading';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import Editor from './Editor';
import AsyncSelectInput from './AsyncSelect';
import SpinnerMini from './SpinnerMini';
import TextArea from './TextArea';
import { useUser } from '../features/authentication/useUser';
import { useService } from '../features/services/useService';
import { useUpdateService } from '../features/services/useUpdateService';
import { useParams } from 'react-router-dom';

const StyledNewService = styled.section`
  display: grid;
  grid-template-columns: 2.6fr 1fr;
  gap: 2rem;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-top: 1rem;
  position: relative;
`;

const StyledImage = styled.img`
  border-radius: 1rem;
  width: 33.3em;
  height: 180px;
  object-fit: cover;
  cursor: pointer;
  position: relative;
`;

const DeleteIcon = styled(HiTrash)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3.4rem;
  height: 3.4rem;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 0.8rem;
  cursor: pointer;
  display: none;
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledButton = styled.button`
  border-radius: 0.5rem;
  border: none;
  font-weight: 400;
  padding: 0.5rem 1rem;
  background: var(--color-brand-600);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const UploadLabel = styled.label`
  display: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1.5rem;
  border-radius: 1rem;
  z-index: 10;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 1rem;
  background-color: #f4f4f4;
  text-align: center;
`;

const TableData = styled.td`
  padding: 1rem;
  text-align: left;
`;

const ErrorMessage = styled.span`
  color: #b91c1c;
  font-size: 1.4rem;
  margin-top: 0.25rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  &:hover ${DeleteIcon} {
    display: block;
  }
  &:hover ${UploadLabel} {
    display: ${({ show }) => (show ? 'flex' : 'none')};
  }
`;

function AdminEditService() {
  const { slug } = useParams();
  const { service, status } = useService(slug);
  const { updateService, status: updateStatus } = useUpdateService();
  const [body, setBody] = useState('');
  const [images, setImages] = useState(Array(3).fill('/default.png'));
  const { serviceCategories: categoriesData } = useServiceCategories();
  const user = useUser();
  const methods = useForm();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = methods;

  useEffect(() => {
    if (service) {
      setValue('name', service.name);
      setValue('slug', service.slug);
      setValue('category', {
        value: service.serviceCategory._id,
        label: service.serviceCategory.name,
      });
      const updatedPackages = service.packages.map((pkg) => ({
        ...pkg,
        duration: parseInt(pkg.duration.split(' ')[0], 10) || 0,
      }));
      setValue('packages', updatedPackages);
      setBody(service.description);
      const fetchedImages = service.images.map(
        (img) => `http://127.0.0.1:8000/services/${img}`,
      );
      setImages([
        ...fetchedImages,
        ...Array(3 - fetchedImages.length).fill('/default.png'),
      ]);
    }
  }, [service, setValue]);

  const promiseOptions = async (inputValue) => {
    return filterCategories(inputValue, categoriesData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const firstEmptyIndex = images.findIndex(
        (image) => image === '/default.png',
      );
      if (firstEmptyIndex !== -1) {
        const newImages = [...images];
        newImages[firstEmptyIndex] = file;
        setImages(newImages);
      }
    }
  };

  const handleDeleteImage = (index) => {
    if (window.confirm('Do you want to delete this image?')) {
      const newImages = [...images];
      newImages.splice(index, 1);
      newImages.push('/default.png');
      setImages(newImages);
    }
  };

  const onSubmit = async ({ name, slug, category, packages }) => {
    const formData = new FormData();
    images.forEach((image) => {
      if (image instanceof File) {
        formData.append('images', image, image.name);
      }
    });

    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('serviceCategory', category?.value);
    const updatedPackages = packages.map((pkg) => ({
      ...pkg,
      duration: `${pkg.duration} ${pkg.duration > 1 ? 'Days' : 'Day'}`,
    }));

    formData.append('packages', JSON.stringify(updatedPackages));
    formData.append('description', JSON.stringify(body));
    formData.append('user', user?.user?._id);
    updateService({ data: formData, serviceId: service?._id });
  };

  if (status === 'loading') return <SpinnerMini />;

  console.log(service?._id);
  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          Edit Service
        </Heading>
      </Row>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow
            label="Service Images"
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginBottom: '2rem',
            }}
          >
            <ImageContainer>
              {images.map((image, index) => (
                <ImageWrapper key={index} show={image === '/default.png'}>
                  {image === '/default.png' && (
                    <UploadLabel htmlFor={`serviceImage-${index}`}>
                      Upload Image
                      <StyledInput
                        type="file"
                        id={`serviceImage-${index}`}
                        onChange={handleImageChange}
                      />
                    </UploadLabel>
                  )}
                  <StyledImage
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt={`Service Image ${index + 1}`}
                  />
                  {image !== '/default.png' && (
                    <DeleteIcon onClick={() => handleDeleteImage(index)} />
                  )}
                </ImageWrapper>
              ))}
            </ImageContainer>
          </FormRow>
          <FormRow label="Packages" style={{ marginBottom: '2rem' }}>
            <Table>
              <thead>
                <tr>
                  {['Package 1', 'Package 2', 'Package 3'].map((pkg, index) => (
                    <TableHeader key={index} style={{ fontWeight: 500 }}>
                      {pkg}
                    </TableHeader>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['name', 'summary', 'price', 'duration', 'revisions'].map(
                  (field, rowIndex) => (
                    <tr key={rowIndex}>
                      {[0, 1, 2].map((index) => (
                        <TableData key={index}>
                          {field === 'summary' ? (
                            <TextArea
                              style={{ width: '100%', resize: 'none' }}
                              placeholder={
                                field.charAt(0).toUpperCase() + field.slice(1)
                              }
                              {...register(`packages[${index}].${field}`, {
                                required: 'Required',
                              })}
                            />
                          ) : (
                            <Input
                              min={0}
                              style={{ width: '100%' }}
                              placeholder={
                                field === 'duration'
                                  ? field.charAt(0).toUpperCase() +
                                    field.slice(1) +
                                    ' In Days'
                                  : field === 'price'
                                  ? field.charAt(0).toUpperCase() +
                                    field.slice(1) +
                                    ' In Dollars'
                                  : field.charAt(0).toUpperCase() +
                                    field.slice(1)
                              }
                              type={
                                field === 'price' ||
                                field === 'revisions' ||
                                field === 'duration'
                                  ? 'number'
                                  : 'text'
                              }
                              {...register(`packages[${index}].${field}`, {
                                required: 'Required',
                              })}
                            />
                          )}
                          {errors?.packages?.[index]?.[field] && (
                            <ErrorMessage>
                              {errors.packages[index][field].message}
                            </ErrorMessage>
                          )}
                        </TableData>
                      ))}
                    </tr>
                  ),
                )}
              </tbody>
            </Table>
          </FormRow>
          <StyledNewService>
            <section>
              <FormRow label="Name" error={errors?.name?.message}>
                <Input
                  style={{ fontWeight: 500, fontSize: '1.5rem' }}
                  placeholder="Enter service name"
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'This field is required',
                  })}
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
              <StyledButton>
                {updateStatus === 'pending' ? (
                  <SpinnerMini />
                ) : (
                  'Update Service'
                )}
              </StyledButton>
            </section>
            <section>
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
            </section>
          </StyledNewService>
        </Form>
      </FormProvider>
    </>
  );
}

export default AdminEditService;
