import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOut = ({ children }) => {
  const [signout, { data }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  console.log(data);
  return (
    <button type="button" onClick={signout}>
      {children}
    </button>
  );
};

export default SignOut;
