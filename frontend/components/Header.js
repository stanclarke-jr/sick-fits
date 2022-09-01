import Link from 'next/link';
import Nav from './Nav';

const Header = () => (
  <header>
    <div className="bar">
      <Link href="/">
        <h1>
          <a href="/"> Sick Fits</a>
        </h1>
      </Link>
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <Nav />
  </header>
);

export default Header;


