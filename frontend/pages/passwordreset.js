/* eslint-disable react/prop-types */
import RequestPasswordReset from '../components/RequestPasswordReset';
import PasswordReset from '../components/PasswordReset';

const PasswordResetPage = ({ query }) => {
  console.log(query);
  return (
    <div>
      {!query?.token ? (
        <>
          <p>Sorry, you must provide a token</p>
          <RequestPasswordReset />
        </>
      ) : (
        <PasswordReset token={query.token} />
      )}
    </div>
  );
};

export default PasswordResetPage;
