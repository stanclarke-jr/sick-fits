/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import ErrorMessage from './DisplayError';
import Form from './styles/FormStyles';
// import { CURRENT_USER_QUERY } from './User';

const PASSWORD_RESET_MUTATION = gql`
  mutation PASSWORD_RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;
const PasswordReset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [passwordReset, { data, loading, error }] = useMutation(
    PASSWORD_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  const UIError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  console.log(error);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the form from submitting
    const response = await passwordReset().catch(console.error);
    console.log(response);
    console.log({ loading, error, data });
    resetForm();
    // Send the email and password to the GraphQL api
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <ErrorMessage error={error || UIError} />

      <h2>Reset Your Password</h2>
      <fieldset disabled={false} aria-busy={false}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! Go ahead and sign in!</p>
        )}
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
        <button type="submit">Reset Password!</button>
      </fieldset>
    </Form>
  );
};

export default PasswordReset;
