export const calculateTotalPrice = (cart) =>
  cart.reduce((tally, item) => {
    if (!item.product) return tally; // Products can be deleted, but still in the cart
    return tally + item.quantity * item.product.price;
  }, 0);
