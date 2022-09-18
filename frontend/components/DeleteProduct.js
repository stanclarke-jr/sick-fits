import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
  });
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this product?')) {
          // Delete item
          console.log('Deleting...');
        delee
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteProduct;
