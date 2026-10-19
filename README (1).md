# Swiss Escapes: Travel Reviews of Switzerland

A beginner-friendly, frontend-only website that reviews popular travel destinations in Switzerland: mountains, lakes and cities.

**Live website:** `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/` *(replace after deploying)*
**GitHub repository:** `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME` *(replace after uploading)*

---

## 1. The Idea

**What it is:** A travel review site covering seven places in Switzerland (Zermatt, Interlaken, Lucerne, Lauterbrunnen, Jungfraujoch, Zurich and Montreux). Each place has a star rating, a short summary, a full review, highlights and practical tips.

**Purpose:** Help travellers quickly compare destinations and decide where to go, without reading long blog posts.

**Target audience:** First-time visitors, students and backpackers, families and anyone planning a trip to Switzerland.

> Note: the reviews are sample content written for a learning project, and the pictures are original SVG illustrations made for this project. Replace them with your own photos and experiences for a personal touch.

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

## 5. Setup Instructions

### Run locally
1. Download or clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   cd YOUR-REPO-NAME
   ```
2. Open `index.html` in your browser by double-clicking it. That is all.

   Optional: use VS Code's **Live Server** extension for auto-reload.

### Add or edit a place
Open `data.js`, copy one object in the `PLACES` list, change the text and rating, and add a matching image file next to `index.html`.

### Deploy with GitHub Pages
1. Create a new repository on GitHub and upload all the files (keep `index.html` in the root).
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and the `/ (root)` folder, then click **Save**.
4. After a minute, your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`.

### Deploy with Vercel (alternative)
1. Sign in to [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New > Project** and import your repository.
3. Leave the framework as **Other** with no build command, then click **Deploy**.

## 6. Possible Future Improvements

- Add real photographs and a photo gallery
- Add a map of the places
- Add a dark mode toggle
- Add more destinations (Geneva, Bern, Grindelwald)

## 7. Author

Made by **YOUR NAME** as a frontend web development project.
