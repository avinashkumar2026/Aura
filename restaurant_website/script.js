/* ========================================================
   AURA BISTRO & LOUNGE - INTERACTIVE JAVASCRIPT
   Connects:
   - Header scroll & mobile navigation toggle
   - Menu dynamic filtering, live search & diet filters
   - Interactive cart drawer (add, remove, quantity update, total calculations)
   - Table reservation form with validation & confirmation receipt modal
   - Order checkout modal & in-page toast notifications
   - Customer review carousel controls
   ======================================================== */

// Global Menu Catalog
const MENU_DATA = [
    {
        id: 1,
        title: "Truffle Saffron Paneer Tikka",
        category: "starters",
        diet: "veg",
        special: true,
        price: 520,
        calories: "340 kcal",
        desc: "Artisanal cottage cheese marinated with royal Kashmiri saffron, Greek yogurt, finished with white truffle oil and pickled onion.",
        img: "images/hero_ambiance.jpg"
    },
    {
        id: 2,
        title: "Pan-Seared Atlantic Salmon",
        category: "mains",
        diet: "nonveg",
        special: true,
        price: 1150,
        calories: "520 kcal",
        desc: "Crispy skin salmon fillet, heirloom glazed baby carrots, tender asparagus, and signature saffron velouté reduction.",
        img: "images/dish_salmon.jpg"
    },
    {
        id: 3,
        title: "Wild Morel & Porcini Galouti",
        category: "starters",
        diet: "veg",
        special: false,
        price: 490,
        calories: "280 kcal",
        desc: "Melt-in-mouth smoked Himalayan wild morel kebabs served over mini saffron sheermal flatbread with mint emulsion.",
        img: "images/dish_salmon.jpg"
    },
    {
        id: 4,
        title: "Slow-Braised Nalli Gosht",
        category: "mains",
        diet: "nonveg",
        special: true,
        price: 980,
        calories: "680 kcal",
        desc: "Prime lamb shanks slow-simmered for 8 hours with brown onion, bone marrow stock, and aromatic Awadhi pot spices.",
        img: "images/hero_ambiance.jpg"
    },
    {
        id: 5,
        title: "Dal Aura (36-Hour Charcoal Simmer)",
        category: "mains",
        diet: "veg",
        special: false,
        price: 480,
        calories: "410 kcal",
        desc: "Organic black lentils slow-cooked overnight over gentle charcoal embers, enriched with churned white butter and vine tomatoes.",
        img: "images/hero_ambiance.jpg"
    },
    {
        id: 6,
        title: "Valrhona Gold Lava Cake",
        category: "desserts",
        diet: "veg",
        special: true,
        price: 580,
        calories: "450 kcal",
        desc: "70% dark Belgian cocoa center, raspberry compote, Madagascar bourbon vanilla gelato, dusted with 24K edible gold.",
        img: "images/dessert_lava.jpg"
    },
    {
        id: 7,
        title: "Rose Petal & Pistachio Kulfi",
        category: "desserts",
        diet: "veg",
        special: false,
        price: 360,
        calories: "290 kcal",
        desc: "Slow-reduced buffalo milk ice cream infused with organic Damascus rose petals, roasted Iranian pistachios, and falooda ribbons.",
        img: "images/dessert_lava.jpg"
    },
    {
        id: 8,
        title: "Smoked Saffron Cardamom Spritz",
        category: "beverages",
        diet: "veg",
        special: true,
        price: 380,
        calories: "120 kcal",
        desc: "Handcrafted mocktail with cold-infused saffron syrup, crushed green cardamom, clarified yuzu, and sparkling tonic water.",
        img: "images/hero_ambiance.jpg"
    },
    {
        id: 9,
        title: "Smoked Butter Chicken Roulade",
        category: "mains",
        diet: "nonveg",
        special: false,
        price: 790,
        calories: "590 kcal",
        desc: "Charcoal-roasted chicken breast stuffed with sundried tomato and cream cheese, bathed in satin makhani gravy.",
        img: "images/dish_salmon.jpg"
    },
    {
        id: 10,
        title: "Hibiscus Lychee Botanical Cooler",
        category: "beverages",
        diet: "veg",
        special: false,
        price: 320,
        calories: "95 kcal",
        desc: "Organic brewed ruby hibiscus blossom infusion, wild lychee nectar, fresh lime juice, and mountain mint leaves.",
        img: "images/dessert_lava.jpg"
    }
];

