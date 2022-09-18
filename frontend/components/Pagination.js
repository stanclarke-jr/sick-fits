import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import ErrorMessage from './DisplayError';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { loading, error, data } = useQuery(PAGINATION_QUERY);
  if (loading) return 'Loading...';
  if (error) return <ErrorMessage>Error: {error.message}</ErrorMessage>;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits | Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>⬅ Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next ➡</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
