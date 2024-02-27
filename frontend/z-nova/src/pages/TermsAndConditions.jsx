import styled from 'styled-components';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

const StyledTCS = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  padding: 4rem 12rem 4rem;
  letter-spacing: 0.2px;
  font-size: 1.6rem;
`;

function TermsAndConditions() {
  return (
    <StyledTCS>
      <Heading as="h1" style={{ textAlign: 'center', fontSize: '2.8rem' }}>
        Terms and Conditions
      </Heading>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">What you cannot do</Heading>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
          eveniet, sed, at ad ab molestiae adipisci reprehenderit ea ullam ut
          commodi fugit impedit assumenda eum beatae ipsa laborum iusto quo
          repellendus? Laboriosam dicta ratione alias at impedit. Quam eveniet a
          delectus earum distinctio quasi? Quas, autem.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">How we uses you data?</Heading>
        <p>
          Molestias nihil illum quia, amet, perspiciatis provident laboriosam
          facere voluptatem sunt iste cupiditate quae, tempore odit vitae
          dolorum. Nam, officia. Aliquam culpa doloremque explicabo perferendis.
          Labore inventore quod blanditiis voluptatum, voluptas porro fugiat aut
          molestias ad dolore libero placeat aspernatur, quam saepe reiciendis
          natus? Asperiores, provident maiores. Maxime, cumque sint voluptas
          reprehenderit quae obcaecati.
        </p>
      </Row>
      <Row style={{ gap: '1rem' }}>
        <Heading as="h2">Why we collect your data?</Heading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          aperiam ipsum repellat ullam dignissimos cupiditate eum tempore sit
          hic inventore voluptatibus, similique, facilis dicta ab error expedita
          unde voluptate? Quo necessitatibus impedit fugiat sint dignissimos
          omnis incidunt a deserunt! Necessitatibus, rerum. Non magni repellat
          ipsam dolores excepturi modi ratione dicta?
        </p>
      </Row>
    </StyledTCS>
  );
}

export default TermsAndConditions;
