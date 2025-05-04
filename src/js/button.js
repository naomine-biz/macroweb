function displayButtons(mcData, eqData) {
  const container = document.getElementById('macroContent');
  const toc = document.getElementById('toc');
  container.innerHTML = '';
  toc.innerHTML = '';
  let buttonCount = 0;
  let sectionCount = 1;
  const tocList = document.createElement('ul');
  toc.appendChild(tocList);

  const isMobile = window.innerWidth <= 600;
  const breakAfter = isMobile ? 5 : 10;

  mcData.forEach((section) => {
    const sectionTitle = section.name || `【${sectionCount}】`;
    addSectionHeading(container, tocList, sectionTitle);
    sectionCount++;

    let buttonsContainer = createButtonContainer();
    section.palettes.forEach((palette) => {
      palette.macros.forEach((macro) => {
        const button = document.createElement('button');
        button.classList.add('macro-button');
        const titleText = macro.title;
        button.textContent = titleText;

        if (Math.floor(buttonCount / 10) % 2 === 0) {
          button.classList.add('green');
        } else {
          button.classList.add('blue');
        }

        const isDataEmpty = !macro.lines || macro.lines.length === 0;
        const isTitleEmpty = !titleText.trim();

        if (isDataEmpty || isTitleEmpty) {
          button.classList.add('disabled');
          button.disabled = true;
        } else {
          button.addEventListener('click', () => {
            openModal(macro.lines, titleText);
          });
        }

        buttonsContainer.appendChild(button);
        buttonCount++;

        if (buttonCount % 20 === 0) {
          container.appendChild(buttonsContainer);
          container.appendChild(document.createElement('hr'));
          buttonsContainer = createButtonContainer();
        } else if (buttonCount % breakAfter === 0) {
          container.appendChild(buttonsContainer);
          buttonsContainer = createButtonContainer();
        }
      });
    });

    if (buttonsContainer.children.length > 0) {
      container.appendChild(buttonsContainer);
    }
  });
}

function createButtonContainer() {
  const container = document.createElement('div');
  container.className = 'button-container';
  return container;
}
