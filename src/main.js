import { mockProducts } from "./mock/mock.js";
import { ProductModel } from "./model/product-model.js";
import { ProductView } from "./view/view.js";
import { ProductPresenter } from "./presenter/product-presenter.js";

class Main {
  constructor() {
    this.model = new ProductModel(mockProducts);
    this.view = new ProductView();
    this.presenter = new ProductPresenter(this.model, this.view);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Main();
});
