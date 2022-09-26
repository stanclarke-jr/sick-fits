import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import ErrorMessage from './DisplayError';
import Form from './styles/FormStyles';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // Refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the form from submitting
    await signin();
    resetForm();
    // Send the email and password to the GraphQL api
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <ErrorMessage error={data?.authenticateUserWithPassword} />

      <h2>Sign In to your account</h2>
      <fieldset disabled={false} aria-busy={false}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Choose a password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
