import { useParams } from 'react-router-dom';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { useCreateFaq } from '../features/faqs/useCreateFaq';
import styled from 'styled-components';
import { HiPlus, HiTrash } from 'react-icons/hi';
import Row from './Row';
import Heading from './Heading';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';
import SpinnerMini from './SpinnerMini';
import toast from 'react-hot-toast';
import { useUser } from '../features/authentication/useUser';

const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FaqHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddFaqButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-brand-600);
  color: white;
  padding: 0.8rem 1.6rem;
`;

const DeleteIcon = styled(HiTrash)`
  cursor: pointer;
  color: var(--color-red-500);
  width: 1.8rem;
  height: 1.8rem;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
`;

function AdminServiceFaqs() {
  const { serviceId } = useParams();
  const { user } = useUser();
  const methods = useForm({
    defaultValues: {
      faqs: [{ question: '', answer: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'faqs',
  });
  const { createFaq, status } = useCreateFaq();

  const addFaq = () => {
    if (fields.length >= 10) {
      toast.error('You can only add up to 10 FAQs.');
      return;
    }
    append({ question: '', answer: '' });
  };

  const onSubmit = async (data) => {
    const filteredFaqs = data.faqs.filter(
      (faq) => faq.question.trim() !== '' && faq.answer.trim() !== '',
    );

    await Promise.all(
      filteredFaqs.map(({ question, answer }) =>
        createFaq({ question, answer, serviceId, user: user?._id }),
      ),
    );
    methods.reset({ faqs: [{ question: '', answer: '' }] });
  };

  return (
    <>
      <Row type="horizontal" style={{ alignItems: 'flex-start' }}>
        <Heading as="h1" style={{ fontWeight: '500', fontSize: '2rem' }}>
          Create FAQs
        </Heading>
        <AddFaqButton onClick={addFaq}>
          <HiPlus />
          Add FAQ
        </AddFaqButton>
      </Row>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <FaqContainer key={field.id}>
              <FaqHeader>
                <Heading
                  as="h3"
                  style={{ fontWeight: '500', fontSize: '1.5rem' }}
                >
                  FAQ {index + 1}
                </Heading>
                <DeleteIcon onClick={() => remove(index)} />
              </FaqHeader>
              <FormRow
                label="Question"
                error={
                  methods.formState.errors?.faqs?.[index]?.question?.message
                }
              >
                <Input
                  placeholder="Enter FAQ question"
                  type="text"
                  {...methods.register(`faqs.${index}.question`, {
                    required: 'This field is required',
                  })}
                />
              </FormRow>
              <FormRow
                label="Answer"
                error={methods.formState.errors?.faqs?.[index]?.answer?.message}
              >
                <TextArea
                  style={{ resize: 'none' }}
                  placeholder="Enter FAQ answer"
                  {...methods.register(`faqs.${index}.answer`, {
                    required: 'This field is required',
                  })}
                />
              </FormRow>
            </FaqContainer>
          ))}
          <StyledButton type="submit">
            {status === 'pending' ? <SpinnerMini /> : 'Create FAQs'}
          </StyledButton>
        </Form>
      </FormProvider>
    </>
  );
}

export default AdminServiceFaqs;
