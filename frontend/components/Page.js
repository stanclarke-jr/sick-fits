import Header from './Header';
import { GlobalStyles, InnerStyles } from './styles/GlobalStyles';

const Page = ({ children }) => (
  <div>
    <GlobalStyles />
    <Header />
    <InnerStyles>{children}</InnerStyles>
  </div>
);

export default Page;
