import styled from 'styled-components';
import PasswordReset from '../components/PasswordReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const SignInPage = () => (
  <GridStyles>
    <SignIn />
    <SignUp />
    <PasswordReset />
  </GridStyles>
);

export default SignInPage;

// ----- STYLED COMPONENTS ----- //

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;