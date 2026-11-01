
const form = document.getElementById("shopping");
const products = document.getElementById("products");

const API_URL = "https://crudcrud.com/api/6e1a1358355243f1bc7149e73c8701a1/products";

// Categories
const categories = [
    "food",
    "electronics",
    "medicine",
    "skincare",
    "clothes",
    "shoes",
    "homedecor"
];

// GET: Fetch products from CrudCrud
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get(API_URL);

        displayProducts(response.data);

    } catch (error) {
        console.log("Error fetching products:", error);
    }
});


// POST: Add product to CrudCrud
form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const productDetails = {
        sellingPrice: document.getElementById("amount").value,
        productName: document.getElementById("name").value,
        category: document.getElementById("category").value
    };

    try {
        const response = await axios.post(API_URL, productDetails);

        // Display the newly added product
        displayProducts([response.data], true);

        // Clear the form
        form.reset();

    } catch (error) {
        console.log("Error adding product:", error);
    }

});


// Display products under their respective categories
function displayProducts(productArray, append = false) {

    if (!append) {
        products.innerHTML = "";
    }

    categories.forEach(category => {

        let categorySection = document.getElementById(category);

        // Create category section if it doesn't exist
        if (!categorySection) {

            const heading = document.createElement("h3");
            heading.innerText = category.toUpperCase();

            const productList = document.createElement("ul");
            productList.id = category;

            products.appendChild(heading);
            products.appendChild(productList);

            categorySection = productList;
        }

        // Display products belonging to this category
        productArray.forEach(product => {

            if (product.category === category) {

                const productItem = document.createElement("li");

                productItem.innerText =
                    `${product.sellingPrice} - ${product.productName} `;

                // Delete button
                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "Delete product";

                deleteBtn.addEventListener("click", async function () {

                    try {

                        await axios.delete(
                            `${API_URL}/${product._id}`
                        );

                        productItem.remove();

                    } catch (error) {
                        console.log("Error deleting product:", error);
                    }

                });

                productItem.appendChild(deleteBtn);

                categorySection.appendChild(productItem);
            }

        });

    });

}
