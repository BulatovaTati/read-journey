import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import Reading from '../../components/Reading/Reading';

import s from './ReadingPage.module.css';

const ReadingPage = () => {
  return (
    <Section>
      <Container>
        <Reading />
      </Container>
    </Section>
  );
};

export default ReadingPage;
