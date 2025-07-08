import AuthForm from '../../components/AuthForm/AuthForm';
import AuthorizationImage from '../../components/AuthorizationImage/AuthorizationImage';
import Container from '../../components/Container/Container';
import Section from '../../components/Section/Section';
import s from './AuthPages.module.css';

const AuthPage = () => {
  return (
    <Section>
      <Container modClass={s.authContainer}>
        <AuthForm />
        <AuthorizationImage />
      </Container>
    </Section>
  );
};

export default AuthPage;
