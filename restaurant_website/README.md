# 🍽️ Aura Bistro & Lounge - Luxury Restaurant Website

Yeh ek complete, realistic aur modern restaurant website hai jisme **HTML**, **CSS**, aur **JavaScript** teeno alag-alag files me banaye gaye hain aur ek doosre se seamlessly connect kiye gaye hain.

---

## 📁 File Structure & Connection Guide

```text
restaurant_website/
│
├── index.html        # Main HTML structure
├── style.css         # Styling, Layouts, Animations & Responsive Design
├── script.js         # Dynamic Menu Filtering, Interactive Cart, Reservations, Modals
├── README.md         # Documentation & guide
└── images/           # High-resolution generated images
    ├── hero_ambiance.jpg
    ├── dish_salmon.jpg
    └── dessert_lava.jpg
```

### 1. HTML me CSS kaise connect hai:
`index.html` ke `<head>` tag ke andar:
```html
<link rel="stylesheet" href="style.css">
```

### 2. HTML me JavaScript kaise connect hai:
`index.html` ke `</body>` tag se theek pehle:
```html
<script src="script.js"></script>
```

### 3. JavaScript me HTML elements kaise control ho rahe hain:
`script.js` me DOM manipulation (`document.getElementById()`, `addEventListener()`, `classList.toggle()`) se:
- **Menu Filtering & Live Search**: Category tabs (Starters, Mains, Desserts, Drinks) aur Veg/Chef Special filters.
- **Cart System**: Dishes add karna, quantity increase/decrease, subtotal + GST calculation, aur checkout.
- **Table Reservation Form**: Real-time form validation, today's date lock, aur instant confirmation modal with Reference ID.
- **Reviews Carousel**: Patrons ke testimonials ka smooth interactive slider.

---

## 🚀 How to Run Locally

1. Is ZIP folder (`restaurant_website.zip`) ko extract / unzip karein.
2. `index.html` par double click karein ya kisi bhi browser (Google Chrome, Edge, Firefox) me open karein.
3. VS Code me **Live Server** extension ke sath bhi direct run kar sakte hain!
