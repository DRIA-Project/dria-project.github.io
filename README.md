# DRIA project page

The project website is a pure static `index.html` + `static/css/style.css` + `static/js/main.js`. No build tool or runtime package is required. Paper text, authors, seven numbered source figures and the supplied part/ROI diagram, all thirteen supplied videos, and funding acknowledgements are retained; the manuscript is labeled **Robotics and Computer-Integrated Manufacturing (under review)**. Code remains **Code (TBD)**. Unreleased Paper/arXiv/Dataset/Models resources are disabled until real links are available.

### Preview and GitHub Pages

Double-click `index.html` for a local preview. Alternatively, run `python3 -m http.server 8000` in this folder and visit `http://localhost:8000`. All content uses relative paths and works from a Pages repository subdirectory. CDN fonts/icons are optional: the page has system-font fallbacks and readable button text without them.

The version immediately before the overall polish is saved independently at [`versions/before-polish/index.html`](versions/before-polish/index.html), including its original HTML/CSS/JS, thirteen videos, posters, and figures. Local URLs are `http://localhost:8000/` (current) and `http://localhost:8000/versions/before-polish/` (previous). The snapshot has its own `README.md` and `SHA256SUMS`; changes to the current page do not alter it. Include the `versions/` folder when deploying if you want both versions online.

This repository is published at **https://sunxin010203.github.io/DRIA/**. In **Settings → Pages**, the publishing source is **Deploy from a branch → main → / (root)**. The `.nojekyll` file is included. Commit changes to `main` to update the public site automatically. The source manuscript PDF is not included in this repository; only the supplied individual figures are included.

The independent local deployment repository is `/home/sx/Downloads/DRIA-website`, with `origin` pointing to `https://github.com/sunxin010203/DRIA.git`. Edit this folder and push to `main`, or open a file on GitHub, choose **Edit**, and commit your changes. The previous version is published at **https://sunxin010203.github.io/DRIA/versions/before-polish/**. See [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) if you need to recreate the Pages configuration.

### Theme, cover, and resource links

- Edit the `:root` variables at the top of `static/css/style.css`: `--color-theme`, `--color-accent`, `--color-background`, `--color-text`, `--color-border`, `--radius`, and `--shadow`. Success/failure tags use `--color-success` and `--color-failure` plus their background variables.
- `--width-text` is 960px; `--width-media` is 1100px on wide screens. Smaller screens use the available width.
- The optional cover is off by default: `<body data-hero="none">`. Supply `static/videos/hero.mp4` and change it to `data-hero="video"`. Edit the cover's poster, title, description, and `1x Speed` badge directly in HTML. That label describes the footage; it does not change playback rate. The cover pause button is keyboard accessible. A failed video load hides the cover and restores the compact title view.
- Logo slot: `static/images/logo.png`. Add the image and remove `data-placeholder` from the header's `img[data-optional-logo]`. A missing/broken logo hides automatically. `static/images/favicon.svg` is a temporary letter-D icon, not a finalized project logo.
- Add `*` to confirmed equal-contribution authors; `†` marks the supplied corresponding author Cheng Cheng. No equal contribution is assigned by default. Institutions, author order, and contact email are preserved.
- To release a resource, replace its disabled `<button>` with `<a class="button" href="YOUR_REAL_URL">…</a>`. The original Video button still points to `#videos`. Do not point Paper/arXiv/Code/Dataset/Models at dummy URLs.
- BibTeX is retained **hidden**, matching the earlier instruction. To publish it later, revise the provisional citation, then remove `hidden` from `#bibtex` and its button. Navigation detects it automatically; Copy shows “Copied!” for two seconds and has a direct-file clipboard fallback.
- Update description/keywords/Open Graph/Twitter fields in `<head>` when changing the page. The temporary share image is the existing method figure. Replace `og:image` and `twitter:image` with the **absolute public URL** of your final share image. `og:url` and the canonical link already point to the public DRIA website.

### Sections and default state

Each section is delimited by `<!-- ===== … ===== -->` with replacement notes. Remove/comment a whole section to omit it, or add `hidden`. Navigation is generated from visible top-level `section[id]` elements in `<main>`; `data-nav` controls the short label. It also updates after sections are inserted, removed, or hidden. Active links follow scrolling. Back to top appears after scrolling down.

