import Pagination from '../components/Pagination';
import Products from '../components/Products';

const ProductsPage = () => {
  console.log('Products page');
  return (
    <div>
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </div>
  );
};

export default ProductsPage;
