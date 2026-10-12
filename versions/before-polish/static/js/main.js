document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.video-slot video').forEach((video) => {
    video.addEventListener('loadeddata', () => video.closest('.video-slot').classList.add('has-media'));
  });
  document.querySelectorAll('.image-placeholder img').forEach((image) => {
    image.addEventListener('load', () => image.closest('.image-placeholder').classList.add('has-media'));
  });

  const copyButton = document.querySelector('#copy-bibtex');
  const bibtex = document.querySelector('#bibtex-code');
  const status = document.querySelector('#copy-status');
  if (!copyButton || !bibtex || !status) return;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bibtex.textContent);
      status.textContent = 'Copied!';
    } catch (error) {
      status.textContent = 'Copy failed. Select the BibTeX text manually.';
    }
    window.setTimeout(() => { status.textContent = ''; }, 2200);
  });
});
