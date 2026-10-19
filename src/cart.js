function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть положительным");
  }
  const existingItem = cart.find((item) => item.id === product.id);
  const newQuantity = (existingItem?.quantity || 0) + quantity;
  if (newQuantity > product.stock) {
    throw new RangeError("Недостаточно товара на складе");
  }
  if (existingItem) {
    return cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  }
  return [...cart, { ...product, quantity }];
}
function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть положительным");
  }
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem && quantity > existingItem.stock) {
    throw new RangeError("Количество больше остатка");
  }
  return cart.map((item) => {
    if (item.id === productId) {
      return { ...item, quantity };
    }
    return item;
  });
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => {
    if (item.id === productId) {
      return false;
    }
    return true;
  });
}
function calculateCartSubtotal(cart) {
  if (cart.length === 0) {
    return 0;
  }
  return cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
}
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;
  let delivery = 0;
  if (promoCode === "SAVE10" && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }
  if (subtotal < 50000) {
    delivery = 30000;
  }
  const total = subtotal - discount + delivery;
  return { subtotal, discount, delivery, total };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
