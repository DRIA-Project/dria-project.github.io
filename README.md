# DRIA project page

A pure static project page built with HTML, CSS, and native JavaScript. Abstract/Method and Additional Experiment Figures span the browser width with modest side margins; the other groups retain their centered, compact widths. The original soft purple palette is retained. A Presentation Video follows Abstract/Method. Industrial Parts, Experimental Setup, and Target poses share a three-column row. Results contains thirteen experimental recordings, including nine physical videos in a uniform 3×3 grid, followed by three experiment figures in one row.

### Preview and publication

Double-click `index.html` for a local preview, or run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`.

- Current website: https://dria-project.github.io/
- Original archived website: https://dria-project.github.io/versions/before-polish/
- Repository: https://github.com/DRIA-Project/dria-project.github.io

Pages uses **Settings → Pages → Deploy from a branch → main → / (root)**. The `.nojekyll` file is included. Edit `index.html` using GitHub’s **Edit** button and commit, or edit the local deployment repository `/home/sx/Downloads/DRIA-website` and push to `main`. Pages publishes updates automatically.

The publishing repository belongs to the `DRIA-Project` organization. The original archive has independent assets and a `SHA256SUMS` file; current edits do not change it. The version immediately before this compact layout is retained in [commit 8298f77](https://github.com/DRIA-Project/dria-project.github.io/tree/8298f777dfb2e2809b285dbc23dbf19338fc06e2). Earlier layouts also remain in Git history.

### Edit the page

Content is written directly in `index.html`, separated by `<!-- ===== Section ===== -->` comments and Chinese replacement notes.

| Location | What to edit |
| --- | --- |
| Header | Full paper title and optional logo; author, institution, email, and journal information are omitted |
| Project Links | Paper link when public; Code remains **TBD**; Video scrolls to Presentation Video |
| Abstract & Method | Equal-width/equal-height panels on desktop; abstract, Fig. 2, and brief method text |
| Presentation Video | Original three-minute overview below Abstract/Method and above Setup; original audio and opening-title poster; up to 900px wide |
| Industrial Parts & Experimental Setup | Three aligned columns: four equally scaled parts in a 2×2 grid, Fig. 6 setup, and Fig. 7 target poses |
| Results: Real-world Reorientation | Nine physical videos: Carriage/Bearing1/Bearing2, followed by two rows of three Nut clips |
| Results: Different Initial Positions / Simulation | Two Nut recordings with different initial positions and two RL/student simulation comparisons, each group up to 900px wide with two columns |
| Additional Experiment Figures | Fig. 8/9/10 in one aligned three-column row |
| BibTeX | Preserved with `hidden`; update the unpublished entry before making it public |

Contributions, Research motivation, acknowledgements, the detector limitation note, News, numeric result tables, and metric cards are omitted. The full manuscript PDF is not published. Removing header information does not edit the supplied media or the preserved hidden citation. No disclosure controls are used: all included content is presented directly.

To release Paper or Code, replace its disabled `<button>` with `<a class="button" href="YOUR_REAL_URL">…</a>`. Edit sharing metadata and canonical URLs in `<head>` if changing the website address.

### Layout, fonts, and media

Edit `:root` at the top of `static/css/style.css`. Only Abstract/Method and Additional Experiment Figures use the browser width minus `--page-gutter` on each side (24–48px on desktop, 16px on phones). Header, navigation, setup, and video groups retain a centered 1000px column; Presentation Video and video grids are capped at 900px. Setup and target-pose images are capped at 340px. The original lavender `#ede9ff` and purple accent `#5941a9` are retained. Body text and captions share **14px**, with 22px section headings.

Below 700px, paired panels and video grids stack into one column; the four part cards remain two columns. Part PNGs retain equal 800×600 canvases and equal 440px part heights, centered without stretching. Source files are unchanged.

The figure gallery aligns all three cards and captions in one row, lets images grow with their columns, and follows their natural proportions. Shrinking a paper image also scales its embedded text: CSS controls website text, not lettering baked into the image. Every figure links to its original PDF for reading the full detail.

