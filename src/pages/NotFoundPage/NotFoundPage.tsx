import { Link } from 'react-router-dom';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';

import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <main>
      <Section>
        <Container>
          <h1 className={s.title}>404 - Page Not Found</h1>
          <p className={s.paragraph}>
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
          <p className={s.paragraph}>Please check the URL for any mistakes or return to the</p>
          <Link to="/" className={s.link}>
            Homepage
          </Link>
        </Container>
      </Section>
    </main>
  );
};

export default NotFoundPage;
