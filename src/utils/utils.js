export const formatCurrencyVND = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
};
