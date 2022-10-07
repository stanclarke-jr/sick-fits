import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import ErrorMessage from './DisplayError';
import Form from './styles/FormStyles';
// import { CURRENT_USER_QUERY } from './User';

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;
const RequestPasswordReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [requestPasswordReset, { data, error }] = useMutation(
    REQUEST_PASSWORD_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the form from submitting
    await requestPasswordReset().catch(console.error);
    resetForm();
    // Send the email and password to the GraphQL api
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <ErrorMessage error={error} />

      <h2>Request a Password Reset</h2>
      <fieldset disabled={false} aria-busy={false}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link.</p>
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
        <button type="submit">Reset Your Password</button>
      </fieldset>
    </Form>
  );
};

export default RequestPasswordReset;
