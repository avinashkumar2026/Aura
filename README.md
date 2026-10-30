# 🍽️ Aura Bistro & Lounge – Luxury Restaurant Website

A complete, modern and responsive restaurant website built with **HTML**, **CSS** and **JavaScript**. The three files are kept separate and connected to each other, so the code stays clean and easy to maintain. The project runs directly in the browser and needs no installation or server.

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Technologies Used](#-technologies-used)
4. [Project Structure](#-project-structure)
5. [How the Files Are Connected](#-how-the-files-are-connected)
6. [How to Run Locally](#-how-to-run-locally)
7. [Screenshots](#-screenshots)
8. [Limitations](#-limitations)
9. [Future Improvements](#-future-improvements)
10. [Author](#-author)

---

## 📖 Project Overview

Aura Bistro & Lounge is a front-end web project that presents a luxury restaurant online. Customers can browse the menu, search and filter dishes, add items to a cart with an automatic bill, reserve a table, and read reviews from other guests.

The goal of the project is to build a realistic, good-looking and fully interactive restaurant website using only core web technologies, without any framework.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Dynamic Menu** | Dishes shown in a responsive grid with image, name and price |
| **Category Tabs** | Starters, Mains, Desserts and Drinks |
| **Smart Filters** | Veg and Chef Special filters |
| **Live Search** | Matching dishes appear instantly while typing |
| **Interactive Cart** | Add dishes, increase or decrease quantity, remove items |
| **Billing** | Subtotal, GST and total calculated automatically, with checkout |
| **Table Reservation** | Booking form with real-time validation |
| **Date Lock** | Past dates cannot be selected |
| **Confirmation Modal** | Instant confirmation with a unique Reference ID |
| **Reviews Carousel** | Smooth, interactive slider of customer testimonials |
| **Responsive Design** | Works on mobile, tablet and desktop |
| **Animations** | CSS transitions and effects for a premium look |

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure (hero, menu, cart, reservation, reviews) |
| CSS3 | Styling, layouts, animations and responsive design |
| JavaScript (ES6) | DOM manipulation, filtering, cart logic, validation and carousel |
| VS Code + Live Server | Development and instant reload (optional) |
| Web Browser | Chrome, Edge or Firefox |

---

## 📁 Project Structure

```text
restaurant_website/
│
├── index.html        # Main HTML structure
├── style.css         # Styling, layouts, animations and responsive design
├── script.js         # Menu filtering, cart, reservation, modal and carousel
├── README.md         # Project documentation
└── images/           # High-resolution images
    ├── hero_ambiance.jpg
    ├── dish_salmon.jpg
    └── dessert_lava.jpg
```

---

## 🔗 How the Files Are Connected

**1. CSS in HTML** – inside the `<head>` tag of `index.html`:

```html
<link rel="stylesheet" href="style.css">
```

**2. JavaScript in HTML** – just before the closing `</body>` tag:

```html
<script src="script.js"></script>
```

**3. JavaScript controlling HTML** – `script.js` uses DOM methods such as `document.getElementById()`, `addEventListener()` and `classList.toggle()` to:

- **Filter the menu** by category, Veg / Chef Special and live search.
- **Run the cart**: add dishes, change quantity, calculate subtotal, GST and total, and check out.
- **Handle reservations**: validate the form in real time, lock past dates and show a confirmation modal with a Reference ID.
- **Control the reviews carousel** with previous / next navigation.

---

## 🚀 How to Run Locally

1. Download or clone this repository and extract it if it is a ZIP file.
2. Open `index.html` by double-clicking it, or open it in any browser (Chrome, Edge, Firefox).
3. Optional: in VS Code, install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.

No installation, build step or server is required.

---

## 🖼️ Screenshots

| Hero Section | Signature Dish | Dessert |
|---|---|---|
| ![Hero](images/hero_ambiance.jpg) | ![Salmon](images/dish_salmon.jpg) | ![Dessert](images/dessert_lava.jpg) |

---

## ⚠️ Limitations

- The project is front-end only: there is no server or database, so orders and reservations are not stored permanently.
- Online payment, user login and an admin panel are not included.
- Menu data is kept in the JavaScript file, so changing a dish needs a code edit.

---

## 🚀 Future Improvements

- Back-end (Node.js or Flask) with a database for orders and reservations
- Online payment gateway
- User accounts with order history
- Admin dashboard to manage menu items, prices and bookings
- E-mail / SMS booking confirmations
- Multi-language support
- Accessibility (WCAG) improvements and image optimisation

---

## 👨‍💻 Author

**Avinash Kumar**
MCA, Chandigarh University (UID: 26MCA20021)

⭐ If you like this project, consider giving the repository a star.
