const sources = {
  works: 'data/works.json',
  other: 'data/other-works.json'
};

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const renderEmbed = (work) => {
  if (work.isInstagram) {
    const instagramUrl = escapeHtml(work.instagramEmbedUrl);
    return `<blockquote class="instagram-media" data-instgrm-permalink="${instagramUrl}" data-instgrm-version="14"><a href="${instagramUrl}" target="_blank" rel="noreferrer">View this post on Instagram ↗</a></blockquote>`;
  }

  return `<iframe src="${escapeHtml(work.embedUrl)}" title="${escapeHtml(work.heading)}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
};

const renderWorks = (works) => works.map((work, index) => `
  <article class="work-item">
    <div class="work-index">0${index + 1}</div>
    <div class="work-copy">
      <h3>${escapeHtml(work.heading)}</h3>
      <p class="subheading">${escapeHtml(work.subheading)}</p>
      <p>${escapeHtml(work.writeup)}</p>
      <ul>${(work.points || []).map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>
      <a class="text-link" href="${escapeHtml(work.link)}" target="_blank" rel="noreferrer">View project ↗</a>
    </div>
    <div class=${work.isInstagram ? "video-frame-insta" : "video-frame"}>${renderEmbed(work)}</div>
  </article>
`).join('');

const renderOtherWorks = (works) => works.map((work, index) => `
  <article class="other-item">
    <div class="other-number">0${index + 1}</div>
    <div><h3>${escapeHtml(work.heading)}</h3><p>${escapeHtml(work.writeup)}</p></div>
    <a class="text-link" href="${escapeHtml(work.link)}" target="_blank" rel="noreferrer">Open ↗</a>
  </article>
`).join('');

const loadJson = async (localPath, remoteUrl) => {
  const url = remoteUrl && !remoteUrl.includes('REPLACE_WITH') ? remoteUrl : localPath;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load ${url}`);
  return response.json();
};

const loadContent = async () => {
  try {
    const config = await fetch('data/sources.json').then((response) => response.json());
    const [works, otherWorks] = await Promise.all([
      loadJson(sources.works, config.worksUrl),
      loadJson(sources.other, config.otherWorksUrl)
    ]);
    document.querySelector('#works-list').innerHTML = renderWorks(works);
    document.querySelector('#other-list').innerHTML = renderOtherWorks(otherWorks);
    if (window.instgrm) window.instgrm.Embeds.process();
  } catch (error) {
    document.querySelectorAll('.loading').forEach((element) => {
      element.textContent = 'Content could not be loaded. Check the JSON source URLs.';
    });
    console.error(error);
  }
};

document.querySelector('script[src*="instagram.com/embed.js"]')?.addEventListener('load', () => {
  if (window.instgrm) window.instgrm.Embeds.process();
});

loadContent();
