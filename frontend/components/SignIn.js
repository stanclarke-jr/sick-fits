import useForm from '../lib/useForm';
import Form from './styles/FormStyles';

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the form from submitting
    console.log(inputs);
    // Send the email and password to the GraphQL api
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
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
