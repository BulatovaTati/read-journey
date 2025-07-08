import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import Recommended from '../../components/Recommended/Recommended';

import s from './RecommendedPage.module.css';

const RecommendedPage = () => {
  return (
    <Section>
      <Container>
        <Recommended />
      </Container>
    </Section>
  );
};

export default RecommendedPage;
