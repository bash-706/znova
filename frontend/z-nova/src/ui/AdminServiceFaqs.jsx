import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useCreateFaq } from '../features/faqs/useCreateFaq';
import { useServiceFaqs } from '../features/faqs/useServiceFaqs';
import { useUpdateFaq } from '../features/faqs/useUpdateFaq';
import { useDeleteFaq } from '../features/faqs/useDeleteFaq';
import { useServiceById } from '../features/services/useServiceById';
import styled from 'styled-components';
import { HiTrash, HiPencil, HiCheck } from 'react-icons/hi';
import Row from './Row';
import Heading from './Heading';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';
import SpinnerMini from './SpinnerMini';
import { useUser } from '../features/authentication/useUser';
import AdminBreadCrumbs from './adminBreadCrumbs';
import { useEffect, useState } from 'react';

const FaqContainer = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  &:first-of-type {
    border: none;
  }
`;

const FaqHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const DeleteIcon = styled(HiTrash)`
  cursor: pointer;
  color: var(--color-red-500);
  width: 2rem;
  height: 2rem;
`;

const EditIcon = styled(HiPencil)`
  cursor: pointer;
  color: var(--color-blue-500);
  width: 2rem;
  height: 2rem;
`;

const SaveIcon = styled(HiCheck)`
  cursor: pointer;
  color: var(--color-green-500);
  width: 2rem;
  height: 2rem;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
`;

function EditableFaq({ faq, index, onUpdate, onDelete }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      question: faq.question,
      answer: faq.answer,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({
    question: faq.question,
    answer: faq.answer,
  });

  useEffect(() => {
    setValue('question', faq.question);
    setValue('answer', faq.answer);
    setInitialValues({ question: faq.question, answer: faq.answer });
  }, [faq, setValue]);

  const handleSave = async (data) => {
    if (
      data.question !== initialValues.question ||
      data.answer !== initialValues.answer
    ) {
      await onUpdate({
        data: {
          ...data,
          serviceId: faq.serviceId,
          user: faq.user,
        },
        faqId: faq?._id,
      });
      setInitialValues(data);
    }
    setIsEditing(false);
  };

  return (
    <FaqContainer>
      <FaqHeader>
        <Heading as="h3" style={{ fontWeight: '500', fontSize: '1.4rem' }}>
          FAQ {index + 1}
        </Heading>
        <div style={{ display: 'flex', gap: '1.4rem' }}>
          {isEditing ? (
            <SaveIcon onClick={handleSubmit(handleSave)} />
          ) : (
            <EditIcon onClick={() => setIsEditing(true)} />
          )}
          <DeleteIcon onClick={() => onDelete(faq?._id)} />
        </div>
      </FaqHeader>
      <FormRow label="Question" error={errors.question?.message}>
        <Input
          placeholder="Enter FAQ question"
          type="text"
          {...register('question', { required: 'This field is required' })}
          disabled={!isEditing}
        />
      </FormRow>
      <FormRow label="Answer" error={errors.answer?.message}>
        <TextArea
          style={{ resize: 'none' }}
          placeholder="Enter FAQ answer"
          {...register('answer', { required: 'This field is required' })}
          disabled={!isEditing}
        />
      </FormRow>
    </FaqContainer>
  );
}

function AdminServiceFaqs() {
  const { serviceId } = useParams();
  const { user } = useUser();
  const methods = useForm({
    defaultValues: {
      question: '',
      answer: '',
    },
  });
  const { createFaq, status: createStatus } = useCreateFaq();
  const { faqs } = useServiceFaqs(serviceId);
  const { updateFaq } = useUpdateFaq();
  const { deleteFaq } = useDeleteFaq();
  const { service } = useServiceById(serviceId);

  const breadcrumbItems = [
    { label: 'Services', to: '/admin/services' },
    { label: 'Edit Service', to: `/admin/services/edit/${service?.slug}` },
    {
      label: 'FAQs',
      to: `/admin/services/${serviceId}/faqs`,
      active: true,
    },
  ];

  const onSubmit = async (data) => {
    await createFaq({ ...data, serviceId, user: user?._id });
    methods.reset();
  };

  return (
    <>
      <AdminBreadCrumbs items={breadcrumbItems} />
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          Manage FAQs
        </Heading>
      </Row>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <FaqContainer>
            <FaqHeader>
              <Heading
                as="h3"
                style={{ fontWeight: '500', fontSize: '1.5rem' }}
              >
                Add FAQ
              </Heading>
            </FaqHeader>
            <FormRow
              label="Question"
              error={methods.formState.errors.question?.message}
            >
              <Input
                placeholder="Enter FAQ question"
                type="text"
                {...methods.register('question', {
                  required: 'This field is required',
                })}
              />
            </FormRow>
            <FormRow
              label="Answer"
              error={methods.formState.errors.answer?.message}
            >
              <TextArea
                style={{ resize: 'none' }}
                placeholder="Enter FAQ answer"
                {...methods.register('answer', {
                  required: 'This field is required',
                })}
              />
            </FormRow>
            <StyledButton type="submit">
              {createStatus === 'pending' ? <SpinnerMini /> : 'Create FAQ'}
            </StyledButton>
          </FaqContainer>
        </Form>
      </FormProvider>
      {faqs?.length > 0 && (
        <>
          <Heading as="h2" style={{ fontWeight: '500', fontSize: '1.8rem' }}>
            Existing FAQs
          </Heading>
          {faqs?.map((faq, index) => (
            <EditableFaq
              key={faq._id}
              faq={faq}
              index={index}
              onUpdate={updateFaq}
              onDelete={deleteFaq}
            />
          ))}
        </>
      )}
    </>
  );
}

export default AdminServiceFaqs;
