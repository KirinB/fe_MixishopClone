export const formattedPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
};