| Section | Default | Editing / assets |
| --- | --- | --- |
| Video Hero | Off (`data-hero="none"`) | `static/videos/hero.mp4`; poster and speed badge in HTML |
| Paper header / keywords / metrics | On | Existing nine authors; keyword pills; four supplied key metrics |
| News | On, placeholder | `[YYYY-MM] Paper submitted to RCIM.`; insert newer dated entries first |
| Video Presentation | On, placeholder | `static/videos/presentation.mp4`; commented YouTube/Bilibili iframe examples included |
| Abstract | On | Existing abstract, with requested terminology normalization |
| Motivation | On | Supplied Fig. 1 (`fig1_motivation.png`, source `Figure_1.pdf`) |
| Contributions | On | Three supplied contribution points |
| Method | On | Existing Fig. 2 plus three stage cards |
| Optional method details | Hidden | `static/images/fig4_student.png`, `static/images/fig5_alignment.png` |
| Parts & Target ROIs | On | Four ROI-annotated crops from `Parts_ROIs.pdf`, plus supplied Fig. 7 |
| Inspection Cell Setup | On | Supplied Fig. 6 (`fig6_setup.png`); supplied hardware details |
| Simulation Results | On | Table 1, Expert RL separated from ranked baselines |
| Real-World Results | On | Table 2; Nut → Carriage → Bearing1 → Bearing2; existing recordings and Fig. 8 |
| Sim-to-Real Consistency | On | Supplied Fig. 9 and its explanatory text |
| Baseline Comparison | On | Table 3 and its explanatory text |
| Ablation Studies | On | Table 4 with multi-level header and existing diffusion/multi-view text |
| Target ROI Detection | On | Existing Fig. 10 and four panel crops; existing false-positive limitation preserved |
| Supplementary Video | On | All four existing Nut overview/comparison clips |
| Video of all trials | **Commented out** | Copy its example for all four parts when compilation videos are ready |
| BibTeX | **Hidden** | Provisional entry retained; only reveal after public citation details are ready |
| Acknowledgements / footer | On | Funding text preserved; template attribution and CC BY-SA 4.0 template notice |

There are four website result tables, numbered Table 1–4 for the site (the PDF has its own numbering). Figures retain paper numbers and use `Fig. N: …`. Baseline values come from the supplied request. Existing manuscript numbers, confidence intervals, and limitations are retained, with no new experimental values added. Expert RL is simulation-only and excluded from `best`/`second` ranking.


The standalone Visual Alignment and Failure Analysis sections, success/failure video slots, three-video sim-to-real comparison, and baseline video grids were removed at the author’s request. The original thirteen recordings, supplied Fig. 9, numerical comparison tables, and factual limitations remain.

### Components you can copy

- **Metrics:** copy a `.metric-card` inside `.metric-grid`. Mobile uses two columns.
- **Stages:** copy an `.stage-card` inside `.stage-grid`; edit the badge, heading, and description. Mobile stacks vertically.
- **Parts:** copy `.part-card` in `.part-grid`; edit name, model, ROI, presentation criterion, and image path. Keep Nut, Carriage, Bearing1, Bearing2 in that order.
- **Videos:** copy `.video-card` into `.video-grid.grid-two`, `.grid-three`, `.grid-four`, or `.grid-six`. All become single-column below 700px. `.status-success`, `.status-failure`, and `.video-card-ours` control labels and DRIA emphasis.
- **Tables:** copy `.table-scroll` and `.results-table`. The wrapper is keyboard-focusable and scrolls horizontally without stretching the page. `.table-group`, `.reference`, `.ours`, `.best`, and `.second` define the requested visual hierarchy. Use `<th scope="colgroup" colspan="…">` for grouped headers.
- **Figures:** copy `.paper-figure`; edit `img` source, `width`/`height`, `alt`, PDF link, and `figcaption`. Real figures preserve natural aspect ratios and link to original PDFs.

### Loading media and placeholders

Video markup uses `<video autoplay muted loop playsinline controls preload="none" data-src="…" poster="…">`. JavaScript attaches the source only when the video enters the viewport, plays while visible, and pauses outside the viewport or in a background tab. Users who prefer reduced motion see posters until they choose playback. The source path stays in `index.html` and does not require server logic.

Missing videos and images are explicitly marked `data-placeholder`; their gray frames show the intended paths without requesting nonexistent assets. After supplying a file, **remove `data-placeholder`** and replace its poster with a real frame. Loaded media hides its placeholder; an unavailable video shows its path again. For an image slot, keep `data-src` and remove `data-placeholder`. For a normal figure use `src`.

