---
title: "Interactive Skills Section"
date: "2025-08-26"
author: "Leelakrishna Ravuri"
readingTime: "5 min"
---

## 🌟 Introduction
One of the most **exciting parts** of my portfolio is the **Skills Section**.  
Instead of a plain list of tools, I built an **interactive system** that adapts based on user interaction:  

- 🕸️ A **radar chart** when viewing all skills (big-picture overview).  
- 📊 **Progress bars** when diving into a single category (focused view).  
- 🎯 **Clickable tiles** that expand into detailed proficiency.  
- 🔗 Direct links to official documentation for every skill.  

It’s not just a section — it’s a **playground for exploration**.

![](https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif)

---

## 🎨 Design & UX Principles
The design goal was **clarity and interactivity**:  

1. **Minimal but powerful**: Muted backgrounds with sharp accent highlights (`var(--accent)`).
2. **Adaptive views**: Radar chart → overview, Progress bars → deep dive.
3. **User choice**: Every skill pill doubles as a doc link. (Want to refresh your SQL knowledge? Just click → 📖).
4. **Mobile-first**: On smaller screens, everything collapses cleanly into single-column layouts.

---

## ⚙️ Core Implementation

### 🔄 State-based Switching
The radar chart switches to progress bars based on category filter:

```jsx=
{filter === "All" ? (
  <SkillRadar skills={radarSkills} />
) : (
  <SkillBars skills={categorySkills} />
)}
```

Simple but effective: **one filter, two display modes**.

---

### 🧩 Skill Pills + Docs Links
Each skill appears as a **pill** with icon + label. Clicking it opens official documentation:

```js
<a
  href={DOCS[s.label]}
  target="_blank"
  rel="noopener noreferrer"
  className="skill-pill"
>
  <i className={s.icon} />
  <span>{s.label}</span> ↗
</a>
```

➡️ **Result**: instant access to docs, without clutter.

---

### 📊 Progress Bars
When a category is selected, proficiency levels show with **animated bars**:

```js
<div className="bar">
  <span>JavaScript</span>
  <div className="track">
    <div className="fill" style={{ width: "90%" }} />
  </div>
  <span>90%</span>
</div>
```

💡 Bars animate smoothly on entry for a **dynamic feel**.

---

## 📱 Mobile Optimizations
On mobile:  
- Cards stack vertically 📐  
- Fonts + padding scale down for tap comfort 👍  
- Hover effects gracefully degrade (since touch doesn’t support hover).

```css
@media (max-width: 700px) {
  .skills-grid { grid-template-columns: 1fr; }
  .skill-pill { font-size: 13px; padding: 6px 10px; }
}
```

---

## ✨ Visual Demo
- **All Skills (Radar Chart)**  
![Radar Chart](images/skills_overallSpider.png)  

- **Category Selected (Progress Bars)**  
![Progress Bars](images/skills_progressbar.png)  

---

## 🚀 Conclusion
The Skills Section is more than a résumé substitute — it’s a **living interface**:  

- 🕸️ Radar for global perspective  
- 📊 Bars for detailed categories  
- 🔗 Direct docs access  
- 📱 Fully mobile-ready  

This system transforms “static bullet lists” into **engaging experiences**.  
Every click, hover, and tap has intent — making skills feel **alive**.  

💡 Next step? Add subtle **Framer Motion transitions** so categories slide in with flair.

---