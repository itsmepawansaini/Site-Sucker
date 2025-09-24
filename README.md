# Site Sucker

Site Sucker is a simple **Node.js tool** to download an entire website for offline use.  
It recursively crawls all internal pages, downloads assets (HTML, CSS, JS, images, fonts), and preserves the folder structure.

---

## Features

- Download entire websites for offline browsing
- Recursively crawl internal pages
- Download assets (images, CSS, JS, fonts, etc.)
- Preserve original folder structure
- Simple and lightweight — built with Node.js
- Tested with both custom-coded and WordPress sites

---

## Requirements

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm (comes with Node)

---

## Setup

1. Clone or download this repository:

```bash
git clone https://github.com/itsmepawansaini/site-sucker.git
cd site-sucker
```

2. Install dependencies:

```bash
npm install
```

3. Open `index.js` and set the website URL you want to download:

```js
const START_URL = "https://example.com/"; // Change this to your target site
```

4. Run the script:

```bash
node index.js
```

---

## Output

All downloaded files will be saved inside the `downloaded-site` folder.  
The script keeps the original structure of the website.

---

## Example

```bash
node index.js
```

If `START_URL` is set to:

```
https://example.com/
```

You’ll get:

```
downloaded-site/
├── index.html
├── about/
│   └── index.html
├── contact/
│   └── index.html
└── assets/
    ├── css/
    ├── js/
    ├── images/
    └── fonts/
```

---

## Notes

- The script only downloads pages from the same domain.
- JavaScript-generated content (AJAX, SPAs) may not be captured.
- For dynamic sites, you might need a headless browser like Puppeteer.

---

## Tech Stack

- [Node.js](https://nodejs.org/)
- [axios](https://github.com/axios/axios) — HTTP requests
- [cheerio](https://cheerio.js.org/) — HTML parsing

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Contributing

Contributions, issues, and feature requests are welcome.  
Feel free to fork this repository and improve the script.
