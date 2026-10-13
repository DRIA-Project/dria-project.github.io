# DRIA project page

A static academic project page with HTML, CSS, and native JavaScript. The current design keeps the original soft purple palette and a centered column, ordered as Abstract → Contributions → Method → Parts & Experimental Setup → Results. News, keyword tags, metric cards, the teaser text, detailed result tables, and long explanatory sections were removed at the author’s request.

### Preview and publication

Double-click `index.html` for a local preview, or run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`.

- Current website: https://dria-project.github.io/
- Original archived website: https://dria-project.github.io/versions/before-polish/
- Repository: https://github.com/DRIA-Project/dria-project.github.io

Pages uses **Settings → Pages → Deploy from a branch → main → / (root)**. The `.nojekyll` file is included. Edit `index.html` using GitHub’s **Edit** button and commit, or edit the local deployment repository `/home/sx/Downloads/DRIA-website` and push to `main`. Pages publishes updates automatically. The publishing repository belongs to the `DRIA-Project` organization, so the public URL contains the project name instead of the personal account name. The original archive in `versions/before-polish/` has independent assets and a `SHA256SUMS` file; current edits do not change it. Earlier current-page layouts remain available in Git history, including commit `72d79fb` before the simplification.

### Edit the page

Content is written directly in `index.html`, separated by `<!-- ===== Section ===== -->` comments and Chinese replacement notes.

| Location | What to edit |
| --- | --- |
| Header | Full title, nine authors, author homepage links, four affiliations, corresponding-author email, and journal status |
| Project Links | Paper link when public; Code remains **TBD**; Video points to the demonstrations |
| Results | Four featured physical clips in the order Nut, Carriage, Bearing1, Bearing2; **More recordings** directly shows the remaining nine clips; **Additional experiment figures** directly shows Fig. 8/9/10 |
| Abstract | A brief project summary without a numerical result list |
| Contributions | Three short points: active part presentation, simulation-only learning, and RGB-based deployment |
| Method | Fig. 2 and two short sentences; **Research motivation** directly shows Fig. 1 |
| Parts & Experimental Setup | Four equally scaled part illustrations, ROI labels, and Fig. 6; **Target poses** directly shows Fig. 7 |
| Acknowledgements | Supplied funding text displayed directly |
| BibTeX | Preserved with `hidden`; update the unpublished entry before making it public |

Author order, institution associations, title, unpublished status, supplied figures, all thirteen videos, and funding are retained. The full manuscript PDF is not published. Code release status is not implied by the website source repository. Background before/after and success/failure/baseline video placeholder sections remain removed.

To release Paper or Code, replace its disabled `<button>` with `<a class="button" href="YOUR_REAL_URL">…</a>`. Author `href="#"` values await real personal homepage URLs. Edit sharing metadata and canonical URLs in `<head>` if changing the website address.

### Layout and media

Edit colors, font, and column width in `:root` at the top of `static/css/style.css`. The default content width is 1000px, with the original lavender `#ede9ff` and purple accent `#5941a9`, lightly tinted section backgrounds, and dark resource buttons. Results contains videos and optional figures, with no numeric result tables or metric cards. All video grids become one column below 700px; part illustrations use two columns on phones. Each part PNG is 800×600 with the extracted part normalized to a 440px display height, centered without stretching. The crops use the original image embedded in `Parts_ROIs.pdf`; surrounding text and arrows are omitted from the cards, and the full ROI diagram remains available by clicking an image.

Research motivation, target poses, additional recordings and experiment figures, and acknowledgements are ordinary HTML blocks displayed directly; there are no disclosure controls. Remove a whole section to omit it, or add `hidden`. Native JavaScript generates navigation from visible top-level `section[id]` elements, tracks the active link, and supports smooth scrolling. `data-nav` controls the short navigation label.

Videos use `<video autoplay muted loop playsinline controls preload="none" data-src="…" poster="…">`. Replace `data-src`, `poster`, and the short caption together. Sources are attached on entering the viewport, playback pauses outside the viewport or in a background tab, and reduced-motion visitors can play manually. Original aspect ratios are preserved with `object-fit: contain`. Keep method and outcome labels faithful to the footage.

Each supplied figure links to its original PDF. Change the image path, PDF link, dimensions, alternative text, and caption together. The optional logo is hidden: add `static/images/logo.png` and remove `data-placeholder` from its header image to enable it. No unfinished video or image frames appear on the current page.

The hidden BibTeX has a Copy button and direct-file clipboard fallback. Once public citation details are ready, update the entry and remove `hidden` from its section and resource button; navigation includes it automatically.

### Existing files and mapping

| File | Content / location |
| --- | --- |
| `static/images/fig1_motivation.png`, `Figure_1.pdf` | Research motivation (displayed directly); updated source uses the DRIA name |
| `static/images/fig6_setup.png`, `Figure_6.pdf` | Physical inspection cell |
| `static/images/fig7_tasks.png`, `Figure_7.pdf` | Target poses (displayed directly) |
| `static/images/Parts_ROIs.pdf` | Original supplied `论文图片.pdf`, containing all four part/ROI illustrations |
| `static/images/parts/{nut,carriage,bearing1,bearing2}.png` | Extracted from the original part image in the supplied PDF; equal 800×600 canvases and 440px part heights |
| `static/images/method.png`, `Figure_2.pdf` | Method overview |
| `static/images/result-01.png`, `Figure_8.pdf` | Results: additional experiment figures (displayed directly) |
| `static/images/result-02.png`, `Figure_9.pdf` | Additional experiment figures (displayed directly) |
| `static/images/result-04.png`, `Figure_10.pdf` | Additional experiment figures: ROI localization (displayed directly) |
| `static/images/detection/{nut,carriage,bearing1,bearing2}.png` | Four panels derived from supplied Fig. 10 |
| `static/videos/1424002461.mp4`, `2073040279.mp4`, `343415262.mp4`, `60789955.mp4`, `965385884.mp4`, `997680083.mp4` | Six Nut physical recordings |
| `static/videos/2048929961.mp4` | Carriage physical recording |
| `static/videos/374234212.mp4` | Bearing1 physical recording |
| `static/videos/288632057.mp4` | Bearing2 physical recording |
| `static/videos/166289621.mp4`, `1147201446.mp4` | Nut multi-view deployment overview |
| `static/videos/1001628895.mp4`, `1225127581.mp4` | Nut RL / student policy simulation comparisons |
| `static/images/video-posters/{numeric_filename}.jpg` | Real posters for supplied clips |

Original numeric video filenames and the original Fig. 2/8/9/10 PDF/image paths are unchanged. The thirteen supplied MP4 files have H.264 video, no audio, faststart enabled, and each is below 4 MB. The source Downloads folder is not needed to serve the site.

### Video compression

H.264, no audio, capped resolution, and faststart:

```bash
ffmpeg -i input.mp4 -vf "scale=w='min(1280,iw)':h='min(720,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,setsar=1" -c:v libx264 -pix_fmt yuv420p -crf 25 -preset medium -an -movflags +faststart output.mp4
```

Aim for a short clip below 10 MB. Generate a poster with `ffmpeg -ss 0.1 -i output.mp4 -frames:v 1 -q:v 3 poster.jpg`. YouTube/Bilibili iframe examples remain commented beneath the demonstration section for a future presentation video.

### Visual references

The simplified layout references [DexSensorless](https://sites.google.com/view/dex-sensorless/) and [DexAnyTwist](https://prevalenter.github.io/dexanytwist.github.io/): large visual demonstrations, short explanations, and ample white space. Template credits and the template license remain in the footer. Paper and media retain their respective rights.
