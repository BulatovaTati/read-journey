import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import MyLibrary from '../../components/MyLibrary/MyLibrary';

import s from './MyLibraryPage.module.css'

const MyLibraryPage = () => {
  return (
    <Section>
      <Container>
        <MyLibrary />
      </Container>
    </Section>
  );
};

export default MyLibraryPage;