All video display stages are 16:9, with `object-fit: contain`: square and 4:3 source recordings are letterboxed without cropping. Do not label an existing recording Success/Failure or attribute it to a baseline unless the trial/method is verified. The existing thirteen clips remain under neutral recording labels.

### Existing files and mapping

| File | Content / location |
| --- | --- |
| `static/images/fig1_motivation.png`, `Figure_1.pdf` | Motivation; updated source uses the DRIA name |
| `static/images/fig6_setup.png`, `Figure_6.pdf` | Physical inspection cell |
| `static/images/fig7_tasks.png`, `Figure_7.pdf` | Initial poses, reorientation, and target poses |
| `static/images/Parts_ROIs.pdf` | Original supplied `论文图片.pdf`, containing all four part/ROI illustrations |
| `static/images/parts/{nut,carriage,bearing1,bearing2}.png` | Cropped from the supplied part/ROI diagram, retaining ROI annotations |
| `static/images/method.png`, `Figure_2.pdf` | Method overview |
| `static/images/result-01.png`, `Figure_8.pdf` | Real-World Results: physical trajectories |
| `static/images/result-02.png`, `Figure_9.pdf` | Sim-to-Real Consistency |
| `static/images/result-04.png`, `Figure_10.pdf` | Target ROI Detection |
| `static/images/detection/{nut,carriage,bearing1,bearing2}.png` | Four panels derived from supplied Fig. 10 |
| `static/videos/1424002461.mp4`, `2073040279.mp4`, `343415262.mp4`, `60789955.mp4`, `965385884.mp4`, `997680083.mp4` | Six Nut physical recordings |
| `static/videos/2048929961.mp4` | Carriage physical recording |
| `static/videos/374234212.mp4` | Bearing1 physical recording |
| `static/videos/288632057.mp4` | Bearing2 physical recording |
| `static/videos/166289621.mp4`, `1147201446.mp4` | Nut multi-view deployment overview |
| `static/videos/1001628895.mp4`, `1225127581.mp4` | Nut RL / student policy simulation comparisons |
| `static/images/video-posters/{numeric_filename}.jpg` | Real posters for supplied clips |

Original numeric video filenames and the original Fig. 2/8/9/10 PDF/image paths are unchanged. The thirteen supplied MP4 files have H.264 video, no audio, faststart enabled, and each is below 4 MB. The source Downloads folder is not needed to serve the site.

### Material checklist and suggested exports

| Material | Suggested path | Suggested format |
| --- | --- | --- |
| Cover | `static/videos/hero.mp4` | 16:9, 1280×720 or 1920×1080, 8–20 s, below 10 MB |
| Project presentation | `static/videos/presentation.mp4` | 16:9, 1280×720, about 1–3 min; long presentations can use the commented iframe |
| Logo / share image | `static/images/logo.png`, `static/images/social-preview.png` | Transparent logo, about 256×256; sharing image about 1200×630 |
| Optional method details | `fig4_student.png`, `fig5_alignment.png` in `static/images/` | PNG around 2000–2400px wide; preserve figure aspect ratio |
| Individual part images | `static/images/parts/{nut,carriage,bearing1,bearing2}.png` | Supplied ROI diagram crops are already included; replace with other images if desired |
| All-trial compilations | `static/videos/all_trials/{nut,carriage,bearing1,bearing2}.mp4` | Optional long video; hosted embed can avoid large repo files |

Naming is lowercase, no spaces, and matches each visible placeholder. Size/time suggestions are media export guidance, not experimental statistics. Add actual News dates and official release links when ready.

Compress to H.264, remove audio, preserve aspect ratio, cap the largest dimension, and enable faststart:

```bash
ffmpeg -i input.mp4 -vf "scale=w='min(1280,iw)':h='min(720,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,setsar=1" -c:v libx264 -pix_fmt yuv420p -crf 25 -preset medium -an -movflags +faststart output.mp4
```

Aim for individual short clips below 10 MB. Generate a poster with `ffmpeg -ss 0.1 -i output.mp4 -frames:v 1 -q:v 3 poster.jpg` and update the HTML `poster` path.

## Published website

- Current page: https://sunxin010203.github.io/DRIA/
- Previous page: https://sunxin010203.github.io/DRIA/versions/before-polish/
- Repository: https://github.com/sunxin010203/DRIA

Edit `index.html` online on GitHub and commit changes, or edit this local repository and push to `main`. GitHub Pages republishes changes automatically.
