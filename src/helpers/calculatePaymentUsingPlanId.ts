export const calculateTotalPrice = (ammount: number) => {
  const subtotal = ammount;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  return { total };
};
