import { useSelector } from 'react-redux';
import AuthForm from '../../components/AuthForm/AuthForm';
import AuthorizationImage from '../../components/AuthorizationImage/AuthorizationImage';
import Container from '../../components/Container/Container';
import Section from '../../components/Section/Section';
import Loader from '../../components/Loader/Loader';

import { selectIsLoading } from '../../redux/auth/selectors';

import s from './AuthPages.module.css';

const AuthPage = () => {
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) return <Loader />;

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
