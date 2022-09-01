import Header from './Header';

const Page = ({ children }) => (
  <div>
    <Header />
    <h1>I'm the page component.</h1>
    {children}
  </div>
);

export default Page;
