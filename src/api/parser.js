export function parseProduct(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    images: product.images,
    description: product.description,
    category: product.category,
    brand: product.brand,
  };
}
export function parseUser(user) {
  return {
    username: user.username,
    id: user.id,
    accessToken: user.accessToken,
    password: user.password,
  };
}
