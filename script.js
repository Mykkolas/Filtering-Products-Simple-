const data = [
    {
        id: 1,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
        description: "A classic diver watch with reliable waterproof features.",
    },
    {
        id: 2,
        name: "Invicta Men's Pro Diver 2",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 90,
        cat: "Dress",
        description: "An upgraded diver watch with a sleek design.",
    },
    {
        id: 3,
        name: "Timex Men's Expedition Scout",
        img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
        price: 40,
        cat: "Sport",
        description: "A rugged watch perfect for outdoor adventures.",
    },
    {
        id: 4,
        name: "Breitling Superocean Heritage",
        img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
        price: 200,
        cat: "Luxury",
        description: "A luxury watch with vintage styling and modern features.",
    },
    {
        id: 5,
        name: "Casio Classic Resin Strap",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        cat: "Sport",
        description: "A durable and affordable watch for daily wear.",
    },
    {
        id: 6,
        name: "Garmin Venu Smartwatch",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 74,
        cat: "Casual",
        description: "A smartwatch with advanced fitness tracking features.",
    },
    {
        id: 7,
        name: "Benyar Watch",
        img: "https://m.media-amazon.com/images/I/71sj7eCYG9L._AC_UL480_FMwebp_QL65_.jpg",
        price: 166,
        cat: "Sport",
        description: "A stylish and durable watch for sports enthusiasts.",
    },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const popup = document.getElementById("popup");
const popupDescription = document.getElementById("popupDescription");
const closeBtn = document.getElementById("closeBtn");

const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts
        .map(
            (product) =>
                `<div class="product">
          <img src="${product.img}" alt="" onclick="showPopup('${product.description}')" />
          <span class="name">${product.name}</span>
          <span class="priceText">$${product.price}</span>
        </div>`
        )
        .join("");
};

const showPopup = (description) => {
    popupDescription.textContent = description;
    popup.style.display = "flex";
};

const hidePopup = () => {
    popup.style.display = "none";
};

closeBtn.addEventListener("click", hidePopup);
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        hidePopup();
    }
});

displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();
    if (value) {
        displayProducts(data.filter((item) => item.name.toLowerCase().includes(value)));
    } else {
        displayProducts(data);
    }
});

const setCategories = () => {
    const allCats = data.map((item) => item.cat);
    const categories = ["All", ...new Set(allCats)];
    categoriesContainer.innerHTML = categories
        .map((cat) => `<span class="cat">${cat}</span>`)
        .join("");

    categoriesContainer.addEventListener("click", (e) => {
        const selectedCat = e.target.textContent;
        selectedCat === "All"
            ? displayProducts(data)
            : displayProducts(data.filter((item) => item.cat === selectedCat));
    });
};

const setPrices = () => {
    const prices = data.map((item) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "$" + maxPrice;

    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = "$" + e.target.value;
        displayProducts(data.filter((item) => item.price <= e.target.value));
    });
};

const btn = document.getElementById("btn");
const leftMenu = document.getElementById("left");

btn.addEventListener("click", () => {
    leftMenu.classList.toggle("active");
    btn.classList.toggle("active");
});

setCategories();
setPrices();