// Cart State (stored in memory & safe localStorage)
let cart = [];

function loadSavedCart() {
    try {
        const saved = localStorage.getItem("aura_cart");
        if (saved) {
            cart = JSON.parse(saved);
        }
    } catch (e) {
        // Fallback for isolated iframe
        cart = [];
    }
}

function saveCart() {
    try {
        localStorage.setItem("aura_cart", JSON.stringify(cart));
    } catch (e) {}
    updateCartUI();
}

// In-Page Toast Helper
function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "✓" : "ℹ️";

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-exit");
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// 1. Navbar Sticky & Mobile Toggle
function initNavigation() {
    const header = document.getElementById("header");
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Sticky Header Scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Mobile Toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
            });
        });
    }

    // Active link highlighting on scroll
    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section[id]");
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
}

// 2. Menu Rendering & Filtering
let activeCategory = "all";
let filterVegOnly = false;
let filterChefSpecial = false;
let searchQuery = "";

function renderMenu() {
    const grid = document.getElementById("menuGrid");
    const noResults = document.getElementById("noResultsMsg");
    if (!grid) return;

    grid.innerHTML = "";

    const filtered = MENU_DATA.filter(item => {
        const matchCategory = activeCategory === "all" || item.category === activeCategory;
        const matchVeg = !filterVegOnly || item.diet === "veg";
        const matchSpecial = !filterChefSpecial || item.special === true;
        const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchVeg && matchSpecial && matchSearch;
    });

    if (filtered.length === 0) {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
        filtered.forEach(dish => {
            const card = document.createElement("div");
            card.className = "menu-card";
            card.innerHTML = `
                <div class="menu-card-img">
                    <img src="${dish.img}" alt="${dish.title}">
                    <div class="card-badge-container">
                        <span class="dish-badge ${dish.diet}">${dish.diet === "veg" ? "Pure Veg" : "Non-Veg"}</span>
                        ${dish.special ? '<span class="dish-badge special">★ Chef Pick</span>' : ''}
                    </div>
                </div>
                <div class="menu-card-body">
                    <div class="menu-card-header">
                        <h3 class="dish-title">${dish.title}</h3>
                        <span class="dish-price">₹${dish.price}</span>
                    </div>
                    <p class="dish-desc">${dish.desc}</p>
                    <div class="menu-card-footer">
                        <span class="calorie-tag">${dish.calories}</span>
                        <button class="btn btn-outline btn-sm add-cart-btn" data-id="${dish.id}">
                            Add to Order +
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Attach Add to Cart Listeners
    document.querySelectorAll(".add-cart-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            addToCart(id);
        });
    });
}

function initMenuFilters() {
    // Category Tabs
    const tabs = document.querySelectorAll(".filter-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            activeCategory = tab.getAttribute("data-category");
            renderMenu();
        });
    });

    // Diet Toggles
    const vegBtn = document.getElementById("vegOnlyToggle");
    if (vegBtn) {
        vegBtn.addEventListener("click", () => {
            filterVegOnly = !filterVegOnly;
            vegBtn.setAttribute("data-active", filterVegOnly ? "true" : "false");
            renderMenu();
        });
    }

    const specialBtn = document.getElementById("chefSpecialToggle");
    if (specialBtn) {
        specialBtn.addEventListener("click", () => {
            filterChefSpecial = !filterChefSpecial;
            specialBtn.setAttribute("data-active", filterChefSpecial ? "true" : "false");
            renderMenu();
        });
    }

    // Search Input
    const searchInput = document.getElementById("menuSearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.trim();
            renderMenu();
        });
    }

    // Reset Filters Button
    const resetBtn = document.getElementById("resetFiltersBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            activeCategory = "all";
            filterVegOnly = false;
            filterChefSpecial = false;
            searchQuery = "";
            tabs.forEach(t => t.classList.remove("active"));
            if (tabs[0]) tabs[0].classList.add("active");
            if (vegBtn) vegBtn.setAttribute("data-active", "false");
            if (specialBtn) specialBtn.setAttribute("data-active", "false");
            if (searchInput) searchInput.value = "";
            renderMenu();
        });
    }

    // Featured Banner Add buttons
    document.querySelectorAll(".add-featured-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            addToCart(id);
        });
    });
}

// 3. Cart Functionality
function addToCart(dishId) {
    const dish = MENU_DATA.find(d => d.id === dishId);
    if (!dish) return;

    const existing = cart.find(item => item.id === dishId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: dish.id,
            title: dish.title,
            price: dish.price,
            quantity: 1
        });
    }

    saveCart();
    showToast(`Added "${dish.title}" to your order!`, "success");
}

function updateCartUI() {
    const badge = document.getElementById("cartBadge");
    const drawerCount = document.getElementById("cartDrawerCount");
    const emptyState = document.getElementById("cartEmptyState");
    const itemsList = document.getElementById("cartItemsList");
    const subtotalEl = document.getElementById("billSubtotal");
    const gstEl = document.getElementById("billGst");
    const serviceEl = document.getElementById("billService");
    const totalEl = document.getElementById("billTotal");

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (badge) badge.textContent = totalQty;
    if (drawerCount) drawerCount.textContent = `(${totalQty} items)`;

    if (!itemsList) return;
    itemsList.innerHTML = "";

    if (cart.length === 0) {
        if (emptyState) emptyState.classList.remove("hidden");
        if (subtotalEl) subtotalEl.textContent = "₹0";
        if (gstEl) gstEl.textContent = "₹0";
        if (serviceEl) serviceEl.textContent = "₹0";
        if (totalEl) totalEl.textContent = "₹0";
        return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <span class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${itemTotal}</span>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn dec-btn" data-id="${item.id}">-</button>
                <span class="qty-num">${item.quantity}</span>
                <button class="qty-btn inc-btn" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item-btn" data-id="${item.id}" title="Remove item">✕</button>
        `;
        itemsList.appendChild(row);
    });

    const gst = Math.round(subtotal * 0.05);
    const service = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + gst + service;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (gstEl) gstEl.textContent = `₹${gst.toLocaleString('en-IN')}`;
    if (serviceEl) serviceEl.textContent = `₹${service.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

    // Attach item quantity & remove buttons
    itemsList.querySelectorAll(".inc-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity += 1;
                saveCart();
            }
        });
    });

    itemsList.querySelectorAll(".dec-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            const itemIndex = cart.findIndex(i => i.id === id);
            if (itemIndex > -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity -= 1;
                } else {
                    cart.splice(itemIndex, 1);
                }
                saveCart();
            }
        });
    });

    itemsList.querySelectorAll(".remove-item-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            cart = cart.filter(i => i.id !== id);
            saveCart();
            showToast("Item removed from order", "info");
        });
    });
}

function initCartDrawer() {
    const openBtn = document.getElementById("openCartBtn");
    const closeBtn = document.getElementById("closeCartBtn");
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    const browseBtn = document.getElementById("cartEmptyBrowseBtn");

    function openDrawer() {
        if (drawer && overlay) {
            drawer.classList.add("active");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }

    function closeDrawer() {
        if (drawer && overlay) {
            drawer.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    if (openBtn) openBtn.addEventListener("click", openDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);
    if (browseBtn) browseBtn.addEventListener("click", closeDrawer);

    // Checkout Flow
    const checkoutBtn = document.getElementById("checkoutBtn");
    const orderModal = document.getElementById("orderModalBackdrop");
    const closeOrderBtn = document.getElementById("closeOrderModalBtn");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                showToast("Your table order is empty!", "info");
                return;
            }

            closeDrawer();

            // Populate order modal
            const randomCode = "#ORD-" + Math.floor(1000 + Math.random() * 9000);
            const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const grandTotal = Math.round(subtotal * 1.10);

            document.getElementById("modalOrderCode").textContent = randomCode;
            document.getElementById("modalOrderItemsCount").textContent = `${totalQty} items (${cart.length} unique dishes)`;
            document.getElementById("modalOrderTotal").textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

            orderModal.classList.add("active");

            // Clear Cart after ordering
            cart = [];
            saveCart();
        });
    }

    if (closeOrderBtn && orderModal) {
        closeOrderBtn.addEventListener("click", () => {
            orderModal.classList.remove("active");
            showToast("Order transmitted to executive chef's station!", "success");
        });
    }
}

// 4. Reservation System
function initReservation() {
    const resForm = document.getElementById("reservationForm");
    const dateInput = document.getElementById("resDate");
    const resModal = document.getElementById("resModalBackdrop");
    const closeResBtn = document.getElementById("closeResModalBtn");

    // Set min date to today
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    if (resForm) {
        resForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("resName").value.trim();
            const phone = document.getElementById("resPhone").value.trim();
            const date = document.getElementById("resDate").value;
            const time = document.getElementById("resTime").value;
            const guests = document.getElementById("resGuests").value;
            const area = document.getElementById("resArea").value;

            if (!name || !phone || !date) {
                showToast("Please fill in all required fields", "info");
                return;
            }

            // Generate Booking Reference
            const randomCode = "#AUR-" + Math.floor(1000 + Math.random() * 9000);
            document.getElementById("modalResCode").textContent = randomCode;
            document.getElementById("modalResName").textContent = name;
            document.getElementById("modalResDateTime").textContent = `${date} at ${time}`;
            document.getElementById("modalResGuests").textContent = `${guests} Guests`;
            document.getElementById("modalResArea").textContent = area;

            resModal.classList.add("active");
            showToast(`Table confirmed for ${name}!`, "success");
            resForm.reset();

            // Reset date to today
            if (dateInput) {
                const today = new Date().toISOString().split("T")[0];
                dateInput.value = today;
            }
        });
    }

    if (closeResBtn && resModal) {
        closeResBtn.addEventListener("click", () => {
            resModal.classList.remove("active");
        });
    }
}

// 5. Testimonial Reviews Slider
function initReviewSlider() {
    const cards = document.querySelectorAll(".review-card");
    const dots = document.querySelectorAll(".review-dots .dot");
    const prevBtn = document.getElementById("prevReviewBtn");
    const nextBtn = document.getElementById("nextReviewBtn");
    let currentIndex = 0;
    let autoSlideTimer = null;

    function showReview(index) {
        cards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
        currentIndex = index;
    }

    function nextReview() {
        const next = (currentIndex + 1) % cards.length;
        showReview(next);
    }

    function prevReview() {
        const prev = (currentIndex - 1 + cards.length) % cards.length;
        showReview(prev);
    }

    if (nextBtn) nextBtn.addEventListener("click", () => {
        nextReview();
        resetAutoSlide();
    });

    if (prevBtn) prevBtn.addEventListener("click", () => {
        prevReview();
        resetAutoSlide();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            showReview(i);
            resetAutoSlide();
        });
    });

    function startAutoSlide() {
        autoSlideTimer = setInterval(nextReview, 6000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    if (cards.length > 0) {
        startAutoSlide();
    }
}

// 6. Newsletter Subscription Form
function initNewsletter() {
    const form = document.getElementById("newsletterForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("newsletterEmail").value.trim();
            if (email) {
                showToast("Welcome to Connoisseurs Club! Check your inbox.", "success");
                form.reset();
            }
        });
    }
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
    loadSavedCart();
    initNavigation();
    initMenuFilters();
    renderMenu();
    updateCartUI();
    initCartDrawer();
    initReservation();
    initReviewSlider();
    initNewsletter();
});
