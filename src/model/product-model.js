export class ProductModel {
  constructor(initialData = []) {
    this.products = [...initialData];
    this.nextId = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;
  }

  getAll() {
    return [...this.products];
  }

  addProduct({ title, category, inStock }) {
    const product = { id: this.nextId++, title, category, inStock };
    this.products.push(product);
    return product;
  }
}
