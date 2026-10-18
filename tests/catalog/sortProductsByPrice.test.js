const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

describe("sortProductsByPrice", () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, "asc");
    const resultIds = result.map((item) => item.id);
    expect(resultIds).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products);
    const resultIds = result.map((item) => item.id);
    expect(resultIds).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const selectedProds = [products[0], products[2], products[3]];
    const result = sortProductsByPrice(selectedProds, "asc");
    const resultIds = result.map((item) => item.id);
    expect(resultIds).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, "desc");
    const resultIds = result.map((item) => item.id);
    expect(resultIds).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const selectedItems = [products[2], products[0], products[3]];
    const result = sortProductsByPrice(selectedItems, "desc");
    const resultIds = result.map((item) => item.id);
    expect(resultIds).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const selectedItems = [products[4], products[1], products[5]];
    const result = sortProductsByPrice(selectedItems, "desc");
    const resultIds = result.map((item) => item.id);
    expect(resultIds).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const selectedItems = [products[0], products[2], products[3]];
    sortProductsByPrice(selectedItems, "asc");
    const resultIds = selectedItems.map((item) => item.id);
    expect(resultIds).toEqual([1, 3, 4]);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const selectedItems = [products[0], products[2], products[3]];
    sortProductsByPrice(selectedItems, "desc");
    const resultIds = selectedItems.map((item) => item.id);
    expect(resultIds).toEqual([1, 3, 4]);
  });

  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    sortProductsByPrice(products);
    const resultIds = products.map((item) => item.id);
    expect(resultIds).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
