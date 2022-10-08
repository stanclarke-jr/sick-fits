/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { calculateTotalPrice as totalPrice } from '../lib/calculateTotalPrice';
import formatMoney from '../lib/formatMoney';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';

const CartItem = ({ cartItem }) => {
  const { name, photo, altText, price } = cartItem?.product;
  if (!cartItem.product) return null;

  return (
    <CartItemStyles>
      <img src={photo?.image?.publicUrlTransformed} alt={altText} />
      <div>
        <h3>{name}</h3>
        <p>
          {formatMoney(price * cartItem.quantity)} -{' '}
          <em>
            {cartItem.quantity} &times; {formatMoney(price)} each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
};

const Cart = () => {
  const user = useUser();
  if (!user) return null;
  return (
    <CartStyles open>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(totalPrice(user.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;

// ------ STYLED COMPONENTS ----- //

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    width: 100px;
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;
