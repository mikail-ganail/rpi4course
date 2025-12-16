export class ProductView {
  constructor() {
    this.form = document.getElementById('product-form');
    this.titleInput = document.getElementById('product-title');
    this.categoryInput = document.getElementById('product-category');
    this.inStockInput = document.getElementById('product-instock');

    this.stockFilterRadios = document.querySelectorAll(
      'input[name="stock-filter"]'
    );
    this.categoryFilter = document.getElementById('category-filter');
    this.searchFilter = document.getElementById('search-filter');

    this.list = document.getElementById('product-list');
    this.counter = document.getElementById('counter');
  }

  bindAddProduct(handler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        title: this.titleInput.value.trim(),
        category: this.categoryInput.value,
        inStock: this.inStockInput.checked,
      };
      if (!data.title) return;
      handler(data);
      this.form.reset();
      this.inStockInput.checked = true;
    });
  }

  bindFiltersChange(handler) {
    this.stockFilterRadios.forEach(r =>
      r.addEventListener('change', () => handler())
    );
    this.categoryFilter.addEventListener('change', () => handler());
    this.searchFilter.addEventListener('input', () => handler());
  }

  getFilters() {
    const stock = [...this.stockFilterRadios].find(r => r.checked).value;
    const category = this.categoryFilter.value;
    const search = this.searchFilter.value.trim().toLowerCase();
    return { stock, category, search };
  }

  renderList(products) {
    this.list.innerHTML = '';

    if (!products.length) {
      this.list.innerHTML = '<p>Товары не найдены</p>';
    } else {
      products.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card product-card';
        card.innerHTML = `
          <h3>${p.title}</h3>
          <p>Категория: ${this.mapCategory(p.category)}</p>
          <p>Статус:
            <span class="${p.inStock ? 'tag-success' : 'tag-danger'}">
              ${p.inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </p>
        `;
        this.list.appendChild(card);
      });
    }

    this.counter.textContent =
      `${products.length} ${this.pluralize(products.length, 'товар', 'товара', 'товаров')}`;
  }

  mapCategory(code) {
    const map = {
      tshirt: 'Футболка',
      hoodie: 'Худи',
      jeans: 'Джинсы',
      jacket: 'Куртка',
      shoes: 'Обувь',
    };
    return map[code] || code;
  }

  pluralize(n, one, two, many) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return two;
    return many;
  }
}