Videos use `<video autoplay muted loop playsinline controls preload="none" data-src="…" poster="…">`. Replace `data-src`, `poster`, and the caption together. Sources load upon entering the viewport; playback pauses outside the viewport or in a background tab. Reduced-motion visitors can play manually.

Physical videos use square players with `object-fit: cover`, centered to trim surrounding background and align all nine cards. The MP4 files themselves are preserved. To adjust the framing of one card, add `style="--video-position: 55% 50%"` to its `video-slot`. Native fullscreen uses `object-fit: contain` to show the full frame. Other groups use their original aspect ratios. The two Nut initial-position videos have already had their empty side bars removed.

The overview retains its original audio and starts muted. Visitors can enable sound, seek, or enter fullscreen using the native player controls.

The optional logo is hidden: add `static/images/logo.png` and remove `data-placeholder` from its header image to enable it. The hidden BibTeX supports Copy and a direct-file clipboard fallback. Once citation details are ready, update its entry and remove `hidden` from its section and resource button; navigation includes it automatically.

### Existing files and mapping

| File | Content / location |
| --- | --- |
| `static/images/method.png`, `Figure_2.pdf` | Method overview |
| `static/images/fig6_setup.png`, `Figure_6.pdf` | Experimental Setup panel |
| `static/images/fig7_tasks.png`, `Figure_7.pdf` | Target poses in Industrial Parts & Experimental Setup |
| `static/images/Parts_ROIs.pdf` | Original supplied `论文图片.pdf`, containing all four part/ROI illustrations |
| `static/images/parts/{nut,carriage,bearing1,bearing2}.png` | Equal-size part cards |
| `static/images/result-01.png`, `Figure_8.pdf` | Real-world trajectories |
| `static/images/result-02.png`, `Figure_9.pdf` | Simulation and real-world trajectories |
| `static/images/result-04.png`, `Figure_10.pdf` | Target ROI localization |
| `static/images/fig1_motivation.png`, `Figure_1.pdf` | Retained source files, unused on the current page |
| `static/videos/2057267258.mp4` | Overview: H.264/AAC, original audio, approximately 4.8 MB, faststart |
| `static/videos/1424002461.mp4`, `2073040279.mp4`, `343415262.mp4`, `60789955.mp4`, `965385884.mp4`, `997680083.mp4` | Six Nut physical recordings |
| `static/videos/2048929961.mp4` | Carriage physical recording |
| `static/videos/374234212.mp4` | Bearing1 physical recording |
| `static/videos/288632057.mp4` | Bearing2 physical recording |
| `static/videos/166289621.mp4`, `1147201446.mp4` | Nut initial positions 1 and 2 respectively; empty side bars removed (632×640) |
| `static/videos/1001628895.mp4`, `1225127581.mp4` | Nut RL/student simulation comparisons |
| `static/images/video-posters/{numeric_filename}.jpg` | Real posters for every supplied video |

The thirteen demonstration MP4 files use H.264, have no audio, have faststart enabled, and are each below 4 MB. The overview is remuxed without re-encoding. The source Downloads folder is not needed to serve the site.

### Video compression

H.264, no audio, capped resolution, and faststart:

```bash
ffmpeg -i input.mp4 -vf "scale=w='min(1280,iw)':h='min(720,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,setsar=1" -c:v libx264 -pix_fmt yuv420p -crf 25 -preset medium -an -movflags +faststart output.mp4
```

Aim for an individual clip below 10 MB. Generate a poster with `ffmpeg -ss 0.1 -i output.mp4 -frames:v 1 -q:v 3 poster.jpg`. YouTube/Bilibili iframe examples are commented within Results.

### Visual references

The layout references [DexSensorless](https://sites.google.com/view/dex-sensorless/) and [DexAnyTwist](https://prevalenter.github.io/dexanytwist.github.io/): visual demonstrations, brief explanations, and white space. Template credits and license remain in the footer. Paper and media retain their respective rights.
