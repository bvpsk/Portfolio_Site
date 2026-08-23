# Studio Notes portfolio

A static, JSON-driven portfolio site. Serve the folder locally, or deploy it to Vercel or Firebase Hosting.

## Local preview

With Python installed, run `python3 -m http.server 8000`, then open `http://localhost:8000`. The JSON fetch will not work when the HTML is opened directly with `file://`.

## Updating content

1. Edit `data/works.json` and `data/other-works.json` while developing locally.
2. To manage content from Google Drive, upload each JSON file to Drive, set sharing to **Anyone with the link**, and publish it to the web so it has a public JSON URL.
3. Paste those URLs into `data/sources.json` as `worksUrl` and `otherWorksUrl`.
4. For YouTube use an embed URL such as `https://www.youtube.com/embed/VIDEO_ID`. Instagram embeds can be added with the Instagram embed URL or adapted in `script.js` if using Instagram's official embed script.

Keep the JSON shape the same as the included examples. Video projects use `isInstagram: false` and `embedUrl`; Instagram projects use `isInstagram: true` and `instagramEmbedUrl`. Replace the email, Instagram handle, project links, and page title in `index.html`.

## Deploying

### Vercel

Import this folder as a project on Vercel. Choose **Other** as the framework if prompted; no build command is needed and the output directory is `.`.

### Firebase Hosting

Install the Firebase CLI, run `firebase login`, then `firebase init hosting` in this folder. Choose the current folder as the public directory and answer **No** when asked to configure it as a single-page app. Deploy with `firebase deploy`.

Note: your JSON URLs must allow browser CORS requests. If Google Drive does not provide CORS headers for your published file, host the JSON files in the same deployment or use a static JSON-friendly host such as GitHub Pages.
