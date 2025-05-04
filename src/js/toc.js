document.getElementById('tocToggleBtn').addEventListener('click', function () {
  const toc = document.getElementById('toc');
  toc.style.display = (toc.style.display === 'none' || toc.style.display === '') ? 'block' : 'none';
});

function addSectionHeading(container, tocList, sectionTitle) {
  const heading = document.createElement('h2');
  heading.textContent = sectionTitle;
  heading.id = `section-${sectionTitle}`;
  container.appendChild(heading);
  if (tocList) {
    const tocItem = document.createElement('li');
    const tocLink = document.createElement('a');
    tocLink.href = `#${heading.id}`;
    tocLink.textContent = sectionTitle;
    tocItem.appendChild(tocLink);
    tocList.appendChild(tocItem);
  }
}
