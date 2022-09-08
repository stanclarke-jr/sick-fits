const formatMoney = (cents = 0): string | number => {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // Check if there are 0 cents or clean dollar amount
  if (cents % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = new Intl.NumberFormat('en-US', options);
  const dollars = cents / 100;
  console.log(typeof cents);
  console.log(typeof formatter);
  console.log(typeof dollars);
  return formatter.format(dollars);
};

export default formatMoney;
