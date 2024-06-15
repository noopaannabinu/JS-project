document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById('products-container');
    const searchButton = document.getElementById('search-button');
    const resetButton = document.getElementById('reset-button');
    const searchInput = document.getElementById('search-input');

    let products = [];

    const fetchProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                products = data;
                displayProducts(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                productsContainer.innerHTML = '<p>Failed to load products.</p>';
            });
    };

    const displayProducts = (products) => {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            productElement.innerHTML = `
                
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                
                <p><strong>Price:</strong> $${product.price}</p>
                <button>Add to Cart</button>
            `;

            productsContainer.appendChild(productElement);
        });
    };

    const searchProducts = () => {
        const searchTerm = searchInput.value.trim().toLowerCase(); // Get and normalize the search term
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
    
        if (searchTerm === '') {
            // If search term is empty, display all products or handle as needed
            displayProducts(products);
        } else if (filteredProducts.length === 0) {
            // If no products match the search term
            displayNoProductFound();
        } else {
            // Display filtered products
            displayProducts(filteredProducts);
        }
    };
    
    const displayNoProductFound = () => {
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '<div class="no-product-found">No products found</div>';
    };
    
    
    
    

    const resetSearch = () => {
        searchInput.value = '';
        displayProducts(products);
    };

    searchButton.addEventListener('click', searchProducts);
    resetButton.addEventListener('click', resetSearch);

    // Fetch and display products on page load
    fetchProducts();
});
