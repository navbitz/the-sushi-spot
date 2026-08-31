# The Sushi Spot — Vistara Technical Team Selection Challenge

> **Vistara Students Club · Technical Team Selection Challenge**
> *Frontend / Web Development Challenge: First-Year Student Edition*
> *"Take an existing website. Understand it. Reimagine it. Build it better."*

---

## 🌟 Overview & Live Link

A complete, modern, and user-focused frontend reimagining of the reference website **[the-sushi-spot.netlify.app](https://the-sushi-spot.netlify.app/)**, localized for a premium sushi dining experience in **Mylapore, Chennai**.

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Typography**: Lora (Editorial Serif) + Nunito (Clean Sans)

---

## 📋 Evaluation Checklist & Answers (From Brief)

### 1. What did you improve?

| Feature / Area | Original Reference (`the-sushi-spot.netlify.app`) | Our Reimagined Redesign |
|---|---|---|
| **Architecture** | Basic HTML/CSS template | Modular React SPA with Vite component architecture |
| **Visual Identity** | Standard web font, basic layout | Editorial typography (`Lora` serif + `Nunito`), warm cream & terracotta theme (`#FEF3ED` / `#D4603A`), subtle Japanese watermark (`寿司`) |
| **Menu Coverage** | 3 static item images | 10+ categorized dishes (Nigiri, Maki, Sashimi, Hand Rolls, Platters) with no repeating imagery |
| **Local Relevance** | Generic USD ($) prices | Localized for **Mylapore, Chennai** in INR (₹) with official **FSSAI Veg (🟢) / Non-Veg (🔴)** badges |
| **Interactivity** | None | Real-time Search, Category Filter, Dish Detail Modal, Favourites System, Slide-out Cart Drawer |
| **Responsiveness** | Basic layout | 100% Mobile-first responsive with touch drawer and collapse navigation |

---

### 2. What new features did you add?

As required by **Section 03 (Make It Yours)**, we implemented multiple key features:

1. **01 MENU FILTER**: Instant category tabs (*All, 🌿 Veg, Nigiri, Maki Rolls, Sashimi, Hand Rolls, Platters*).
2. **02 SEARCH**: Real-time dish search bar with instant query matching and clear actions.
3. **03 FAVORITES / LIKE**: Interactive heart button on every dish card to save user favorites.
4. **04 SIMPLE CART UI**: Slide-out cart drawer with live subtotal calculation, promo codes, and quantity adjustment (+/-).
5. **06 FOOD DETAILS POPUP**: Clicking any dish card opens an interactive modal showing piece count, ingredients, allergen warnings, FSSAI compliance, and quantity selector.
6. **07 LOCATION & CONTACT**: Embedded Google Map of Palm Avenue, Mylapore, complete with opening hours (9 AM - 11 PM), store phone number, and direct Google Maps directions CTA.
7. **08 INTERACTIVE PRODUCT CARDS**: Micro-animations including smooth image hover lifts, price badges, and quick-add buttons.
8. **09 SIMPLE OFFERS**: Two promotional deal cards featuring promo codes (`PARTY15` & `MYLAPORE10`).
9. **CUSTOMER REVIEWS & RATINGS**: Real-looking testimonial cards from Chennai foodies with 5-star ratings.
10. **EXPANDABLE FAQ ACCORDION**: Quick answers to common diner questions (FSSAI compliance, Jain options, parking).
11. **NEWSLETTER SUBSCRIPTION**: Footer email sign-up for weekly chef specials.

---

### 3. Why did you choose these features?

A restaurant website is only valuable if it helps a customer **explore food, check dietary requirements (Veg/Non-Veg), and make ordering decisions effortlessly**. 
Rather than creating random decorative features, every interaction (Veg filter, FSSAI badges, Dish detail modal, Cart drawer) was chosen to reflect how real diners in Chennai browse and order food.

---

### 4. What technologies did you use?

- **React 19 & Vite**: For lightning-fast development, component reusability, and clean state management (`useState`, `useMemo`).
- **Tailwind CSS v4 & Vanilla CSS**: Custom CSS design system using HSL color tokens (`--color-cream`, `--color-terracotta`), smooth keyframe animations (`anim-fade-up`), and glassmorphism backdrops.
- **Lucide React**: Crisp, modern SVG icons for shopping bags, search, hearts, and indicators.
- **Google Fonts**: `Lora` (for luxury headers) + `Nunito` (for clean, readable UI body copy).

---

### 5. How did you use AI? (Section 04 Compliance)

In accordance with the prompt guidance (*"AI IS ALLOWED. MEDIOCRITY IS NOT."*), AI was used as an intelligent co-pilot:

- **AI Assistance**:
  - Scaffolding initial component boilerplate and setup.
  - Generating 3D-styled, non-repeating sushi dish illustrations with exact color-matched backgrounds (`#FEF3ED`).
  - Refining responsive grid breakpoints.

- **What I Personally Refined & Directed**:
  - Re-architected the layout to strictly prioritize user utility over empty portfolio clutter.
  - Implemented the exact **FSSAI Indian food safety standard** (Green dot for Veg / Red dot for Non-Veg) for local relevance.
  - Redesigned the **Popular Dishes** section to match the original challenge reference card layout (floating images, clean typography).
  - Fine-tuned spacing, typography hierarchy, hover states, and color contrast ratios.

---

## 🛠️ How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd "The Sushi Spot"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start dev server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173`

---

## 🏆 Summary for Evaluators

This project fulfills **all 8 evaluation criteria** of the Vistara Technical Team Challenge:
- **UI Design**: Modern editorial aesthetic with warm Japanese tones and rich typography.
- **Creativity**: Authentic Chennai localization with FSSAI compliance and 3D dish assets.
- **User Experience**: Seamless flow from browsing to detail popup and cart management.
- **Responsiveness**: Fully tested on desktop, tablet, and mobile device widths.
- **Frontend Fundamentals**: Clean component separation, zero broken layouts, fast render times.

*Built with passion for the Vistara Students Club Technical Team Selection.*
