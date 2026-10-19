# Swiss Escapes: Travel Reviews of Switzerland

A beginner-friendly, frontend-only website that reviews popular travel destinations in Switzerland: mountains, lakes and cities.

## 1. The Idea

**What it is:** A travel review site covering seven places in Switzerland (Zermatt, Interlaken, Lucerne, Lauterbrunnen, Jungfraujoch, Zurich and Montreux). Each place has a star rating, a short summary, a full review, highlights and practical tips.

**Purpose:** Help travellers quickly compare destinations and decide where to go, without reading long blog posts.

**Target audience:** First-time visitors, students and backpackers, families and anyone planning a trip to Switzerland.

## 2. Features

- **Responsive design** that works on phones, tablets and desktops
- **Mobile navigation menu** (hamburger button) with highlighting of the current section
- **Image carousel** with autoplay, arrows, dots, swipe and keyboard support
- **Place cards** generated from a single data file
- **Filter** by Mountains, Lakes or Cities, plus a **live search** box
- **Favourites** (heart button) saved in the browser with `localStorage`
- **Review pop-up (modal)** with highlights and practical info, closable with the Esc key
- **Travel tips accordion**
- **Add-your-own-review form** with validation and character counter (saved only in the browser)
- Animated statistics, back-to-top button and reduced-motion support
- Accessible markup: semantic HTML, ARIA labels, focus styles and alt text

## 3. Technology Stack

| Layer | Technology |
|-------|------------|
| Structure | HTML5 |
| Styling | CSS3 (Flexbox, Grid, custom properties, media queries) |
| Behaviour | Vanilla JavaScript (ES6), no frameworks or libraries |
| Fonts | Google Fonts (Fraunces and Inter) |
| Images | Custom SVG illustrations |
| Hosting | GitHub Pages (or Vercel) |

No backend, database, authentication or build tools are required.

## 4. Project Structure

```
swiss-travel-reviews/
├── index.html        # Page structure
├── style.css         # All styling and responsive rules
├── data.js           # Place data (edit this to add or change places)
├── script.js         # Interactive features
├── *.svg             # SVG illustrations for each place
└── README.md
```


## 5. Possible Future Improvements

- Add real photographs and a photo gallery
- Add a map of the places
- Add a dark mode toggle
- Add more destinations (Geneva, Bern, Grindelwald)


