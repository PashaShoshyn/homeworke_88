// Закладки
    const bookmarkInput = document.getElementById('bookmarkInput');
    const addBookmarkBtn = document.getElementById('addBookmarkBtn');
    const bookmarkList = document.getElementById('bookmarkList');

    function loadBookmarks() {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      bookmarkList.innerHTML = '';
      bookmarks.forEach((url, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = url;
        a.textContent = url;
        a.target = '_blank';

        const del = document.createElement('button');
        del.textContent = 'Видалити';
        del.className = 'delete';
        del.onclick = () => {
          bookmarks.splice(index, 1);
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          loadBookmarks();
        };

        li.appendChild(a);
        li.appendChild(del);
        bookmarkList.appendChild(li);
      });
    }

    addBookmarkBtn.onclick = () => {
      const url = bookmarkInput.value.trim();
      if (url) {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.push(url);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        bookmarkInput.value = '';
        loadBookmarks();
      }
    };

    loadBookmarks();

    // Форма
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const saveBtn = document.getElementById('saveBtn');

    saveBtn.onclick = () => {
      localStorage.setItem('formData', JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value
      }));
    };

    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      usernameInput.value = savedData.username;
      passwordInput.value = savedData.password;
    }

    // Продукти
    import { products } from './data.js';

    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');

    function displayProducts(list) {
      productList.innerHTML = list.map(product => `
        <li class="product-item">
          <h2 class="name">${product.name}</h2>
          <p class="price">Price: $${product.price}</p>
          <p class="description">${product.description}</p>
        </li>
      `).join('');
    }

    searchInput.addEventListener('input', () => {
      const value = searchInput.value.toLowerCase();
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value) ||
        p.description.toLowerCase().includes(value)
      );
      displayProducts(filtered);
    });

    displayProducts(products);