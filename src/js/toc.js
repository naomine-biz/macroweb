document.getElementById('tocToggleBtn').addEventListener('click', function() {
  const toc = document.getElementById('toc');
  if (toc.style.display === 'none' || toc.style.display === '') {
    toc.style.display = 'block';
  } else {
    toc.style.display = 'none';
  }
});

function addSectionHeading(container, tocList, sectionCount) {
  const sectionId = `section-${sectionCount}`;
  const heading = document.createElement('h2');
  heading.id = sectionId;
  const sectionTitle = sectionTitles[sectionCount] || `【${sectionCount}】`;
  heading.textContent = sectionTitle;
  container.appendChild(heading);
  const tocItem = document.createElement('li');
  const tocLink = document.createElement('a');
  tocLink.href = `#${sectionId}`;
  tocLink.textContent = sectionTitle;
  tocItem.appendChild(tocLink);
  tocList.appendChild(tocItem);
}
