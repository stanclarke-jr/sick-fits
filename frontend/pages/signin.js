import styled from 'styled-components';
import RequestPasswordReset from '../components/RequestPasswordReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const SignInPage = () => (
  <GridStyles>
    <SignIn />
    <SignUp />
    <RequestPasswordReset />
  </GridStyles>
);

export default SignInPage;

// ----- STYLED COMPONENTS ----- //

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;
