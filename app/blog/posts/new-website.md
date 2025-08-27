---
title: "New Website UI"
date: "2025-08-19"
author: "Leelakrishna Ravuri"
readingTime: "4 min"
---

## 🌐 Introduction
When I started redesigning my portfolio’s **UI**, my vision was to build something that feels both **professional** and **personal**.  
No pre-built templates, no bloated frameworks — just **Next.js 14**, carefully crafted **CSS variables**, and a design system that adapts to every device and user preference.  

The result? A UI that’s **minimal, fast, and interactive**, while reflecting my personality as a developer.  

---

## 🎨 Design Principles
The new UI is grounded in three key principles:  

1. **Minimalism First** ✨  
   Less clutter, more focus. Muted backgrounds and clean grids create visual balance.  

2. **System-Based Theming** 🌓  
   Dark and Light modes adapt to the user’s OS preferences with smooth transitions.  

3. **Motion with Purpose** 🎬  
   **Framer Motion** animations are used sparingly — just enough to guide attention without distracting.  

> “Every pixel should have a reason to exist.”  

---

## ⚙️ Core Implementation

### 🧭 Layout & Navigation
The navigation bar is **global**, sticky, and lightweight.  
It ensures every page feels like part of the same system:  

```js
<nav className="nav">
  <div className="nav-inner">
    <div className="brand">🚀 Leelakrishna Ravuri</div>
    <div className="nav-links">
      <a href="/skills">Skills</a>
      <a href="/projects">Projects</a>
      <a href="/blog">Blog</a>
    </div>
  </div>
</nav>
```

---

### 🎯 Hero Section
The landing section uses a **text hierarchy** (kicker → headline → description) alongside a **parallax avatar**:  

- Avatar replaces a logo → adding **personality**  
- Grid-based layout → ensures proportional balance  
- GPU-accelerated transforms → buttery-smooth parallax  

![Hero Demo](images/website_hero.png)

---

### 🗂️ Projects Showcase
Projects are displayed using **interactive flip cards**:  

```css
.card-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(.4,.2,.2,1);
}
.card.flipped .card-inner {
  transform: rotateY(180deg);
}
```

- Only one card flips open at a time (state lock).  
- Smooth 3D transitions with backface visibility management.  
- **Consistent aspect ratios** prevent stretched thumbnails.  

---

### ✍️ Blog System
My blogs are powered by **Markdown + MDX**:  

- YAML frontmatter → title, author, date, reading time.  
- MDX → allows embedding React components inside blog posts.  
- Future-proof → new content can be added without touching code.  

Example frontmatter:  

```yaml
---
title: "New Website UI"
date: "2025-08-19"
author: "Leelakrishna Ravuri"
readingTime: "4 min"
---
```

---

### 📄 Resume Integration
The Resume page now has **two options**:  
- **ATS-Optimized PDF** → perfect for recruiters & parsing software.  
- **Original Styled Version** → downloadable, human-readable copy.  

Both are accessible from the UI in a clean, distraction-free layout.  

---

### 🎶 & 📊 External Integrations
- **Spotify Widget** → fetches my currently playing track 🎧  
- **GitHub Card** → displays repo stats & contributions 📈  
- **Floating Social Bar** → ensures links are always visible 🔗  

This makes the portfolio feel **alive and connected**, rather than static.  

---

## 🚀 Conclusion
The new **Website UI** is not just about looks — it’s about creating an interface that’s:  

- 🕶️ Minimal but expressive  
- ⚡ Fast and scalable with Next.js  
- 📱 Mobile-first and adaptive  
- 🎯 Interactive where it matters  

It represents the next step in building a **living portfolio system** — adaptable to future growth, whether that’s more advanced animations, deep-dives into projects, or new blog series.  

![Celebration](https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif)