import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import Head from 'next/head';
import Router from 'next/router';
import useForm from '../lib/useForm';
import ErrorMessage from './DisplayError';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/FormStyles';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are being passed? And what types are they?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        status: "AVAILABLE"
        price: $price
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Holy Hoody',
    price: 37998,
    description: 'The coziest of hoodies!',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  // Create ref to clear the file input
  const inputRef = useRef(null);

  return (
    <>
      <Head>
        <title>Sick Fits | Add a product</title>
      </Head>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          // Submit the input fields to the backend
          const response = await createProduct();
          clearForm();
          inputRef.current.value = null;
          // Go to that product's page
          Router.push({
            pathname: `/product/${response.data.createProduct.id}`,
          });
        }}
      >
        <ErrorMessage error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="image">
            Image
            <input
              required
              type="file"
              name="image"
              id="image"
              ref={inputRef}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              value={inputs.price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              rows={4}
              name="description"
              id="description"
              placeholder="Description"
              value={inputs.description}
              onChange={handleChange}
            />
          </label>

          <button type="submit">+ Add Product</button>
        </fieldset>
      </Form>
    </>
  );
};

export default CreateProduct;
