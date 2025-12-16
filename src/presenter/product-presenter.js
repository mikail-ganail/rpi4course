export class ProductPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindAddProduct(this.handleAddProduct.bind(this));
    this.view.bindFiltersChange(this.updateView.bind(this));

    this.updateView();
  }

  handleAddProduct(data) {
    this.model.addProduct(data);
    this.updateView();
  }

  updateView() {
    const filters = this.view.getFilters();
    const all = this.model.getAll();

    const filtered = all.filter((p) => {
      let ok = true;

      if (filters.stock === "in") ok = ok && p.inStock;
      if (filters.stock === "out") ok = ok && !p.inStock;

      if (filters.category !== "all") {
        ok = ok && p.category === filters.category;
      }

      if (filters.search) {
        ok = ok && p.title.toLowerCase().includes(filters.search);
      }

      return ok;
    });

    this.view.renderList(filtered);
  }
}
