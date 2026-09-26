# Kabya Koninika Rahman: Portfolio

Static site (HTML, CSS, JavaScript). No build step; works on GitHub Pages.

## Folder layout

```
index.html              main page
404.html                not-found page
css/style.css           all styles (colors are at the top under :root)
js/script.js            theme toggle, mobile menu, animations, certificate viewer
assets/images/          profile.jpg
assets/cv/              Kabya-Koninika-Rahman-CV.pdf  (the "Download CV" button)
assets/certificates/    certificate images
assets/icons/           favicon.svg
site.webmanifest, robots.txt
```

## Add a certificate

1. Save the image in `assets/certificates/` with a short name, e.g. `stata-course.jpg`
   (JPG or PNG, landscape works best, around 1200px wide).
2. In `index.html`, find the `<!-- CERTIFICATES -->` section and copy one `<article class="card cert-card reveal">` block.
3. In the copy, change the file name in both `data-certificate="..."` and `src="..."`,
   then edit the type, title, issuer and date.

Three cards are already set up and expect these files:
`directors-award-2026.jpg`, `ihec-2023-rapporteur.jpg`, `hsbc-bhasha-protijog-2018.jpg`.
Until an image exists, its card shows "Certificate image coming soon". Delete any card you don't need.

## Update the CV

Replace `assets/cv/Kabya-Koninika-Rahman-CV.pdf` with the new PDF, keeping the same file name.

## Publish on GitHub Pages

1. Create a repository (e.g. `Portfolio`) and upload the contents of this folder to it.
2. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site appears at `https://<username>.github.io/<repository>/` after a minute or two.
