import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import Recommended from '../../components/Recommended/Recommended';

import s from './RecommendedPage.module.css';

const RecommendedPage = () => {
  return (
    <Section>
      <Container  modClass={s.recommended}>
        <Recommended />
      </Container>
    </Section>
  );
};

export default RecommendedPage;
